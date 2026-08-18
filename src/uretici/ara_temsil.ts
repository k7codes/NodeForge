/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~ 
 * Ara Temsil (Intermediate Representation - IR) Olusturucu
 */

import { proje_yapisi, dugum_tanimi, baglanti_tanimi } from '../tipler/grafik_tipleri';

export interface ara_ifade {
  tur: 'degisken' | 'sabit' | 'ikili_islem' | 'mantik_islem' | 'fonksiyon_cagrisi' | 'dize_birlestir' | 'dize_islem' | 'rastgele' | 'ozel';
  veri_tipi?: string;
  deger?: any;
  operator?: string;
  sol?: ara_ifade;
  sag?: ara_ifade;
  argumanlar?: ara_ifade[];
  ek_bilgi?: Record<string, any>;
}

export interface ara_komut {
  id: string;
  tur: 'degisken_tanimla' | 'degisken_ata' | 'degisken_artir' | 'kosul_blogu' | 'dongu_for' | 'dongu_while' | 'konsol_yaz' | 'konsol_uyari' | 'fonksiyon_tanimla' | 'fonksiyon_donusu' | 'fonksiyon_cagir' | 'dosya_yaz' | 'gecikme' | 'ozel_ifade';
  dugum_id?: string;
  degisken_adi?: string;
  degisken_tipi?: string;
  ifade?: ara_ifade;
  kosul?: ara_ifade;
  dogru_govde?: ara_komut[];
  yanlis_govde?: ara_komut[];
  dongu_govdesi?: ara_komut[];
  dongu_tamamlandi_govdesi?: ara_komut[];
  sayac_adi?: string;
  baslangic?: ara_ifade;
  bitis?: ara_ifade;
  artis?: ara_ifade;
  sure_ms?: number;
  mesaj?: ara_ifade;
  fonksiyon_adi?: string;
  parametreler?: { ad: string; tip: string }[];
  donus_tipi?: string;
  fonksiyon_govdesi?: ara_komut[];
}

export interface ara_proje_temsili {
  proje_adi: string;
  hedef_dil: string;
  degisken_bildirimleri: {
    ad: string;
    tip: string;
    ilk_deger: any;
    aciklama?: string;
  }[];
  ana_akis_komutlari: ara_komut[];
  fonksiyon_bildirimleri: ara_komut[];
}

