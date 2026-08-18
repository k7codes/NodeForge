/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~ 
 * Dugum Sablonlari ve Katalog Tanimlari
 */

import { dugum_kategorisi, dugum_tanimi, veri_tipi } from '../tipler/grafik_tipleri';

export interface dugum_sablonu {
  tip_kodu: string;
  baslik: string;
  alt_baslik?: string;
  kategori: dugum_kategorisi;
  renk: string;
  ikon_adi: string;
  aciklama: string;
  varsayilan_ozellikler?: Record<string, any>;
  girdiler: {
    ad: string;
    etiket: string;
    tip: veri_tipi;
    varsayilan_deger?: string | number | boolean;
    aciklama?: string;
    zorunlu?: boolean;
  }[];
  ciktilar: {
    ad: string;
    etiket: string;
    tip: veri_tipi;
    aciklama?: string;
  }[];
}

export const dugum_katalogu: dugum_sablonu[] = [
  // ==================== AKIS (FLOW) ====================
  {
    tip_kodu: 'akis_baslangic',
    baslik: 'Başlangıç',
    alt_baslik: 'Program Girişi',
    kategori: 'akis',
    renk: '#10b981', // Yeşil
    ikon_adi: 'Play',
    aciklama: 'Programın veya ana bloğun çalışma başlangıç noktası.',
    girdiler: [],
    ciktilar: [
      { ad: 'cikis_akis', etiket: 'Akış', tip: 'akis', aciklama: 'Başlangıçtan sonraki işlem' }
    ]
  },
  {
    tip_kodu: 'akis_bitis',
    baslik: 'Bitiş',
    alt_baslik: 'Programı Sonlandır',
    kategori: 'akis',
    renk: '#ef4444', // Kırmızı
    ikon_adi: 'Square',
    aciklama: 'Akışı güvenli şekilde sonlandırır.',
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' },
      { ad: 'cikis_kodu', etiket: 'Çıkış Kodu', tip: 'sayi', varsayilan_deger: 0 }
    ],
    ciktilar: []
  },
  {
    tip_kodu: 'akis_kosul',
    baslik: 'Branch (Koşul)',
    alt_baslik: 'If / Else Kararı',
    kategori: 'akis',
    renk: '#8b5cf6', // Mor
    ikon_adi: 'GitBranch',
    aciklama: 'Belirtilen mantıksal koşula göre Doğru veya Yanlış yolunu çalıştırır.',
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' },
      { ad: 'kosul', etiket: 'Koşul', tip: 'mantiksal', varsayilan_deger: true, zorunlu: true }
    ],
    ciktilar: [
      { ad: 'dogru_akis', etiket: 'Doğru (True)', tip: 'akis' },
      { ad: 'yanlis_akis', etiket: 'Yanlış (False)', tip: 'akis' }
    ]
  },
  {
    tip_kodu: 'akis_sirali',
    baslik: 'Sequence (Sıralı)',
    alt_baslik: 'Ardışık Adımlar',
    kategori: 'akis',
    renk: '#3b82f6', // Mavi
    ikon_adi: 'ListOrdered',
    aciklama: 'Birden fazla işlemi sırasıyla arka arkaya yürütür.',
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' }
    ],
    ciktilar: [
      { ad: 'adim_1', etiket: 'Adım 1', tip: 'akis' },
      { ad: 'adim_2', etiket: 'Adım 2', tip: 'akis' },
      { ad: 'adim_3', etiket: 'Adım 3', tip: 'akis' }
    ]
  },
  {
    tip_kodu: 'akis_sayac_dongusu',
    baslik: 'For Döngüsü',
    alt_baslik: 'Sayıcı Döngü',
    kategori: 'akis',
    renk: '#f59e0b', // Turuncu
    ikon_adi: 'Repeat',
    aciklama: 'Belirlenen başlangıç ve bitiş değerleri arasında tekrarlı işlem yapar.',
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' },
      { ad: 'baslangic', etiket: 'Başlangıç', tip: 'sayi', varsayilan_deger: 0 },
      { ad: 'bitis', etiket: 'Bitiş', tip: 'sayi', varsayilan_deger: 5 },
      { ad: 'artis', etiket: 'Artış', tip: 'sayi', varsayilan_deger: 1 }
    ],
    ciktilar: [
      { ad: 'dongu_govdesi', etiket: 'Döngü Gövdesi', tip: 'akis' },
      { ad: 'indeks', etiket: 'Mevcut İndeks (i)', tip: 'sayi' },
      { ad: 'tamamlandi', etiket: 'Tamamlandı', tip: 'akis' }
    ]
  },
  {
    tip_kodu: 'akis_kosullu_dongu',
    baslik: 'While Döngüsü',
    alt_baslik: 'Şarta Bağlı Tekrar',
    kategori: 'akis',
    renk: '#f59e0b',
    ikon_adi: 'RefreshCw',
    aciklama: 'Koşul doğru olduğu sürece gövdeyi tekrar tekrar çalıştırır.',
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' },
      { ad: 'kosul', etiket: 'Koşul', tip: 'mantiksal', varsayilan_deger: true }
    ],
    ciktilar: [
      { ad: 'dongu_govdesi', etiket: 'Döngü Gövdesi', tip: 'akis' },
      { ad: 'tamamlandi', etiket: 'Tamamlandı', tip: 'akis' }
    ]
  },
  {
    tip_kodu: 'akis_gecikme',
    baslik: 'Delay (Gecikme)',
    alt_baslik: 'Zaman Aşımı Beklet',
    kategori: 'akis',
    renk: '#0ea5e9',
    ikon_adi: 'Clock',
    aciklama: 'Belirtilen milisaniye kadar akışı asenkron bekletir.',
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' },
      { ad: 'sure_ms', etiket: 'Süre (ms)', tip: 'sayi', varsayilan_deger: 1000 }
    ],
    ciktilar: [
      { ad: 'tamamlandi', etiket: 'Süre Doldu', tip: 'akis' }
    ]
  },

  // ==================== DEGISKENLER (VARIABLES) ====================
  {
    tip_kodu: 'degisken_tanimla',
    baslik: 'Değişken Oluştur',
    alt_baslik: 'Yeni Değişken Tanımı',
    kategori: 'degiskenler',
    renk: '#06b6d4',
    ikon_adi: 'Variable',
    aciklama: 'Projede yeni bir değişken tanımlar ve ilk değer atar.',
    varsayilan_ozellikler: { degisken_adi: 'sayac', degisken_tipi: 'sayi' },
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' },
      { ad: 'deger', etiket: 'İlk Değer', tip: 'herhangi', varsayilan_deger: 0 }
    ],
    ciktilar: [
      { ad: 'cikis_akis', etiket: 'Akış', tip: 'akis' },
      { ad: 'cikti_deger', etiket: 'Değer', tip: 'herhangi' }
    ]
  },
  {
    tip_kodu: 'degisken_getir',
    baslik: 'Değişken Al (Get)',
    alt_baslik: 'Değeri Oku',
    kategori: 'degiskenler',
    renk: '#06b6d4',
    ikon_adi: 'ArrowUpRight',
    aciklama: 'Mevcut bir değişkenin güncel değerini okur.',
    varsayilan_ozellikler: { degisken_adi: 'puan' },
    girdiler: [],
    ciktilar: [
      { ad: 'deger', etiket: 'Değer', tip: 'herhangi' }
    ]
  },
  {
    tip_kodu: 'degisken_ata',
    baslik: 'Değişken Ata (Set)',
    alt_baslik: 'Değeri Güncelle',
    kategori: 'degiskenler',
    renk: '#06b6d4',
    ikon_adi: 'CornerDownRight',
    aciklama: 'Mevcut bir değişkene yeni bir değer atar.',
    varsayilan_ozellikler: { degisken_adi: 'puan' },
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' },
      { ad: 'yeni_deger', etiket: 'Yeni Değer', tip: 'herhangi', varsayilan_deger: 100 }
    ],
    ciktilar: [
      { ad: 'cikis_akis', etiket: 'Akış', tip: 'akis' },
      { ad: 'guncel_deger', etiket: 'Güncel Değer', tip: 'herhangi' }
    ]
  },
  {
    tip_kodu: 'degisken_degistir',
    baslik: 'Sayı Değiştir (+/-)',
    alt_baslik: 'Artır veya Azalt',
    kategori: 'degiskenler',
    renk: '#06b6d4',
    ikon_adi: 'PlusMinus',
    aciklama: 'Sayısal bir değişkenin değerini belirlenen miktar kadar artırır/azaltır.',
    varsayilan_ozellikler: { degisken_adi: 'puan', islem: 'artir' },
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' },
      { ad: 'miktar', etiket: 'Miktar', tip: 'sayi', varsayilan_deger: 1 }
    ],
    ciktilar: [
      { ad: 'cikis_akis', etiket: 'Akış', tip: 'akis' },
      { ad: 'sonuc', etiket: 'Sonuç', tip: 'sayi' }
    ]
  },

  // ==================== MANTIK (LOGIC) ====================
  {
    tip_kodu: 'mantik_karsilastir',
    baslik: 'Karşılaştır (Compare)',
    alt_baslik: '==, !=, >, <, >=, <=',
    kategori: 'mantik',
    renk: '#e11d48',
    ikon_adi: 'Scale',
    aciklama: 'İki değeri seçilen operatöre göre karşılaştırır.',
    varsayilan_ozellikler: { operator: '>' },
    girdiler: [
      { ad: 'a', etiket: 'A Değeri', tip: 'herhangi', varsayilan_deger: 0 },
      { ad: 'b', etiket: 'B Değeri', tip: 'herhangi', varsayilan_deger: 0 }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'Sonuç', tip: 'mantiksal' }
    ]
  },
  {
    tip_kodu: 'mantik_ve',
    baslik: 'VE (AND)',
    alt_baslik: 'İkisi de Doğru mu?',
    kategori: 'mantik',
    renk: '#e11d48',
    ikon_adi: 'Binary',
    aciklama: 'Girişlerin her ikisi de doğruysa True döndürür.',
    girdiler: [
      { ad: 'a', etiket: 'A', tip: 'mantiksal', varsayilan_deger: true },
      { ad: 'b', etiket: 'B', tip: 'mantiksal', varsayilan_deger: true }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'A AND B', tip: 'mantiksal' }
    ]
  },
  {
    tip_kodu: 'mantik_veya',
    baslik: 'VEYA (OR)',
    alt_baslik: 'Biri Doğru mu?',
    kategori: 'mantik',
    renk: '#e11d48',
    ikon_adi: 'GitFork',
    aciklama: 'Girişlerden en az biri doğruysa True döndürür.',
    girdiler: [
      { ad: 'a', etiket: 'A', tip: 'mantiksal', varsayilan_deger: false },
      { ad: 'b', etiket: 'B', tip: 'mantiksal', varsayilan_deger: true }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'A OR B', tip: 'mantiksal' }
    ]
  },
  {
    tip_kodu: 'mantik_degil',
    baslik: 'DEĞİL (NOT)',
    alt_baslik: 'Tersine Çevir',
    kategori: 'mantik',
    renk: '#e11d48',
    ikon_adi: 'SlidersHorizontal',
    aciklama: 'Giriş değerinin mantıksal tersini alır.',
    girdiler: [
      { ad: 'giris', etiket: 'Giriş', tip: 'mantiksal', varsayilan_deger: false }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'NOT Giriş', tip: 'mantiksal' }
    ]
  },
  {
    tip_kodu: 'mantik_secim',
    baslik: 'Seçim (Ternary)',
    alt_baslik: 'Koşullu Değer',
    kategori: 'mantik',
    renk: '#e11d48',
    ikon_adi: 'CheckCheck',
    aciklama: 'Koşula göre Doğru veya Yanlış değerini seçip döndürür.',
    girdiler: [
      { ad: 'kosul', etiket: 'Koşul', tip: 'mantiksal', varsayilan_deger: true },
      { ad: 'dogru_ise', etiket: 'Doğru Değer', tip: 'herhangi', varsayilan_deger: 'Evet' },
      { ad: 'yanlis_ise', etiket: 'Yanlış Değer', tip: 'herhangi', varsayilan_deger: 'Hayır' }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'Seçilen Değer', tip: 'herhangi' }
    ]
  },

  // ==================== MATEMATIK (MATH) ====================
  {
    tip_kodu: 'matematik_topla',
    baslik: 'Topla (+)',
    alt_baslik: 'A + B',
    kategori: 'matematik',
    renk: '#0284c7',
    ikon_adi: 'Plus',
    aciklama: 'İki sayıyı toplar.',
    girdiler: [
      { ad: 'a', etiket: 'A Sayısı', tip: 'sayi', varsayilan_deger: 10 },
      { ad: 'b', etiket: 'B Sayısı', tip: 'sayi', varsayilan_deger: 5 }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'Toplam', tip: 'sayi' }
    ]
  },
  {
    tip_kodu: 'matematik_cikar',
    baslik: 'Çıkar (-)',
    alt_baslik: 'A - B',
    kategori: 'matematik',
    renk: '#0284c7',
    ikon_adi: 'Minus',
    aciklama: 'Birinci sayıdan ikinci sayıyı çıkarır.',
    girdiler: [
      { ad: 'a', etiket: 'A Sayısı', tip: 'sayi', varsayilan_deger: 20 },
      { ad: 'b', etiket: 'B Sayısı', tip: 'sayi', varsayilan_deger: 8 }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'Fark', tip: 'sayi' }
    ]
  },
  {
    tip_kodu: 'matematik_carp',
    baslik: 'Çarp (*)',
    alt_baslik: 'A * B',
    kategori: 'matematik',
    renk: '#0284c7',
    ikon_adi: 'X',
    aciklama: 'İki sayıyı çarpar.',
    girdiler: [
      { ad: 'a', etiket: 'A Sayısı', tip: 'sayi', varsayilan_deger: 6 },
      { ad: 'b', etiket: 'B Sayısı', tip: 'sayi', varsayilan_deger: 7 }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'Çarpım', tip: 'sayi' }
    ]
  },
  {
    tip_kodu: 'matematik_bol',
    baslik: 'Böl (/)',
    alt_baslik: 'A / B',
    kategori: 'matematik',
    renk: '#0284c7',
    ikon_adi: 'Divide',
    aciklama: 'Birinci sayıyı ikinci sayıya böler.',
    girdiler: [
      { ad: 'a', etiket: 'Pay (A)', tip: 'sayi', varsayilan_deger: 50 },
      { ad: 'b', etiket: 'Payda (B)', tip: 'sayi', varsayilan_deger: 2 }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'Bölüm', tip: 'sayi' }
    ]
  },
  {
    tip_kodu: 'matematik_mod',
    baslik: 'Mod Al (%)',
    alt_baslik: 'Kalan Bul',
    kategori: 'matematik',
    renk: '#0284c7',
    ikon_adi: 'Percent',
    aciklama: 'Bir sayının diğerine bölümünden kalanı verir.',
    girdiler: [
      { ad: 'a', etiket: 'Sayı', tip: 'sayi', varsayilan_deger: 10 },
      { ad: 'b', etiket: 'Bölen', tip: 'sayi', varsayilan_deger: 3 }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'Kalan (Mod)', tip: 'sayi' }
    ]
  },
  {
    tip_kodu: 'matematik_us',
    baslik: 'Üs Al (Power)',
    alt_baslik: 'A ^ B',
    kategori: 'matematik',
    renk: '#0284c7',
    ikon_adi: 'Superscript',
    aciklama: 'Taban sayının belirtilen üssünü alır.',
    girdiler: [
      { ad: 'taban', etiket: 'Taban', tip: 'sayi', varsayilan_deger: 2 },
      { ad: 'us', etiket: 'Üs', tip: 'sayi', varsayilan_deger: 8 }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'Sonuç', tip: 'sayi' }
    ]
  },
  {
    tip_kodu: 'matematik_rastgele',
    baslik: 'Rastgele Sayı (Random)',
    alt_baslik: 'Aralıkta Sayı Üret',
    kategori: 'matematik',
    renk: '#0284c7',
    ikon_adi: 'Dices',
    aciklama: 'Min ve Max değerleri arasında rastgele tam sayı üretir.',
    girdiler: [
      { ad: 'min', etiket: 'En Az', tip: 'sayi', varsayilan_deger: 1 },
      { ad: 'max', etiket: 'En Çok', tip: 'sayi', varsayilan_deger: 100 }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'Rastgele Sayı', tip: 'sayi' }
    ]
  },
  {
    tip_kodu: 'matematik_min_max',
    baslik: 'Min / Max Seçici',
    alt_baslik: 'En Küçük / En Büyük',
    kategori: 'matematik',
    renk: '#0284c7',
    ikon_adi: 'ChevronsUpDown',
    aciklama: 'İki sayı arasından küçük veya büyük olanı bulur.',
    varsayilan_ozellikler: { mod: 'max' },
    girdiler: [
      { ad: 'a', etiket: 'A', tip: 'sayi', varsayilan_deger: 15 },
      { ad: 'b', etiket: 'B', tip: 'sayi', varsayilan_deger: 42 }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'Sonuç', tip: 'sayi' }
    ]
  },
  {
    tip_kodu: 'matematik_yuvarla',
    baslik: 'Yuvarla (Round)',
    alt_baslik: 'Floor / Ceil / Round',
    kategori: 'matematik',
    renk: '#0284c7',
    ikon_adi: 'CircleDot',
    aciklama: 'Ondalıklı sayıyı tam sayıya yuvarlar.',
    varsayilan_ozellikler: { yuvarlama_tipi: 'round' },
    girdiler: [
      { ad: 'sayi', etiket: 'Ondalıklı Sayı', tip: 'sayi', varsayilan_deger: 3.7 }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'Tam Sayı', tip: 'sayi' }
    ]
  },

  // ==================== METIN (STRINGS) ====================
  {
    tip_kodu: 'metin_birlestir',
    baslik: 'Metin Birleştir',
    alt_baslik: 'Concat / Template',
    kategori: 'metin',
    renk: '#ec4899',
    ikon_adi: 'FileText',
    aciklama: 'İki metni veya değişkeni yan yana ekler.',
    varsayilan_ozellikler: { ayrac: ' ' },
    girdiler: [
      { ad: 'metin_1', etiket: 'Metin 1', tip: 'herhangi', varsayilan_deger: 'Merhaba' },
      { ad: 'metin_2', etiket: 'Metin 2', tip: 'herhangi', varsayilan_deger: 'Dünya' }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'Birleşik Metin', tip: 'metin' }
    ]
  },
  {
    tip_kodu: 'metin_uzunluk',
    baslik: 'Metin Uzunluğu',
    alt_baslik: 'Karakter Sayısı',
    kategori: 'metin',
    renk: '#ec4899',
    ikon_adi: 'Ruler',
    aciklama: 'Verilen metnin toplam karakter sayısını döner.',
    girdiler: [
      { ad: 'metin', etiket: 'Metin', tip: 'metin', varsayilan_deger: 'NODEFORGE' }
    ],
    ciktilar: [
      { ad: 'uzunluk', etiket: 'Uzunluk', tip: 'sayi' }
    ]
  },
  {
    tip_kodu: 'metin_iceriyor_mu',
    baslik: 'İçeriyor mu? (Includes)',
    alt_baslik: 'Alt Metin Arama',
    kategori: 'metin',
    renk: '#ec4899',
    ikon_adi: 'Search',
    aciklama: 'Metin içinde aranan kelime/ifade varsa True verir.',
    girdiler: [
      { ad: 'ana_metin', etiket: 'Ana Metin', tip: 'metin', varsayilan_deger: 'Visual Studio Blueprint' },
      { ad: 'aranan', etiket: 'Aranan', tip: 'metin', varsayilan_deger: 'Blueprint' }
    ],
    ciktilar: [
      { ad: 'var_mi', etiket: 'Bulundu mu?', tip: 'mantiksal' }
    ]
  },
  {
    tip_kodu: 'metin_bol',
    baslik: 'Metin Böl (Split)',
    alt_baslik: 'Diziye Dönüştür',
    kategori: 'metin',
    renk: '#ec4899',
    ikon_adi: 'Scissors',
    aciklama: 'Metni belirtilen ayraç karakterine göre parçalayıp dizi yapar.',
    girdiler: [
      { ad: 'metin', etiket: 'Metin', tip: 'metin', varsayilan_deger: 'elma,armut,muz' },
      { ad: 'ayrac', etiket: 'Ayraç', tip: 'metin', varsayilan_deger: ',' }
    ],
    ciktilar: [
      { ad: 'dizi', etiket: 'Parçalar (Dizi)', tip: 'dizi' }
    ]
  },
  {
    tip_kodu: 'metin_degistir',
    baslik: 'Metin Değiştir (Replace)',
    alt_baslik: 'Kelime Değiştir',
    kategori: 'metin',
    renk: '#ec4899',
    ikon_adi: 'Replace',
    aciklama: 'Metindeki hedef kelimeyi yeni kelimeyle değiştirir.',
    girdiler: [
      { ad: 'metin', etiket: 'Metin', tip: 'metin', varsayilan_deger: 'Merhaba Python' },
      { ad: 'eski_deger', etiket: 'Eski', tip: 'metin', varsayilan_deger: 'Python' },
      { ad: 'yeni_deger', etiket: 'Yeni', tip: 'metin', varsayilan_deger: 'TypeScript' }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'Yeni Metin', tip: 'metin' }
    ]
  },
  {
    tip_kodu: 'metin_buyuk_kucuk',
    baslik: 'Harf Boyutu (Case)',
    alt_baslik: 'Upper / Lower',
    kategori: 'metin',
    renk: '#ec4899',
    ikon_adi: 'CaseSensitive',
    aciklama: 'Metni tamamen BÜYÜK veya küçük harfe dönüştürür.',
    varsayilan_ozellikler: { mod: 'buyuk' },
    girdiler: [
      { ad: 'metin', etiket: 'Metin', tip: 'metin', varsayilan_deger: 'nodeforge visual studio' }
    ],
    ciktilar: [
      { ad: 'sonuc', etiket: 'Sonuç', tip: 'metin' }
    ]
  },

  // ==================== FONKSIYONLAR (FUNCTIONS) ====================
  {
    tip_kodu: 'fonksiyon_girisi',
    baslik: 'Fonksiyon Başlığı (Entry)',
    alt_baslik: 'Özel Fonksiyon Girişi',
    kategori: 'fonksiyonlar',
    renk: '#14b8a6',
    ikon_adi: 'Code',
    aciklama: 'Özel tanımlı bir fonksiyonun başlangıç noktası.',
    varsayilan_ozellikler: { fonksiyon_adi: 'puan_kontrol' },
    girdiler: [],
    ciktilar: [
      { ad: 'cikis_akis', etiket: 'Akış', tip: 'akis' },
      { ad: 'parametre_1', etiket: 'Parametre 1', tip: 'herhangi' },
      { ad: 'parametre_2', etiket: 'Parametre 2', tip: 'herhangi' }
    ]
  },
  {
    tip_kodu: 'fonksiyon_cagrisi',
    baslik: 'Fonksiyon Çağır (Call)',
    alt_baslik: 'İşlevi Çalıştır',
    kategori: 'fonksiyonlar',
    renk: '#14b8a6',
    ikon_adi: 'PhoneCall',
    aciklama: 'Tanımlanmış bir fonksiyonu argümanlarla çağırır.',
    varsayilan_ozellikler: { fonksiyon_adi: 'puan_kontrol' },
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' },
      { ad: 'arguman_1', etiket: 'Argüman 1', tip: 'herhangi', varsayilan_deger: 75 },
      { ad: 'arguman_2', etiket: 'Argüman 2', tip: 'herhangi', varsayilan_deger: 50 }
    ],
    ciktilar: [
      { ad: 'cikis_akis', etiket: 'Akış', tip: 'akis' },
      { ad: 'donus_degeri', etiket: 'Dönüş Değeri', tip: 'herhangi' }
    ]
  },
  {
    tip_kodu: 'fonksiyon_donusu',
    baslik: 'Return (Fonksiyon Dönüşü)',
    alt_baslik: 'Değer Döndür ve Çık',
    kategori: 'fonksiyonlar',
    renk: '#14b8a6',
    ikon_adi: 'CornerUpLeft',
    aciklama: 'Fonksiyondan çıkış yapar ve sonucu geri iletir.',
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' },
      { ad: 'deger', etiket: 'Dönüş Değeri', tip: 'herhangi', varsayilan_deger: true }
    ],
    ciktilar: []
  },

  // ==================== OLAYLAR (EVENTS) ====================
  {
    tip_kodu: 'olay_baslangic',
    baslik: 'On Start (Başlangıç Olayı)',
    alt_baslik: 'Uygulama Yüklendiğinde',
    kategori: 'olaylar',
    renk: '#eab308',
    ikon_adi: 'Zap',
    aciklama: 'Uygulama veya bileşen başladığında otomatik tetiklenir.',
    girdiler: [],
    ciktilar: [
      { ad: 'cikis_akis', etiket: 'Tetiklendi', tip: 'akis' }
    ]
  },
  {
    tip_kodu: 'olay_tiklama',
    baslik: 'On Click (Tıklama Olayı)',
    alt_baslik: 'Kullanıcı Tıkladığında',
    kategori: 'olaylar',
    renk: '#eab308',
    ikon_adi: 'MousePointerClick',
    aciklama: 'Bir buton veya hedefe tıklandığında tetiklenir.',
    varsayilan_ozellikler: { hedef_eleman: 'btn_kaydet' },
    girdiler: [],
    ciktilar: [
      { ad: 'cikis_akis', etiket: 'Tetiklendi', tip: 'akis' },
      { ad: 'olay_verisi', etiket: 'Tıklama Bilgisi', tip: 'nesne' }
    ]
  },
  {
    tip_kodu: 'olay_girdi',
    baslik: 'On Input (Girdi Değişimi)',
    alt_baslik: 'Kullanıcı Yazdığında',
    kategori: 'olaylar',
    renk: '#eab308',
    ikon_adi: 'TextCursorInput',
    aciklama: 'Metin alanına yazı yazıldığında tetiklenir.',
    varsayilan_ozellikler: { hedef_eleman: 'input_arama' },
    girdiler: [],
    ciktilar: [
      { ad: 'cikis_akis', etiket: 'Tetiklendi', tip: 'akis' },
      { ad: 'yeni_metin', etiket: 'Girilen Metin', tip: 'metin' }
    ]
  },

  // ==================== SISTEM (SYSTEM) ====================
  {
    tip_kodu: 'sistem_konsol_yazdir',
    baslik: 'Console Log',
    alt_baslik: 'Konsola Bilgi Yaz',
    kategori: 'sistem',
    renk: '#64748b',
    ikon_adi: 'Terminal',
    aciklama: 'Konsol paneline metin veya veri çıktısı yazar.',
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' },
      { ad: 'mesaj', etiket: 'Mesaj / Veri', tip: 'herhangi', varsayilan_deger: 'Başarılı!' }
    ],
    ciktilar: [
      { ad: 'cikis_akis', etiket: 'Akış', tip: 'akis' }
    ]
  },
  {
    tip_kodu: 'sistem_konsol_uyari',
    baslik: 'Console Warn / Error',
    alt_baslik: 'Uyarı veya Hata Yaz',
    kategori: 'sistem',
    renk: '#f97316',
    ikon_adi: 'AlertTriangle',
    aciklama: 'Konsola renkli uyarı veya hata mesajı yazdırır.',
    varsayilan_ozellikler: { tur: 'uyari' },
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' },
      { ad: 'mesaj', etiket: 'Uyarı Mesajı', tip: 'metin', varsayilan_deger: 'Dikkat: Değer sınırda!' }
    ],
    ciktilar: [
      { ad: 'cikis_akis', etiket: 'Akış', tip: 'akis' }
    ]
  },
  {
    tip_kodu: 'sistem_dosya_oku',
    baslik: 'Dosya Oku (Read File)',
    alt_baslik: 'Workspace Dosyası',
    kategori: 'sistem',
    renk: '#64748b',
    ikon_adi: 'FolderOpen',
    aciklama: 'Sanal dosya sisteminden veya projeden dosya okur.',
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' },
      { ad: 'dosya_yolu', etiket: 'Dosya Yolu', tip: 'metin', varsayilan_deger: 'veri.json' }
    ],
    ciktilar: [
      { ad: 'cikis_akis', etiket: 'Akış', tip: 'akis' },
      { ad: 'icerik', etiket: 'Dosya İçeriği', tip: 'metin' }
    ]
  },
  {
    tip_kodu: 'sistem_dosya_yaz',
    baslik: 'Dosya Yaz (Write File)',
    alt_baslik: 'Veriyi Dosyaya Kaydet',
    kategori: 'sistem',
    renk: '#64748b',
    ikon_adi: 'Save',
    aciklama: 'Verilen metni belirtilen dosyaya yazar.',
    girdiler: [
      { ad: 'giris_akis', etiket: 'Giriş', tip: 'akis' },
      { ad: 'dosya_yolu', etiket: 'Dosya Yolu', tip: 'metin', varsayilan_deger: 'cikti.txt' },
      { ad: 'icerik', etiket: 'İçerik', tip: 'metin', varsayilan_deger: 'NODEFORGE Çıktı Raporu' }
    ],
    ciktilar: [
      { ad: 'cikis_akis', etiket: 'Akış', tip: 'akis' },
      { ad: 'basarili', etiket: 'Yazıldı mı?', tip: 'mantiksal' }
    ]
  },
  {
    tip_kodu: 'sistem_json_ayristir',
    baslik: 'JSON Parse / Stringify',
    alt_baslik: 'JSON Dönüştürücü',
    kategori: 'sistem',
    renk: '#64748b',
    ikon_adi: 'FileJson',
    aciklama: 'JSON metnini nesneye veya nesneyi JSON metnine çevirir.',
    varsayilan_ozellikler: { islem: 'ayristir' },
    girdiler: [
      { ad: 'girdi', etiket: 'Girdi', tip: 'herhangi', varsayilan_deger: '{"puan": 85, "durum": "gecti"}' }
    ],
    ciktilar: [
      { ad: 'cikti', etiket: 'Çıktı', tip: 'herhangi' }
    ]
  }
];

