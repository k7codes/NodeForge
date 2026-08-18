/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Grafik ve Dugum Tip Tanimlari
 */

export type port_yonu = 'girdi' | 'cikti';

export type veri_tipi = 
  | 'akis' 
  | 'metin' 
  | 'sayi' 
  | 'mantiksal' 
  | 'dizi' 
  | 'nesne' 
  | 'herhangi';

export type dugum_kategorisi = 
  | 'akis' 
  | 'degiskenler' 
  | 'mantik' 
  | 'matematik' 
  | 'metin' 
  | 'fonksiyonlar' 
  | 'olaylar' 
  | 'sistem';

export type dil_secenegi = 
  | 'typescript' 
  | 'javascript' 
  | 'python' 
  | 'csharp' 
  | 'cpp' 
  | 'go' 
  | 'rust';

export interface dil_detayi {
  id: dil_secenegi;
  kod?: dil_secenegi;
  ad: string;
  surum: string;
  uzanti: string;
  ikon: string;
  renk: string;
  aciklama: string;
  kullanim_alani: string;
  calisma_zamani: string;
  ozellikler: string[];
}

export interface port_tanimi {
  id: string;
  ad: string;
  etiket: string;
  yon: port_yonu;
  tip: veri_tipi;
  varsayilan_deger?: string | number | boolean;
  coklu_baglanti?: boolean;
  aciklama?: string;
  zorunlu?: boolean;
}

export interface dugum_tanimi {
  id: string;
  tip_kodu: string;
  baslik: string;
  kategori: dugum_kategorisi;
  alt_baslik?: string;
  renk: string;
  ikon_adi: string;
  konum_x: number;
  konum_y: number;
  genislik?: number;
  yukseklik?: number;
  girdiler: port_tanimi[];
  ciktilar: port_tanimi[];
  ozellikler: Record<string, any>;
  secili?: boolean;
  daraltilmis?: boolean;
  hata_mesaji?: string;
}

export interface baglanti_tanimi {
  id: string;
  kaynak_dugum_id: string;
  kaynak_port_id: string;
  hedef_dugum_id: string;
  hedef_port_id: string;
  tip: veri_tipi;
}

export interface degisken_tanimi {
  id: string;
  ad: string;
  tip: veri_tipi;
  varsayilan_deger: any;
  aciklama?: string;
}

export interface fonksiyon_parametresi {
  id: string;
  ad: string;
  tip: veri_tipi;
}

export interface fonksiyon_tanimi {
  id: string;
  ad: string;
  aciklama?: string;
  parametreler: fonksiyon_parametresi[];
  donus_tipi: veri_tipi;
  giris_dugum_id?: string;
}

export interface dosya_tanimi {
  id: string;
  yol: string;
  ad: string;
  icerik: string;
  tur: 'grafik' | 'kod' | 'yapilandirma' | 'veri' | 'diger';
  grafik_verisi?: {
    dugumler: dugum_tanimi[];
    baglantilar: baglanti_tanimi[];
    degiskenler?: degisken_tanimi[];
    fonksiyonlar?: fonksiyon_tanimi[];
    gorunum?: {
      kaydirma_x: number;
      kaydirma_y: number;
      olcek: number;
      izgara_goster: boolean;
      hizalama_aktif: boolean;
    };
  };
  salt_okunur?: boolean;
}

export interface proje_ayarlari {
  proje_adi: string;
  surum: string;
  yazar: string;
  hedef_dil: dil_secenegi;
  giris_noktasi: string;
  aciklama: string;
  olusturma_tarihi: string;
  guncelleme_tarihi: string;
}

export interface proje_yapisi {
  id: string;
  ayarlar: proje_ayarlari;
  dugumler: dugum_tanimi[];
  baglantilar: baglanti_tanimi[];
  degiskenler: degisken_tanimi[];
  fonksiyonlar: fonksiyon_tanimi[];
  dosyalar: dosya_tanimi[];
  gorunum: {
    kaydirma_x: number;
    kaydirma_y: number;
    olcek: number;
    izgara_goster: boolean;
    hizalama_aktif: boolean;
  };
}

export interface hata_kaydi {
  id: string;
  tur: 'hata' | 'uyari' | 'bilgi';
  mesaj: string;
  dugum_id?: string;
  port_id?: string;
  kod_satiri?: number;
  zaman: string;
}

export interface konsol_kaydi {
  id: string;
  seviye: 'bilgi' | 'gunluk' | 'uyari' | 'hata' | 'basari';
  metin: string;
  kaynak?: string;
  zaman: string;
  detay?: any;
}

export interface derleme_sonucu {
  basarili: boolean;
  uretim_suresi_ms: number;
  ana_kod: string;
  kod: string;
  dosyalar: Record<string, string>;
  hatalar: hata_kaydi[];
  uyarilar: hata_kaydi[];
  ara_temsil?: any;
  dogrulama?: {
    gecerli_mi?: boolean;
    gecerli?: boolean;
    hatalar: hata_kaydi[];
    uyarilar: hata_kaydi[];
    bilgiler?: hata_kaydi[];
  };
  istatistikler: {
    toplam_dugum: number;
    toplam_baglanti: number;
    toplam_degisken: number;
    toplam_fonksiyon: number;
    kod_satir_sayisi: number;
  };
}

export interface calistirma_sonucu {
  basarili: boolean;
  cikis_kodu: number;
  calisma_suresi_ms: number;
  ciktilar: konsol_kaydi[];
  hata_mesaji?: string;
}

export interface sablon_proje {
  id: string;
  ad: string;
  aciklama: string;
  kategori: string;
  hedef_dil: dil_secenegi;
  veri: proje_yapisi;
}