export function grafigi_ara_temsile_donustur(proje: proje_yapisi): ara_proje_temsili {
  const dugumler = proje.dugumler || [];
  const baglantilar = proje.baglantilar || [];
  const degiskenler = proje.degiskenler || [];
  const fonksiyonlar = proje.fonksiyonlar || [];

  const dugum_haritasi = new Map<string, dugum_tanimi>();
  dugumler.forEach(d => dugum_haritasi.set(d.id, d));

  const hedef_baglantilar = new Map<string, baglanti_tanimi[]>();
  baglantilar.forEach(b => {
    const mevcut = hedef_baglantilar.get(b.hedef_port_id) || [];
    mevcut.push(b);
    hedef_baglantilar.set(b.hedef_port_id, mevcut);
  });

  const kaynak_baglantilar = new Map<string, baglanti_tanimi[]>();
  baglantilar.forEach(b => {
    const mevcut = kaynak_baglantilar.get(b.kaynak_port_id) || [];
    mevcut.push(b);
    kaynak_baglantilar.set(b.kaynak_port_id, mevcut);
  });

  // Veri portundan ifade çözümleme (Recursive Expression Resolution)
  function port_ifadesini_coz(hedef_dugum: dugum_tanimi, girdi_port_adi: string): ara_ifade {
    const port = (hedef_dugum.girdiler || []).find(p => p.ad === girdi_port_adi);
    if (!port) {
      return { tur: 'sabit', deger: null };
    }

    const gelen_baglanti = hedef_baglantilar.get(port.id)?.[0];
    if (!gelen_baglanti) {
      // Bağlantı yoksa kullanıcının girdiği varsayılan değeri kullan
      const val = port.varsayilan_deger !== undefined ? port.varsayilan_deger : (port.tip === 'sayi' ? 0 : (port.tip === 'mantiksal' ? false : ''));
      return { tur: 'sabit', deger: val };
    }

    const kaynak_dugum = dugum_haritasi.get(gelen_baglanti.kaynak_dugum_id);
    if (!kaynak_dugum) {
      return { tur: 'sabit', deger: port.varsayilan_deger };
    }

    // Kaynak düğüm tipine göre ifade türet
    return dugumden_ifade_uret(kaynak_dugum, gelen_baglanti.kaynak_port_id);
  }

  function dugumden_ifade_uret(dugum: dugum_tanimi, cikti_port_id?: string): ara_ifade {
    switch (dugum.tip_kodu) {
      case 'degisken_getir':
        return {
          tur: 'degisken',
          deger: dugum.ozellikler?.degisken_adi || 'degisken'
        };

      case 'sabit_sayi':
        return {
          tur: 'sabit',
          deger: Number(dugum.ozellikler?.deger !== undefined ? dugum.ozellikler.deger : (dugum.girdiler?.[0]?.varsayilan_deger ?? 0))
        };

      case 'sabit_metin':
        return {
          tur: 'sabit',
          deger: String(dugum.ozellikler?.deger !== undefined ? dugum.ozellikler.deger : (dugum.girdiler?.[0]?.varsayilan_deger ?? ''))
        };

      case 'sabit_mantiksal':
        return {
          tur: 'sabit',
          deger: Boolean(dugum.ozellikler?.deger !== undefined ? dugum.ozellikler.deger : (dugum.girdiler?.[0]?.varsayilan_deger ?? true))
        };

      case 'mantik_karsilastir':
        return {
          tur: 'ikili_islem',
          operator: dugum.ozellikler?.operator || '==',
          sol: port_ifadesini_coz(dugum, 'a'),
          sag: port_ifadesini_coz(dugum, 'b')
        };

      case 'mantik_ve':
        return {
          tur: 'mantik_islem',
          operator: '&&',
          sol: port_ifadesini_coz(dugum, 'a'),
          sag: port_ifadesini_coz(dugum, 'b')
        };

      case 'mantik_veya':
        return {
          tur: 'mantik_islem',
          operator: '||',
          sol: port_ifadesini_coz(dugum, 'a'),
          sag: port_ifadesini_coz(dugum, 'b')
        };

      case 'mantik_degil':
        return {
          tur: 'mantik_islem',
          operator: '!',
          sol: port_ifadesini_coz(dugum, 'giris')
        };

      case 'matematik_topla':
        return {
          tur: 'ikili_islem',
          operator: '+',
          sol: port_ifadesini_coz(dugum, 'a'),
          sag: port_ifadesini_coz(dugum, 'b')
        };

      case 'matematik_cikar':
        return {
          tur: 'ikili_islem',
          operator: '-',
          sol: port_ifadesini_coz(dugum, 'a'),
          sag: port_ifadesini_coz(dugum, 'b')
        };

      case 'matematik_carp':
        return {
          tur: 'ikili_islem',
          operator: '*',
          sol: port_ifadesini_coz(dugum, 'a'),
          sag: port_ifadesini_coz(dugum, 'b')
        };

      case 'matematik_bol':
        return {
          tur: 'ikili_islem',
          operator: '/',
          sol: port_ifadesini_coz(dugum, 'a'),
          sag: port_ifadesini_coz(dugum, 'b')
        };

      case 'matematik_mod':
        return {
          tur: 'ikili_islem',
          operator: '%',
          sol: port_ifadesini_coz(dugum, 'a'),
          sag: port_ifadesini_coz(dugum, 'b')
        };

      case 'matematik_us':
        return {
          tur: 'ikili_islem',
          operator: '**',
          sol: port_ifadesini_coz(dugum, 'taban'),
          sag: port_ifadesini_coz(dugum, 'us')
        };

      case 'matematik_rastgele':
        return {
          tur: 'rastgele',
          sol: port_ifadesini_coz(dugum, 'min'),
          sag: port_ifadesini_coz(dugum, 'max')
        };

      case 'matematik_min_max':
        return {
          tur: 'fonksiyon_cagrisi',
          deger: dugum.ozellikler?.mod === 'min' ? 'Math.min' : 'Math.max',
          argumanlar: [port_ifadesini_coz(dugum, 'a'), port_ifadesini_coz(dugum, 'b')]
        };

      case 'matematik_yuvarla':
        return {
          tur: 'fonksiyon_cagrisi',
          deger: `Math.${dugum.ozellikler?.yuvarlama_tipi || 'round'}`,
          argumanlar: [port_ifadesini_coz(dugum, 'sayi')]
        };

      case 'matematik_mutlak':
        return {
          tur: 'fonksiyon_cagrisi',
          deger: 'Math.abs',
          argumanlar: [port_ifadesini_coz(dugum, 'sayi')]
        };

      case 'metin_birlestir':
        return {
          tur: 'dize_birlestir',
          sol: port_ifadesini_coz(dugum, 'metin_1'),
          sag: port_ifadesini_coz(dugum, 'metin_2'),
          ek_bilgi: { ayrac: dugum.ozellikler?.ayrac || '' }
        };

      case 'metin_uzunluk':
        return {
          tur: 'dize_islem',
          operator: 'uzunluk',
          sol: port_ifadesini_coz(dugum, 'metin')
        };

      case 'metin_iceriyor_mu':
        return {
          tur: 'dize_islem',
          operator: 'iceriyor',
          sol: port_ifadesini_coz(dugum, 'ana_metin'),
          sag: port_ifadesini_coz(dugum, 'aranan')
        };

      case 'metin_buyuk_kucuk':
        return {
          tur: 'dize_islem',
          operator: dugum.ozellikler?.mod === 'kucuk' ? 'kucuk_harf' : 'buyuk_harf',
          sol: port_ifadesini_coz(dugum, 'metin')
        };

      case 'dizi_eleman_getir':
        return {
          tur: 'ikili_islem',
          operator: '[]',
          sol: port_ifadesini_coz(dugum, 'dizi'),
          sag: port_ifadesini_coz(dugum, 'indeks')
        };

      case 'dizi_uzunluk':
        return {
          tur: 'dize_islem',
          operator: 'uzunluk',
          sol: port_ifadesini_coz(dugum, 'dizi')
        };

      case 'fonksiyon_cagrisi':
        return {
          tur: 'fonksiyon_cagrisi',
          deger: dugum.ozellikler?.fonksiyon_adi || 'ozel_fonksiyon',
          argumanlar: [
            port_ifadesini_coz(dugum, 'arguman_1'),
            port_ifadesini_coz(dugum, 'arguman_2')
          ]
        };

      default:
        return { tur: 'sabit', deger: `/* ${dugum.baslik} */` };
    }
  }

  // Akış zincirini gez (Control Flow Traversal)
  const islenmis_dugumler = new Set<string>();

  function akis_zincirini_isle(baslangic_port_id: string): ara_komut[] {
    const komutlar: ara_komut[] = [];
    const baglanti = kaynak_baglantilar.get(baslangic_port_id)?.[0];
    if (!baglanti) return komutlar;

    let su_anki_dugum = dugum_haritasi.get(baglanti.hedef_dugum_id);

    while (su_anki_dugum) {
      if (islenmis_dugumler.has(su_anki_dugum.id)) {
        // Döngü koruması
        break;
      }
      islenmis_dugumler.add(su_anki_dugum.id);

      switch (su_anki_dugum.tip_kodu) {
        case 'sistem_konsol_yazdir': {
          const mesaj_ifadesi = port_ifadesini_coz(su_anki_dugum, 'mesaj');
          komutlar.push({
            id: 'komut_' + su_anki_dugum.id,
            tur: 'konsol_yaz',
            dugum_id: su_anki_dugum.id,
            mesaj: mesaj_ifadesi
          });
          const cikis_port = su_anki_dugum.ciktilar.find(p => p.ad === 'cikis_akis' || p.tip === 'akis');
          const sonraki_baglanti = cikis_port ? kaynak_baglantilar.get(cikis_port.id)?.[0] : undefined;
          su_anki_dugum = sonraki_baglanti ? dugum_haritasi.get(sonraki_baglanti.hedef_dugum_id) : undefined;
          break;
        }

        case 'sistem_konsol_uyari': {
          const mesaj_ifadesi = port_ifadesini_coz(su_anki_dugum, 'mesaj');
          komutlar.push({
            id: 'komut_' + su_anki_dugum.id,
            tur: 'konsol_uyari',
            dugum_id: su_anki_dugum.id,
            mesaj: mesaj_ifadesi
          });
          const cikis_port = su_anki_dugum.ciktilar.find(p => p.ad === 'cikis_akis' || p.tip === 'akis');
          const sonraki_baglanti = cikis_port ? kaynak_baglantilar.get(cikis_port.id)?.[0] : undefined;
          su_anki_dugum = sonraki_baglanti ? dugum_haritasi.get(sonraki_baglanti.hedef_dugum_id) : undefined;
          break;
        }

        case 'akis_kosul': {
          const kosul_ifadesi = port_ifadesini_coz(su_anki_dugum, 'kosul');
          const dogru_port = su_anki_dugum.ciktilar.find(p => p.ad === 'dogru_akis');
          const yanlis_port = su_anki_dugum.ciktilar.find(p => p.ad === 'yanlis_akis');

          const dogru_govde = dogru_port ? akis_zincirini_isle(dogru_port.id) : [];
          const yanlis_govde = yanlis_port ? akis_zincirini_isle(yanlis_port.id) : [];

          komutlar.push({
            id: 'komut_' + su_anki_dugum.id,
            tur: 'kosul_blogu',
            dugum_id: su_anki_dugum.id,
            kosul: kosul_ifadesi,
            dogru_govde,
            yanlis_govde
          });
          su_anki_dugum = undefined;
          break;
        }

        case 'akis_sayac_dongusu': {
          const baslangic = port_ifadesini_coz(su_anki_dugum, 'baslangic');
          const bitis = port_ifadesini_coz(su_anki_dugum, 'bitis');
          const artis = port_ifadesini_coz(su_anki_dugum, 'artis');

          const govde_port = su_anki_dugum.ciktilar.find(p => p.ad === 'dongu_govdesi');
          const tamamlandi_port = su_anki_dugum.ciktilar.find(p => p.ad === 'tamamlandi');

          const dongu_govdesi = govde_port ? akis_zincirini_isle(govde_port.id) : [];
          const dongu_tamamlandi = tamamlandi_port ? akis_zincirini_isle(tamamlandi_port.id) : [];

          komutlar.push({
            id: 'komut_' + su_anki_dugum.id,
            tur: 'dongu_for',
            dugum_id: su_anki_dugum.id,
            sayac_adi: 'i',
            baslangic,
            bitis,
            artis,
            dongu_govdesi,
            dongu_tamamlandi_govdesi: dongu_tamamlandi
          });
          su_anki_dugum = undefined;
          break;
        }

        case 'akis_kosullu_dongu': {
          const kosul = port_ifadesini_coz(su_anki_dugum, 'kosul');
          const govde_port = su_anki_dugum.ciktilar.find(p => p.ad === 'dongu_govdesi');
          const tamamlandi_port = su_anki_dugum.ciktilar.find(p => p.ad === 'tamamlandi');

          const dongu_govdesi = govde_port ? akis_zincirini_isle(govde_port.id) : [];
          const dongu_tamamlandi = tamamlandi_port ? akis_zincirini_isle(tamamlandi_port.id) : [];

          komutlar.push({
            id: 'komut_' + su_anki_dugum.id,
            tur: 'dongu_while',
            dugum_id: su_anki_dugum.id,
            kosul,
            dongu_govdesi,
            dongu_tamamlandi_govdesi: dongu_tamamlandi
          });
          su_anki_dugum = undefined;
          break;
        }

        case 'akis_sirali': {
          // Sıralı adımları sırayla işlet
          const adim_1 = su_anki_dugum.ciktilar.find(p => p.ad === 'adim_1');
          const adim_2 = su_anki_dugum.ciktilar.find(p => p.ad === 'adim_2');
          const adim_3 = su_anki_dugum.ciktilar.find(p => p.ad === 'adim_3');

          if (adim_1) komutlar.push(...akis_zincirini_isle(adim_1.id));
          if (adim_2) komutlar.push(...akis_zincirini_isle(adim_2.id));
          if (adim_3) komutlar.push(...akis_zincirini_isle(adim_3.id));

          su_anki_dugum = undefined;
          break;
        }

        case 'degisken_ata': {
          const var_adi = su_anki_dugum.ozellikler?.degisken_adi || 'degisken';
          const yeni_deger = port_ifadesini_coz(su_anki_dugum, 'yeni_deger');

          komutlar.push({
            id: 'komut_' + su_anki_dugum.id,
            tur: 'degisken_ata',
            dugum_id: su_anki_dugum.id,
            degisken_adi: var_adi,
            ifade: yeni_deger
          });

          const cikis_port = su_anki_dugum.ciktilar.find(p => p.ad === 'cikis_akis' || p.tip === 'akis');
          const sonraki_baglanti = cikis_port ? kaynak_baglantilar.get(cikis_port.id)?.[0] : undefined;
          su_anki_dugum = sonraki_baglanti ? dugum_haritasi.get(sonraki_baglanti.hedef_dugum_id) : undefined;
          break;
        }

        case 'degisken_degistir': {
          const var_adi = su_anki_dugum.ozellikler?.degisken_adi || 'degisken';
          const miktar = port_ifadesini_coz(su_anki_dugum, 'miktar');

          komutlar.push({
            id: 'komut_' + su_anki_dugum.id,
            tur: 'degisken_artir',
            dugum_id: su_anki_dugum.id,
            degisken_adi: var_adi,
            ifade: miktar
          });

          const cikis_port = su_anki_dugum.ciktilar.find(p => p.ad === 'cikis_akis' || p.tip === 'akis');
          const sonraki_baglanti = cikis_port ? kaynak_baglantilar.get(cikis_port.id)?.[0] : undefined;
          su_anki_dugum = sonraki_baglanti ? dugum_haritasi.get(sonraki_baglanti.hedef_dugum_id) : undefined;
          break;
        }

        case 'akis_gecikme': {
          const sure = Number(su_anki_dugum.girdiler.find(p => p.ad === 'sure_ms')?.varsayilan_deger || 1000);
          komutlar.push({
            id: 'komut_' + su_anki_dugum.id,
            tur: 'gecikme',
            dugum_id: su_anki_dugum.id,
            sure_ms: sure
          });
          const cikis_port = su_anki_dugum.ciktilar.find(p => p.ad === 'tamamlandi' || p.tip === 'akis');
          const sonraki_baglanti = cikis_port ? kaynak_baglantilar.get(cikis_port.id)?.[0] : undefined;
          su_anki_dugum = sonraki_baglanti ? dugum_haritasi.get(sonraki_baglanti.hedef_dugum_id) : undefined;
          break;
        }

        case 'fonksiyon_cagrisi': {
          const fn_adi = su_anki_dugum.ozellikler?.fonksiyon_adi || 'ozel_fonksiyon';
          komutlar.push({
            id: 'komut_' + su_anki_dugum.id,
            tur: 'fonksiyon_cagir',
            dugum_id: su_anki_dugum.id,
            fonksiyon_adi: fn_adi
          });
          const cikis_port = su_anki_dugum.ciktilar.find(p => p.ad === 'cikis_akis' || p.tip === 'akis');
          const sonraki_baglanti = cikis_port ? kaynak_baglantilar.get(cikis_port.id)?.[0] : undefined;
          su_anki_dugum = sonraki_baglanti ? dugum_haritasi.get(sonraki_baglanti.hedef_dugum_id) : undefined;
          break;
        }

        case 'fonksiyon_donusu': {
          const donus_degeri = port_ifadesini_coz(su_anki_dugum, 'deger');
          komutlar.push({
            id: 'komut_' + su_anki_dugum.id,
            tur: 'fonksiyon_donusu',
            dugum_id: su_anki_dugum.id,
            ifade: donus_degeri
          });
          su_anki_dugum = undefined;
          break;
        }

        default: {
          const cikis_port = su_anki_dugum.ciktilar.find(p => p.tip === 'akis');
          const sonraki_baglanti = cikis_port ? kaynak_baglantilar.get(cikis_port.id)?.[0] : undefined;
          su_anki_dugum = sonraki_baglanti ? dugum_haritasi.get(sonraki_baglanti.hedef_dugum_id) : undefined;
          break;
        }
      }
    }

    return komutlar;
  }

  // 1. Ana başlangıç noktalarından komutları derle
  const baslangic_dugumleri = proje.dugumler.filter(d => d.tip_kodu === 'akis_baslangic' || d.tip_kodu === 'olay_baslangic');
  let ana_akis_komutlari: ara_komut[] = [];

  if (baslangic_dugumleri.length > 0) {
    baslangic_dugumleri.forEach(baslangic_dugumu => {
      const baslangic_cikis = baslangic_dugumu.ciktilar.find(p => p.tip === 'akis');
      if (baslangic_cikis) {
        ana_akis_komutlari.push(...akis_zincirini_isle(baslangic_cikis.id));
      }
    });
  }

  // 2. Eğer başlangıç düğümü yoksa ya da akışa bağlanmamış bağımsız eylem/kontrol düğümleri varsa onları da ana akışa ekle
  proje.dugumler.forEach(d => {
    if (!islenmis_dugumler.has(d.id)) {
      if (d.tip_kodu === 'sistem_konsol_yazdir') {
        ana_akis_komutlari.push({
          id: 'komut_' + d.id,
          tur: 'konsol_yaz',
          dugum_id: d.id,
          mesaj: port_ifadesini_coz(d, 'mesaj')
        });
        islenmis_dugumler.add(d.id);
      } else if (d.tip_kodu === 'degisken_ata') {
        ana_akis_komutlari.push({
          id: 'komut_' + d.id,
          tur: 'degisken_ata',
          dugum_id: d.id,
          degisken_adi: d.ozellikler?.degisken_adi || 'degisken',
          ifade: port_ifadesini_coz(d, 'yeni_deger')
        });
        islenmis_dugumler.add(d.id);
      } else if (d.tip_kodu === 'degisken_degistir') {
        ana_akis_komutlari.push({
          id: 'komut_' + d.id,
          tur: 'degisken_artir',
          dugum_id: d.id,
          degisken_adi: d.ozellikler?.degisken_adi || 'degisken',
          ifade: port_ifadesini_coz(d, 'miktar')
        });
        islenmis_dugumler.add(d.id);
      } else if (d.tip_kodu === 'akis_sayac_dongusu') {
        const baslangic = port_ifadesini_coz(d, 'baslangic');
        const bitis = port_ifadesini_coz(d, 'bitis');
        const artis = port_ifadesini_coz(d, 'artis');
        const govde_port = d.ciktilar.find(p => p.ad === 'dongu_govdesi');
        const tamamlandi_port = d.ciktilar.find(p => p.ad === 'tamamlandi');

        const dongu_govdesi = govde_port ? akis_zincirini_isle(govde_port.id) : [];
        const dongu_tamamlandi = tamamlandi_port ? akis_zincirini_isle(tamamlandi_port.id) : [];

        ana_akis_komutlari.push({
          id: 'komut_' + d.id,
          tur: 'dongu_for',
          dugum_id: d.id,
          sayac_adi: 'i',
          baslangic,
          bitis,
          artis,
          dongu_govdesi,
          dongu_tamamlandi_govdesi: dongu_tamamlandi
        });
        islenmis_dugumler.add(d.id);
      } else if (d.tip_kodu === 'akis_kosullu_dongu') {
        const kosul = port_ifadesini_coz(d, 'kosul');
        const govde_port = d.ciktilar.find(p => p.ad === 'dongu_govdesi');
        const tamamlandi_port = d.ciktilar.find(p => p.ad === 'tamamlandi');

        const dongu_govdesi = govde_port ? akis_zincirini_isle(govde_port.id) : [];
        const dongu_tamamlandi = tamamlandi_port ? akis_zincirini_isle(tamamlandi_port.id) : [];

        ana_akis_komutlari.push({
          id: 'komut_' + d.id,
          tur: 'dongu_while',
          dugum_id: d.id,
          kosul,
          dongu_govdesi,
          dongu_tamamlandi_govdesi: dongu_tamamlandi
        });
        islenmis_dugumler.add(d.id);
      } else if (d.tip_kodu === 'akis_kosul') {
        const kosul_ifadesi = port_ifadesini_coz(d, 'kosul');
        const dogru_port = d.ciktilar.find(p => p.ad === 'dogru_akis');
        const yanlis_port = d.ciktilar.find(p => p.ad === 'yanlis_akis');

        const dogru_govde = dogru_port ? akis_zincirini_isle(dogru_port.id) : [];
        const yanlis_govde = yanlis_port ? akis_zincirini_isle(yanlis_port.id) : [];

        ana_akis_komutlari.push({
          id: 'komut_' + d.id,
          tur: 'kosul_blogu',
          dugum_id: d.id,
          kosul: kosul_ifadesi,
          dogru_govde,
          yanlis_govde
        });
        islenmis_dugumler.add(d.id);
      }
    }
  });

  // 3. Fonksiyon bildirimleri
  const fonksiyon_giris_dugumleri = proje.dugumler.filter(d => d.tip_kodu === 'fonksiyon_girisi');
  const fonksiyon_bildirimleri: ara_komut[] = [];

  fonksiyon_giris_dugumleri.forEach(fn_dugumu => {
    const fn_adi = fn_dugumu.ozellikler?.fonksiyon_adi || 'fonksiyon_' + fn_dugumu.id.substring(0, 4);
    const cikis_port = fn_dugumu.ciktilar.find(p => p.ad === 'cikis_akis' || p.tip === 'akis');
    const fn_govdesi = cikis_port ? akis_zincirini_isle(cikis_port.id) : [];

    fonksiyon_bildirimleri.push({
      id: 'fn_' + fn_dugumu.id,
      tur: 'fonksiyon_tanimla',
      dugum_id: fn_dugumu.id,
      fonksiyon_adi: fn_adi,
      parametreler: [
        { ad: 'parametre_1', tip: 'any' },
        { ad: 'parametre_2', tip: 'any' }
      ],
      donus_tipi: 'any',
      fonksiyon_govdesi: fn_govdesi
    });
  });

  return {
    proje_adi: proje.ayarlar.proje_adi,
    hedef_dil: proje.ayarlar.hedef_dil,
    degisken_bildirimleri: proje.degiskenler.map(d => ({
      ad: d.ad,
      tip: d.tip,
      ilk_deger: d.varsayilan_deger,
      aciklama: d.aciklama
    })),
    ana_akis_komutlari,
    fonksiyon_bildirimleri
  };
}
