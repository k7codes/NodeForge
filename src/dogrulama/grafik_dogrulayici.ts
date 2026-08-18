/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~ 
 * Grafik Dogrulama Motoru (Validation Engine)
 */

import { proje_yapisi, hata_kaydi, dugum_tanimi, baglanti_tanimi } from '../tipler/grafik_tipleri';

export function grafigi_dogrula(proje: proje_yapisi): {
  gecerli_mi: boolean;
  hatalar: hata_kaydi[];
  uyarilar: hata_kaydi[];
  bilgiler: hata_kaydi[];
} {
  const hatalar: hata_kaydi[] = [];
  const uyarilar: hata_kaydi[] = [];
  const bilgiler: hata_kaydi[] = [];

  const dugumler = proje.dugumler || [];
  const baglantilar = proje.baglantilar || [];
  const degiskenler = proje.degiskenler || [];

  const dugum_haritasi = new Map<string, dugum_tanimi>();
  dugumler.forEach(d => dugum_haritasi.set(d.id, d));

  const degisken_isimleri = new Set(degiskenler.map(d => d.ad));

  // 1. Başlangıç Düğümü Kontrolü
  const baslangic_dugumu = dugumler.find(d => d.tip_kodu === 'akis_baslangic' || d.tip_kodu === 'olay_baslangic');
  if (!baslangic_dugumu && dugumler.length > 0) {
    uyarilar.push({
      id: 'uyari_baslangic_yok',
      tur: 'uyari',
      mesaj: 'Grafikte bir Başlangıç (Start) düğümü bulunmuyor. Program giriş noktası belirsiz.',
      zaman: new Date().toLocaleTimeString()
    });
  } else if (baslangic_dugumu) {
    bilgiler.push({
      id: 'bilgi_baslangic_var',
      tur: 'bilgi',
      mesaj: `Giriş noktası bulundu: ${baslangic_dugumu.baslik}`,
      dugum_id: baslangic_dugumu.id,
      zaman: new Date().toLocaleTimeString()
    });
  }

  // 2. Bağlantı Port Tutarlılığı Kontrolleri
  baglantilar.forEach((baglanti, idx) => {
    const kaynak_dugum = dugum_haritasi.get(baglanti.kaynak_dugum_id);
    const hedef_dugum = dugum_haritasi.get(baglanti.hedef_dugum_id);

    if (!kaynak_dugum) {
      hatalar.push({
        id: `hata_bag_${idx}_kaynak_yok`,
        tur: 'hata',
        mesaj: `Bağlantı geçersiz: Kaynak düğüm (${baglanti.kaynak_dugum_id}) bulunamadı.`,
        zaman: new Date().toLocaleTimeString()
      });
      return;
    }

    if (!hedef_dugum) {
      hatalar.push({
        id: `hata_bag_${idx}_hedef_yok`,
        tur: 'hata',
        mesaj: `Bağlantı geçersiz: Hedef düğüm (${baglanti.hedef_dugum_id}) bulunamadı.`,
        zaman: new Date().toLocaleTimeString()
      });
      return;
    }

    const kaynak_port = (kaynak_dugum.ciktilar || []).find(p => p.id === baglanti.kaynak_port_id);
    const hedef_port = (hedef_dugum.girdiler || []).find(p => p.id === baglanti.hedef_port_id);

    if (!kaynak_port || !hedef_port) {
      hatalar.push({
        id: `hata_bag_${idx}_port_yok`,
        tur: 'hata',
        mesaj: `Bağlantı portu eksik veya silinmiş. (${kaynak_dugum.baslik} -> ${hedef_dugum.baslik})`,
        dugum_id: kaynak_dugum.id,
        zaman: new Date().toLocaleTimeString()
      });
      return;
    }

    // Akış ve Veri portlarının karışmasını engelle
    if (kaynak_port.tip === 'akis' && hedef_port.tip !== 'akis') {
      hatalar.push({
        id: `hata_tip_uyumsuz_${idx}`,
        tur: 'hata',
        mesaj: `Uyumsuz bağlantı: Akış çıkışı veri girişine (${hedef_port.etiket}) bağlanamaz!`,
        dugum_id: hedef_dugum.id,
        port_id: hedef_port.id,
        zaman: new Date().toLocaleTimeString()
      });
    } else if (kaynak_port.tip !== 'akis' && hedef_port.tip === 'akis') {
      hatalar.push({
        id: `hata_tip_uyumsuz_${idx}`,
        tur: 'hata',
        mesaj: `Uyumsuz bağlantı: Veri çıkışı akış girişine (${hedef_port.etiket}) bağlanamaz!`,
        dugum_id: hedef_dugum.id,
        port_id: hedef_port.id,
        zaman: new Date().toLocaleTimeString()
      });
    }
  });

  // 3. Her Düğüm İçin Özel Kontroller
  proje.dugumler.forEach(dugum => {
    // A. Değişken düğümleri kontrolü
    if (dugum.tip_kodu === 'degisken_getir' || dugum.tip_kodu === 'degisken_ata' || dugum.tip_kodu === 'degisken_degistir') {
      const var_ad = dugum.ozellikler?.degisken_adi;
      if (!var_ad) {
        hatalar.push({
          id: `hata_deg_adsiz_${dugum.id}`,
          tur: 'hata',
          mesaj: `"${dugum.baslik}" düğümünde hedef değişken adı seçilmemiş!`,
          dugum_id: dugum.id,
          zaman: new Date().toLocaleTimeString()
        });
      } else if (!degisken_isimleri.has(var_ad)) {
        uyarilar.push({
          id: `uyari_deg_tanimsiz_${dugum.id}`,
          tur: 'uyari',
          mesaj: `"${var_ad}" değişkeni proje değişkenleri arasında henüz tanımlanmamış.`,
          dugum_id: dugum.id,
          zaman: new Date().toLocaleTimeString()
        });
      }
    }

    // B. Zorunlu giriş portlarının kontrolü
    dugum.girdiler.forEach(girdi_port => {
      if (girdi_port.zorunlu) {
        const bagli_mi = proje.baglantilar.some(b => b.hedef_port_id === girdi_port.id);
        const varsayilan_var_mi = girdi_port.varsayilan_deger !== undefined && girdi_port.varsayilan_deger !== '';
        
        if (!bagli_mi && !varsayilan_var_mi) {
          uyarilar.push({
            id: `uyari_zorunlu_port_${girdi_port.id}`,
            tur: 'uyari',
            mesaj: `"${dugum.baslik}" düğümünün zorunlu "${girdi_port.etiket}" girişi boş bırakılmış.`,
            dugum_id: dugum.id,
            port_id: girdi_port.id,
            zaman: new Date().toLocaleTimeString()
          });
        }
      }
    });

    // C. Boşta kalan akış düğümleri uyarısı
    if (dugum.tip_kodu.startsWith('akis_') && dugum.tip_kodu !== 'akis_baslangic' && dugum.tip_kodu !== 'olay_baslangic') {
      const giris_akis_portu = dugum.girdiler.find(p => p.tip === 'akis');
      if (giris_akis_portu) {
        const akis_geliyor_mu = proje.baglantilar.some(b => b.hedef_port_id === giris_akis_portu.id);
        if (!akis_geliyor_mu) {
          uyarilar.push({
            id: `uyari_akis_kesik_${dugum.id}`,
            tur: 'uyari',
            mesaj: `"${dugum.baslik}" düğümüne herhangi bir yürütme akışı bağlanmamış (Ölü kod).`,
            dugum_id: dugum.id,
            zaman: new Date().toLocaleTimeString()
          });
        }
      }
    }
  });

  const gecerli_mi = hatalar.length === 0;

  return {
    gecerli_mi,
    hatalar,
    uyarilar,
    bilgiler
  };
}