export function sablondan_dugum_olustur(
  sablon: dugum_sablonu,
  konum_x: number,
  konum_y: number
): dugum_tanimi {
  const benzersiz_id = 'dugum_' + Math.random().toString(36).substring(2, 9);
  
  return {
    id: benzersiz_id,
    tip_kodu: sablon.tip_kodu,
    baslik: sablon.baslik,
    alt_baslik: sablon.alt_baslik,
    kategori: sablon.kategori,
    renk: sablon.renk,
    ikon_adi: sablon.ikon_adi,
    konum_x: Math.round(konum_x / 10) * 10,
    konum_y: Math.round(konum_y / 10) * 10,
    genislik: 220,
    yukseklik: 140,
    ozellikler: { ...(sablon.varsayilan_ozellikler || {}) },
    girdiler: sablon.girdiler.map((g, i) => ({
      id: `${benzersiz_id}_girdi_${i}_${g.ad}`,
      ad: g.ad,
      etiket: g.etiket,
      yon: 'girdi',
      tip: g.tip,
      varsayilan_deger: g.varsayilan_deger,
      aciklama: g.aciklama,
      zorunlu: g.zorunlu
    })),
    ciktilar: sablon.ciktilar.map((c, i) => ({
      id: `${benzersiz_id}_cikti_${i}_${c.ad}`,
      ad: c.ad,
      etiket: c.etiket,
      yon: 'cikti',
      tip: c.tip,
      aciklama: c.aciklama
    }))
  };
}

