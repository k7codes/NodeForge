/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~ 
 * Merkezi Proje ve Grafik Durum Yoneticisi (State & History Manager)
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { 
  proje_yapisi, 
  dugum_tanimi, 
  baglanti_tanimi, 
  degisken_tanimi, 
  dil_secenegi, 
  veri_tipi,
  konsol_kaydi,
  derleme_sonucu,
  dosya_tanimi
} from '../tipler/grafik_tipleri';
import { dugum_sablonu, sablondan_dugum_olustur } from '../tanimlar/dugum_katalogu';
import { hazir_sablonlar } from '../tanimlar/sablon_projeler';
import { projeyi_derle_ve_kod_uret } from '../uretici/kod_uretim_yoneticisi';
import { projeyi_calistir } from '../servisler/arka_plan_servisi';

const YEREL_DEPOLAMA_ANAHTARI = 'nodeforge_aktif_proje_v1';

export function use_proje_yoneticisi() {
  // 1. Proje Durumu
  const [proje, set_proje] = useState<proje_yapisi>(() => {
    try {
      const kayitli = localStorage.getItem(YEREL_DEPOLAMA_ANAHTARI);
      if (kayitli) {
        const parsed = JSON.parse(kayitli);
        if (parsed && typeof parsed === 'object') {
          const dosyalar = Array.isArray(parsed.dosyalar) && parsed.dosyalar.length > 0
            ? parsed.dosyalar
            : hazir_sablonlar[0].veri.dosyalar;

          return {
            id: parsed.id || 'proje_' + Date.now(),
            ayarlar: parsed.ayarlar || {
              proje_adi: 'Hesaplama ve Mantık Akışı',
              surum: '1.0.0',
              yazar: 'Developed By K7~ ',
              hedef_dil: 'typescript',
              giris_noktasi: 'main.ts',
              aciklama: ''
            },
            gorunum: parsed.gorunum || {
              kaydirma_x: 0,
              kaydirma_y: 0,
              olcek: 1,
              izgara_goster: true,
              hizalama_aktif: true
            },
            dugumler: (parsed.dugumler || []).map((d: any) => ({
              ...d,
              girdiler: d.girdiler || [],
              ciktilar: d.ciktilar || []
            })),
            baglantilar: parsed.baglantilar || [],
            degiskenler: parsed.degiskenler || [],
            fonksiyonlar: parsed.fonksiyonlar || [],
            dosyalar: dosyalar || []
          };
        }
      }
    } catch {
      // Yoksay
    }
    return JSON.parse(JSON.stringify(hazir_sablonlar[0].veri));
  });

  // Dosya Sekmeleri ve Aktif Dosya Yönetimi
  const [aktif_dosya_id, set_aktif_dosya_id] = useState<string>(() => {
    return proje.dosyalar?.[0]?.id || 'dosya_main_graph';
  });

  const [acik_dosyalar, set_acik_dosyalar] = useState<string[]>(() => {
    return (proje.dosyalar || []).slice(0, 4).map(d => d.id);
  });

  // 2. Geçmiş / Undo-Redo Yığınları
  const [gecmis, set_gecmis] = useState<proje_yapisi[]>([]);
  const [ileri, set_ileri] = useState<proje_yapisi[]>([]);

  // 3. Konsol ve Çıktı Günlükleri
  const [konsol_kayitlari, set_konsol_kayitlari] = useState<konsol_kaydi[]>([
    {
      id: 'k1',
      seviye: 'bilgi',
      metin: 'NODEFORGE Visual Programming Studio hazır. Developed By K7~',
      zaman: new Date().toLocaleTimeString()
    },
    {
      id: 'k2',
      seviye: 'basari',
      metin: `Proje "${hazir_sablonlar[0].ad}" çalışma alanına başarıyla yüklendi.`,
      zaman: new Date().toLocaleTimeString()
    }
  ]);

  // 4. Derleme Durumu
  const [son_derleme, set_son_derleme] = useState<derleme_sonucu | null>(null);
  const [calisiyor_mu, set_calisiyor_mu] = useState<boolean>(false);
  const [kopyalanan_dugumler, set_kopyalanan_dugumler] = useState<dugum_tanimi[]>([]);

  // Otomatik Yerel Kaydetme
  useEffect(() => {
    try {
      localStorage.setItem(YEREL_DEPOLAMA_ANAHTARI, JSON.stringify(proje));
    } catch {
      // Yoksay
    }
  }, [proje]);

  // Canlı Kod Önizleme Derlemesi
  useEffect(() => {
    const sonuc = projeyi_derle_ve_kod_uret(proje);
    set_son_derleme(sonuc);
  }, [proje]);

  // Geçmiş Kaydı Ekleme
  const gecmise_kaydet = useCallback((yeni_proje: proje_yapisi) => {
    set_gecmis(onceki => [...onceki.slice(-30), JSON.parse(JSON.stringify(proje))]);
    set_ileri([]);
    set_proje(yeni_proje);
  }, [proje]);

  // Geri Al (Undo)
  const geri_al = useCallback(() => {
    if (gecmis.length === 0) return;
    const onceki_durum = gecmis[gecmis.length - 1];
    set_gecmis(onceki => onceki.slice(0, -1));
    set_ileri(onceki => [...onceki, JSON.parse(JSON.stringify(proje))]);
    set_proje(onceki_durum);
  }, [gecmis, proje]);

  // Yinele (Redo)
  const yinele = useCallback(() => {
    if (ileri.length === 0) return;
    const sonraki_durum = ileri[ileri.length - 1];
    set_ileri(onceki => onceki.slice(0, -1));
    set_gecmis(onceki => [...onceki, JSON.parse(JSON.stringify(proje))]);
    set_proje(sonraki_durum);
  }, [ileri, proje]);

  // Düğüm Ekleme
  const dugum_ekle = useCallback((sablon: dugum_sablonu, x: number, y: number) => {
    const yeni_dugum = sablondan_dugum_olustur(sablon, x, y);
    const yeni_dugumler = [...proje.dugumler.map(d => ({ ...d, secili: false })), { ...yeni_dugum, secili: true }];
    gecmise_kaydet({
      ...proje,
      dugumler: yeni_dugumler
    });
    return yeni_dugum;
  }, [proje, gecmise_kaydet]);

  // Düğüm Taşıma
  const dugum_tasi = useCallback((dugum_id: string, x: number, y: number) => {
    set_proje(onceki => ({
      ...onceki,
      dugumler: onceki.dugumler.map(d => d.id === dugum_id ? {
        ...d,
        konum_x: Math.round(x / 10) * 10,
        konum_y: Math.round(y / 10) * 10
      } : d)
    }));
  }, []);

  // Düğüm Seçimi
  const dugum_sec = useCallback((dugum_id: string, coklu: boolean = false) => {
    set_proje(onceki => ({
      ...onceki,
      dugumler: onceki.dugumler.map(d => {
        if (d.id === dugum_id) {
          return { ...d, secili: coklu ? !d.secili : true };
        }
        return coklu ? d : { ...d, secili: false };
      })
    }));
  }, []);

  const tum_secimleri_temizle = useCallback(() => {
    set_proje(onceki => ({
      ...onceki,
      dugumler: onceki.dugumler.map(d => ({ ...d, secili: false }))
    }));
  }, []);

  // Düğüm Silme
  const secili_dugumlari_sil = useCallback(() => {
    const secili_idler = new Set(proje.dugumler.filter(d => d.secili).map(d => d.id));
    if (secili_idler.size === 0) return;

    const yeni_dugumler = proje.dugumler.filter(d => !secili_idler.has(d.id));
    const yeni_baglantilar = proje.baglantilar.filter(
      b => !secili_idler.has(b.kaynak_dugum_id) && !secili_idler.has(b.hedef_dugum_id)
    );

    gecmise_kaydet({
      ...proje,
      dugumler: yeni_dugumler,
      baglantilar: yeni_baglantilar
    });
  }, [proje, gecmise_kaydet]);

  const tekil_dugum_sil = useCallback((dugum_id: string) => {
    const yeni_dugumler = proje.dugumler.filter(d => d.id !== dugum_id);
    const yeni_baglantilar = proje.baglantilar.filter(
      b => b.kaynak_dugum_id !== dugum_id && b.hedef_dugum_id !== dugum_id
    );

    gecmise_kaydet({
      ...proje,
      dugumler: yeni_dugumler,
      baglantilar: yeni_baglantilar
    });
  }, [proje, gecmise_kaydet]);

  // Bağlantı Oluşturma
  const baglanti_olustur = useCallback((
    kaynak_dugum_id: string,
    kaynak_port_id: string,
    hedef_dugum_id: string,
    hedef_port_id: string,
    tip: veri_tipi
  ) => {
    // Kendine bağlantıyı engelle
    if (kaynak_dugum_id === hedef_dugum_id) return false;

    // Hedef porta zaten başka bağlantı varsa (eğer çoklu değilse) eskiyi kaldır
    const filtrelenmis_baglantilar = proje.baglantilar.filter(b => b.hedef_port_id !== hedef_port_id);

    const yeni_baglanti: baglanti_tanimi = {
      id: 'bag_' + Math.random().toString(36).substring(2, 9),
      kaynak_dugum_id,
      kaynak_port_id,
      hedef_dugum_id,
      hedef_port_id,
      tip
    };

    gecmise_kaydet({
      ...proje,
      baglantilar: [...filtrelenmis_baglantilar, yeni_baglanti]
    });
    return true;
  }, [proje, gecmise_kaydet]);

  // Bağlantı Silme
  const baglanti_sil = useCallback((baglanti_id: string) => {
    const yeni_baglantilar = proje.baglantilar.filter(b => b.id !== baglanti_id);
    gecmise_kaydet({
      ...proje,
      baglantilar: yeni_baglantilar
    });
  }, [proje, gecmise_kaydet]);

  // Düğüm Özellik Güncelleme
  const dugum_ozellik_guncelle = useCallback((dugum_id: string, ozellik_adi: string, deger: any) => {
    set_proje(onceki => ({
      ...onceki,
      dugumler: onceki.dugumler.map(d => d.id === dugum_id ? {
        ...d,
        ozellikler: { ...d.ozellikler, [ozellik_adi]: deger }
      } : d)
    }));
  }, []);

  // Port Varsayılan Değer Güncelleme
  const port_varsayilan_guncelle = useCallback((dugum_id: string, port_id: string, deger: any) => {
    set_proje(onceki => ({
      ...onceki,
      dugumler: onceki.dugumler.map(d => d.id === dugum_id ? {
        ...d,
        girdiler: d.girdiler.map(g => g.id === port_id ? { ...g, varsayilan_deger: deger } : g)
      } : d)
    }));
  }, []);

  // Değişken İşlemleri
  const degisken_ekle = useCallback((ad: string, tip: veri_tipi, varsayilan_deger: any, aciklama?: string) => {
    const yeni_degisken: degisken_tanimi = {
      id: 'deg_' + Math.random().toString(36).substring(2, 8),
      ad: ad.trim().replace(/\s+/g, '_'),
      tip,
      varsayilan_deger,
      aciklama
    };

    gecmise_kaydet({
      ...proje,
      degiskenler: [...proje.degiskenler, yeni_degisken]
    });
  }, [proje, gecmise_kaydet]);

  const degisken_sil = useCallback((degisken_id: string) => {
    gecmise_kaydet({
      ...proje,
      degiskenler: proje.degiskenler.filter(d => d.id !== degisken_id)
    });
  }, [proje, gecmise_kaydet]);

  const degisken_guncelle = useCallback((id: string, ad: string, tip: veri_tipi, varsayilan_deger: any) => {
    gecmise_kaydet({
      ...proje,
      degiskenler: proje.degiskenler.map(d => d.id === id ? {
        ...d,
        ad: ad.trim().replace(/\s+/g, '_'),
        tip,
        varsayilan_deger
      } : d)
    });
  }, [proje, gecmise_kaydet]);

  // Fonksiyon İşlemleri
  const fonksiyon_ekle = useCallback((ad: string, donus_tipi: veri_tipi = 'herhangi') => {
    gecmise_kaydet({
      ...proje,
      fonksiyonlar: [
        ...proje.fonksiyonlar,
        {
          id: 'fn_' + Math.random().toString(36).substring(2, 8),
          ad: ad.trim().replace(/\s+/g, '_'),
          parametreler: [{ id: 'p1', ad: 'parametre_1', tip: 'herhangi' }],
          donus_tipi
        }
      ]
    });
  }, [proje, gecmise_kaydet]);

  // Hedef Dil Değiştirme
  const dil_degistir = useCallback((yeni_dil: dil_secenegi) => {
    gecmise_kaydet({
      ...proje,
      ayarlar: {
        ...proje.ayarlar,
        hedef_dil: yeni_dil,
        giris_noktasi: yeni_dil === 'javascript' ? 'main.js' : (yeni_dil === 'python' ? 'main.py' : 'main.ts')
      }
    });
  }, [proje, gecmise_kaydet]);

  // Görünüm (Pan / Zoom) Güncelleme
  const gorunum_guncelle = useCallback((kaydirma_x: number, kaydirma_y: number, olcek: number) => {
    set_proje(onceki => ({
      ...onceki,
      gorunum: {
        ...onceki.gorunum,
        kaydirma_x,
        kaydirma_y,
        olcek: Math.min(Math.max(olcek, 0.25), 2.5)
      }
    }));
  }, []);

  // Kopyala / Yapıştır / Duplicate
  const secili_dugumlari_kopyala = useCallback(() => {
    const secili = proje.dugumler.filter(d => d.secili);
    if (secili.length > 0) {
      set_kopyalanan_dugumler(JSON.parse(JSON.stringify(secili)));
    }
  }, [proje.dugumler]);

  const dugumlari_yapistir = useCallback((konum_x: number, konum_y: number) => {
    if (kopyalanan_dugumler.length === 0) return;

    const id_eslestirme = new Map<string, string>();
    const yeni_eklenenler: dugum_tanimi[] = [];

    kopyalanan_dugumler.forEach((d, idx) => {
      const yeni_id = 'dugum_' + Math.random().toString(36).substring(2, 9);
      id_eslestirme.set(d.id, yeni_id);

      const yeni_d: dugum_tanimi = {
        ...d,
        id: yeni_id,
        konum_x: konum_x + (idx * 30),
        konum_y: konum_y + (idx * 30),
        secili: true,
        girdiler: d.girdiler.map((g, gi) => ({
          ...g,
          id: `${yeni_id}_g_${gi}_${g.ad}`
        })),
        ciktilar: d.ciktilar.map((c, ci) => ({
          ...c,
          id: `${yeni_id}_c_${ci}_${c.ad}`
        }))
      };
      yeni_eklenenler.push(yeni_d);
    });

    const tum_dugumler = [
      ...proje.dugumler.map(d => ({ ...d, secili: false })),
      ...yeni_eklenenler
    ];

    gecmise_kaydet({
      ...proje,
      dugumler: tum_dugumler
    });
  }, [kopyalanan_dugumler, proje, gecmise_kaydet]);

  const dugum_cogalt = useCallback((dugum_id: string) => {
    const hedef = proje.dugumler.find(d => d.id === dugum_id);
    if (!hedef) return;

    const yeni_id = 'dugum_' + Math.random().toString(36).substring(2, 9);
    const yeni_dugum: dugum_tanimi = {
      ...hedef,
      id: yeni_id,
      konum_x: hedef.konum_x + 40,
      konum_y: hedef.konum_y + 40,
      secili: true,
      girdiler: hedef.girdiler.map((g, gi) => ({
        ...g,
        id: `${yeni_id}_g_${gi}_${g.ad}`
      })),
      ciktilar: hedef.ciktilar.map((c, ci) => ({
        ...c,
        id: `${yeni_id}_c_${ci}_${c.ad}`
      }))
    };

    gecmise_kaydet({
      ...proje,
      dugumler: [...proje.dugumler.map(d => ({ ...d, secili: false })), yeni_dugum]
    });
  }, [proje, gecmise_kaydet]);

  // Proje Sıfırla / Şablon Yükle
  const sablon_yukle = useCallback((sablon_id: string) => {
    const sablon = hazir_sablonlar.find(s => s.id === sablon_id) || hazir_sablonlar[0];
    const yeni_veri = JSON.parse(JSON.stringify(sablon.veri));
    set_gecmis([]);
    set_ileri([]);
    set_proje(yeni_veri);
    set_konsol_kayitlari(onceki => [
      ...onceki,
      {
        id: 'k_' + Date.now(),
        seviye: 'bilgi',
        metin: `Şablon yüklendi: ${sablon.ad}`,
        zaman: new Date().toLocaleTimeString()
      }
    ]);
  }, []);

  const yeni_bos_proje = useCallback((ad: string, dil: dil_secenegi) => {
    const bos_proje: proje_yapisi = {
      id: 'proje_' + Math.random().toString(36).substring(2, 8),
      ayarlar: {
        proje_adi: ad || 'Yeni Proje',
        surum: '1.0.0',
        yazar: 'Developed By K7~',
        hedef_dil: dil,
        giris_noktasi: dil === 'python' ? 'main.py' : (dil === 'javascript' ? 'main.js' : 'main.ts'),
        aciklama: 'Visual programming studio projesi.',
        olusturma_tarihi: new Date().toISOString(),
        guncelleme_tarihi: new Date().toISOString()
      },
      degiskenler: [],
      fonksiyonlar: [],
      dugumler: [
        {
          id: 'dugum_baslangic',
          tip_kodu: 'akis_baslangic',
          baslik: 'Başlangıç',
          alt_baslik: 'Program Girişi',
          kategori: 'akis',
          renk: '#10b981',
          ikon_adi: 'Play',
          konum_x: 100,
          konum_y: 180,
          ozellikler: {},
          girdiler: [],
          ciktilar: [
            { id: 'dugum_baslangic_cikis_akis', ad: 'cikis_akis', etiket: 'Akış', yon: 'cikti', tip: 'akis' }
          ]
        }
      ],
      baglantilar: [],
      dosyalar: [],
      gorunum: {
        kaydirma_x: 20,
        kaydirma_y: 20,
        olcek: 1,
        izgara_goster: true,
        hizalama_aktif: true
      }
    };

    set_gecmis([]);
    set_ileri([]);
    set_proje(bos_proje);
  }, []);

  // Konsolu Temizle
  const konsolu_temizle = useCallback(() => {
    set_konsol_kayitlari([]);
  }, []);

  // Dosya Aç (Sekmeye ekle ve aktif yap)
  const dosya_ac = useCallback((dosya_id: string) => {
    set_proje(onceki => {
      const dosyalar = [...(onceki.dosyalar || [])];
      const aktif_idx = dosyalar.findIndex(d => d.id === aktif_dosya_id);
      if (aktif_idx >= 0 && dosyalar[aktif_idx].tur === 'grafik') {
        dosyalar[aktif_idx] = {
          ...dosyalar[aktif_idx],
          grafik_verisi: {
            dugumler: onceki.dugumler || [],
            baglantilar: onceki.baglantilar || [],
            degiskenler: onceki.degiskenler || [],
            fonksiyonlar: onceki.fonksiyonlar || [],
            gorunum: onceki.gorunum
          }
        };
      }

      // Hedef dosya grafik ise tuvale yükle
      const hedef = dosyalar.find(d => d.id === dosya_id);
      if (hedef && hedef.tur === 'grafik') {
        const gv = hedef.grafik_verisi;
        return {
          ...onceki,
          dosyalar,
          dugumler: gv?.dugumler || (onceki.dugumler?.length ? onceki.dugumler : [
            {
              id: 'dugum_baslangic_' + Date.now(),
              tip_kodu: 'akis_baslangic',
              baslik: 'Başlangıç',
              alt_baslik: hedef.ad.replace('.graph', ''),
              kategori: 'akis',
              renk: '#10b981',
              ikon_adi: 'Play',
              konum_x: 60,
              konum_y: 150,
              ozellikler: {},
              girdiler: [],
              ciktilar: [
                { id: 'cikis_' + Date.now(), ad: 'cikis_akis', etiket: 'Akış', yon: 'cikti', tip: 'akis' }
              ]
            }
          ]),
          baglantilar: gv?.baglantilar || [],
          gorunum: gv?.gorunum || onceki.gorunum
        };
      }

      return {
        ...onceki,
        dosyalar
      };
    });

    set_aktif_dosya_id(dosya_id);
    set_acik_dosyalar(onceki => onceki.includes(dosya_id) ? onceki : [...onceki, dosya_id]);
  }, [aktif_dosya_id]);

  // Dosya Kapat (Sekmeyi kapat)
  const dosya_kapat = useCallback((dosya_id: string) => {
    set_acik_dosyalar(onceki => {
      const yeni = onceki.filter(id => id !== dosya_id);
      if (aktif_dosya_id === dosya_id && yeni.length > 0) {
        dosya_ac(yeni[yeni.length - 1]);
      }
      return yeni;
    });
  }, [aktif_dosya_id, dosya_ac]);

  // Yeni Dosya Oluştur
  const dosya_olustur = useCallback((ad: string, tur: 'grafik' | 'kod' | 'yapilandirma' | 'veri' | 'diger', icerik?: string) => {
    const yeni_id = 'dosya_' + Math.random().toString(36).substring(2, 9);
    const yeni_dosya: dosya_tanimi = {
      id: yeni_id,
      yol: tur === 'grafik' || tur === 'kod' ? `src/${ad}` : ad,
      ad,
      tur,
      icerik: icerik || (tur === 'kod' ? '// NODEFORGE Kaynak Dosyası\n' : ''),
      grafik_verisi: tur === 'grafik' ? {
        dugumler: [
          {
            id: 'dugum_baslangic_' + Date.now(),
            tip_kodu: 'akis_baslangic',
            baslik: 'Başlangıç',
            alt_baslik: ad.replace('.graph', ''),
            kategori: 'akis',
            renk: '#10b981',
            ikon_adi: 'Play',
            konum_x: 60,
            konum_y: 150,
            ozellikler: {},
            girdiler: [],
            ciktilar: [
              { id: 'cikis_' + Date.now(), ad: 'cikis_akis', etiket: 'Akış', yon: 'cikti', tip: 'akis' }
            ]
          }
        ],
        baglantilar: []
      } : undefined
    };

    set_proje(onceki => ({
      ...onceki,
      dosyalar: [...(onceki.dosyalar || []), yeni_dosya]
    }));

    set_acik_dosyalar(onceki => [...onceki, yeni_id]);
    set_aktif_dosya_id(yeni_id);

    set_konsol_kayitlari(onceki => [
      ...onceki,
      {
        id: 'k_dosya_' + Date.now(),
        seviye: 'basari',
        metin: `Yeni dosya oluşturuldu: ${ad} (${tur})`,
        zaman: new Date().toLocaleTimeString()
      }
    ]);
  }, []);

  // Dosya Sil
  const dosya_sil = useCallback((dosya_id: string) => {
    set_proje(onceki => {
      const yeni_dosyalar = (onceki.dosyalar || []).filter(d => d.id !== dosya_id);
      return {
        ...onceki,
        dosyalar: yeni_dosyalar
      };
    });

    set_acik_dosyalar(onceki => {
      const yeni = onceki.filter(id => id !== dosya_id);
      if (aktif_dosya_id === dosya_id && yeni.length > 0) {
        set_aktif_dosya_id(yeni[0]);
      }
      return yeni;
    });
  }, [aktif_dosya_id]);

  // Dosya Adı Değiştir
  const dosya_adi_degistir = useCallback((dosya_id: string, yeni_ad: string) => {
    set_proje(onceki => ({
      ...onceki,
      dosyalar: (onceki.dosyalar || []).map(d => d.id === dosya_id ? {
        ...d,
        ad: yeni_ad,
        yol: d.tur === 'grafik' || d.tur === 'kod' ? `src/${yeni_ad}` : yeni_ad
      } : d)
    }));
  }, []);

  // Dosya İçerik Güncelle (Metin / Kod editörü için)
  const dosya_icerik_guncelle = useCallback((dosya_id: string, yeni_icerik: string) => {
    set_proje(onceki => ({
      ...onceki,
      dosyalar: (onceki.dosyalar || []).map(d => d.id === dosya_id ? {
        ...d,
        icerik: yeni_icerik
      } : d)
    }));
  }, []);

  // Kaynak Koda Aktar (Görsel Grafiği Seçili Dilin Koduna Dönüştür ve Dosyaya/Panele Ekle)
  const kaynak_koda_aktar = useCallback((hedef_dil_ozel?: dil_secenegi) => {
    const dil = hedef_dil_ozel || proje.ayarlar.hedef_dil || 'typescript';
    const derleme = projeyi_derle_ve_kod_uret(proje, dil);
    set_son_derleme(derleme);

    let dosya_adi = 'main.ts';
    if (dil === 'cpp') dosya_adi = 'main.cpp';
    else if (dil === 'csharp') dosya_adi = 'Program.cs';
    else if (dil === 'python') dosya_adi = 'main.py';
    else if (dil === 'javascript') dosya_adi = 'main.js';
    else if (dil === 'rust') dosya_adi = 'main.rs';
    else if (dil === 'go') dosya_adi = 'main.go';

    // Dosyalar listesinde ilgili kod dosyası var mı kontrol et, varsa güncelle, yoksa ekle
    set_proje(onceki => {
      const dosyalar = [...(onceki.dosyalar || [])];
      const kod_dosya_idx = dosyalar.findIndex(d => d.ad === dosya_adi || d.yol === `src/${dosya_adi}`);

      if (kod_dosya_idx >= 0) {
        dosyalar[kod_dosya_idx] = {
          ...dosyalar[kod_dosya_idx],
          icerik: derleme.ana_kod
        };
      } else {
        dosyalar.push({
          id: 'dosya_' + dosya_adi.replace(/[^a-zA-Z0-9]/g, '_'),
          ad: dosya_adi,
          yol: `src/${dosya_adi}`,
          tur: 'kod',
          icerik: derleme.ana_kod
        });
      }

      return {
        ...onceki,
        dosyalar
      };
    });

    set_konsol_kayitlari(onceki => [
      ...onceki,
      {
        id: 'k_aktar_' + Date.now(),
        seviye: 'basari',
        metin: `[KAYNAK KODA AKTARILDI] Görsel grafik başarıyla ${dil.toUpperCase()} formatında (src/${dosya_adi}) kaynak koda dönüştürüldü. (${derleme.ana_kod.split('\n').length} satır)`,
        zaman: new Date().toLocaleTimeString()
      }
    ]);

    return derleme;
  }, [proje]);

  // Projeyi Çalıştır (F5)
  const projeyi_yurut = useCallback(async () => {
    if (calisiyor_mu) return;
    set_calisiyor_mu(true);

    const dil = proje.ayarlar.hedef_dil || 'typescript';
    const statik_diller = ['cpp', 'csharp', 'rust', 'go'];

    if (statik_diller.includes(dil)) {
      // Statik diller için derleme ve kaynak kod üretimi
      const derleme = kaynak_koda_aktar(dil);
      
      let dil_adi = 'C++';
      let compiler_ornek = 'g++ -std=c++20 src/main.cpp -o app && ./app';
      if (dil === 'csharp') {
        dil_adi = 'C# (.NET 8)';
        compiler_ornek = 'dotnet run (veya Visual Studio / Unity)';
      } else if (dil === 'rust') {
        dil_adi = 'Rust';
        compiler_ornek = 'rustc src/main.rs && ./main (veya cargo run)';
      } else if (dil === 'go') {
        dil_adi = 'Go';
        compiler_ornek = 'go run src/main.go';
      }

      set_konsol_kayitlari(onceki => [
        ...onceki,
        {
          id: 'k_statik_bilgi_' + Date.now(),
          seviye: 'bilgi',
          metin: `---------------- [ ${dil_adi.toUpperCase()} KAYNAK KODU ÜRETİLDİ ] ----------------`,
          zaman: new Date().toLocaleTimeString()
        },
        {
          id: 'k_statik_uyari_' + Date.now(),
          seviye: 'uyari',
          metin: `${dil_adi} statik derlenen bir dil olduğu için tarayıcı ortamında doğrudan çalıştırılamaz. Görsel grafiğiniz eksiksiz kaynak kod olarak derlendi.`,
          zaman: new Date().toLocaleTimeString()
        },
        {
          id: 'k_statik_ipucu_' + Date.now(),
          seviye: 'basari',
          metin: `Kodunuzu 'Kodu İndir' butonuyla alıp şu komutla derleyebilirsiniz: ${compiler_ornek}`,
          zaman: new Date().toLocaleTimeString()
        }
      ]);

      set_calisiyor_mu(false);
      return;
    }

    set_konsol_kayitlari(onceki => [
      ...onceki,
      {
        id: 'k_calistir_' + Date.now(),
        seviye: 'bilgi',
        metin: `---------------- [ YÜRÜTME BAŞLADI: ${proje.ayarlar.proje_adi} ] ----------------`,
        zaman: new Date().toLocaleTimeString()
      }
    ]);

    try {
      const sonuc = await projeyi_calistir(proje);
      set_konsol_kayitlari(onceki => [...onceki, ...sonuc.ciktilar]);
    } catch (h: any) {
      set_konsol_kayitlari(onceki => [
        ...onceki,
        {
          id: 'hata_' + Date.now(),
          seviye: 'hata',
          metin: `Çalıştırma hatası: ${h.message || String(h)}`,
          zaman: new Date().toLocaleTimeString()
        }
      ]);
    } finally {
      set_calisiyor_mu(false);
    }
  }, [calisiyor_mu, proje, kaynak_koda_aktar]);

  // Proje Dışa Aktarma (.nodeforge JSON)
  const projeyi_disa_aktar = useCallback(() => {
    const json_metni = JSON.stringify(proje, null, 2);
    const blob = new Blob([json_metni], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${proje.ayarlar.proje_adi.toLowerCase().replace(/\s+/g, '_')}.nodeforge`;
    a.click();
    URL.revokeObjectURL(url);
  }, [proje]);

  // Proje İçe Aktarma (.nodeforge / JSON)
  const projeyi_ice_aktar = useCallback((json_metni: string) => {
    try {
      const yuklenen = JSON.parse(json_metni);
      if (yuklenen && Array.isArray(yuklenen.dugumler)) {
        set_gecmis([]);
        set_ileri([]);
        set_proje(yuklenen);
        set_konsol_kayitlari(onceki => [
          ...onceki,
          {
            id: 'k_aktar_' + Date.now(),
            seviye: 'basari',
            metin: `Proje içe aktarıldı: ${yuklenen.ayarlar?.proje_adi || 'Bilinmeyen Proje'}`,
            zaman: new Date().toLocaleTimeString()
          }
        ]);
        return true;
      }
    } catch {
      alert('Geçersiz NODEFORGE proje dosyası formatı!');
    }
    return false;
  }, []);

  return {
    proje,
    set_proje,
    gecmis,
    ileri,
    geri_al,
    yinele,
    dugum_ekle,
    dugum_tasi,
    dugum_sec,
    tum_secimleri_temizle,
    secili_dugumlari_sil,
    tekil_dugum_sil,
    baglanti_olustur,
    baglanti_sil,
    dugum_ozellik_guncelle,
    port_varsayilan_guncelle,
    degisken_ekle,
    degisken_sil,
    degisken_guncelle,
    fonksiyon_ekle,
    dil_degistir,
    gorunum_guncelle,
    secili_dugumlari_kopyala,
    dugumlari_yapistir,
    dugum_cogalt,
    sablon_yukle,
    yeni_bos_proje,
    konsol_kayitlari,
    konsolu_temizle,
    son_derleme,
    calisiyor_mu,
    projeyi_yurut,
    kaynak_koda_aktar,
    projeyi_disa_aktar,
    projeyi_ice_aktar,
    aktif_dosya_id,
    acik_dosyalar,
    dosya_ac,
    dosya_kapat,
    dosya_olustur,
    dosya_sil,
    dosya_adi_degistir,
    dosya_icerik_guncelle
  };
}