export const kategori_bilgileri: Record<dugum_kategorisi, { ad: string; renk: string; aciklama: string }> = {
  akis: { ad: 'Akış Kontrolü', renk: '#10b981', aciklama: 'Program akışı, if/else, döngüler ve dallanmalar' },
  degiskenler: { ad: 'Değişkenler', renk: '#06b6d4', aciklama: 'Veri saklama, okuma ve güncelleme düğümleri' },
  mantik: { ad: 'Mantık İşlemleri', renk: '#e11d48', aciklama: 'Karşılaştırma, VE, VEYA, DEĞİL operatörleri' },
  matematik: { ad: 'Matematik', renk: '#0284c7', aciklama: 'Temel aritmetik, rastgele sayı ve formüller' },
  metin: { ad: 'Metin İşlemleri', renk: '#ec4899', aciklama: 'Dize birleştirme, bölme, arama ve formatlama' },
  fonksiyonlar: { ad: 'Fonksiyonlar', renk: '#14b8a6', aciklama: 'Özel işlev tanımlama, parametre ve çağrılar' },
  olaylar: { ad: 'Olaylar (Events)', renk: '#eab308', aciklama: 'Başlatma, tıklama ve kullanıcı etkileşimleri' },
  sistem: { ad: 'Sistem & G/Ç', renk: '#64748b', aciklama: 'Konsol çıktıları, dosya erişimi ve JSON işlemleri' }
};
