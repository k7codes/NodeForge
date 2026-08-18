/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~ 
 * Hazir Sablon Projeler
 */

import { sablon_proje } from '../tipler/grafik_tipleri';

export const hazir_sablonlar: sablon_proje[] = [
  {
    id: 'sablon_puan_kontrolu',
    ad: 'Puan Kontrolü ve Karar Akışı',
    aciklama: 'Başlangıç, puan değişkeni, > 50 koşulu ve başarılı/başarısız log çıktısı.',
    kategori: 'Temel Başlangıç',
    hedef_dil: 'typescript',
    veri: {
      id: 'proje_varsayilan_01',
      ayarlar: {
        proje_adi: 'Puan Kontrolü',
        surum: '1.0.0',
        yazar: 'Developed By K7~ ',
        hedef_dil: 'typescript',
        giris_noktasi: 'main.ts',
        aciklama: 'Unreal Engine tarzı görsel puan değerlendirme ve karar mekanizması.',
        olusturma_tarihi: new Date().toISOString(),
        guncelleme_tarihi: new Date().toISOString()
      },
      degiskenler: [
        { id: 'deg_puan', ad: 'puan', tip: 'sayi', varsayilan_deger: 75, aciklama: 'Öğrenci sınav notu' }
      ],
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
          konum_x: 60,
          konum_y: 180,
          ozellikler: {},
          girdiler: [],
          ciktilar: [
            { id: 'dugum_baslangic_cikis_akis', ad: 'cikis_akis', etiket: 'Akış', yon: 'cikti', tip: 'akis' }
          ]
        },
        {
          id: 'dugum_degisken_puan',
          tip_kodu: 'degisken_getir',
          baslik: 'Değişken Al (Get)',
          alt_baslik: 'puan oku',
          kategori: 'degiskenler',
          renk: '#06b6d4',
          ikon_adi: 'ArrowUpRight',
          konum_x: 320,
          konum_y: 340,
          ozellikler: { degisken_adi: 'puan' },
          girdiler: [],
          ciktilar: [
            { id: 'dugum_degisken_puan_deger', ad: 'deger', etiket: 'Değer (puan)', yon: 'cikti', tip: 'sayi' }
          ]
        },
        {
          id: 'dugum_karsilastir',
          tip_kodu: 'mantik_karsilastir',
          baslik: 'Karşılaştır (Compare)',
          alt_baslik: 'puan > 50',
          kategori: 'mantik',
          renk: '#e11d48',
          ikon_adi: 'Scale',
          konum_x: 340,
          konum_y: 180,
          ozellikler: { operator: '>' },
          girdiler: [
            { id: 'dugum_karsilastir_a', ad: 'a', etiket: 'A Değeri', yon: 'girdi', tip: 'herhangi', varsayilan_deger: 0 },
            { id: 'dugum_karsilastir_b', ad: 'b', etiket: 'B Değeri', yon: 'girdi', tip: 'herhangi', varsayilan_deger: 50 }
          ],
          ciktilar: [
            { id: 'dugum_karsilastir_sonuc', ad: 'sonuc', etiket: 'Sonuç (bool)', yon: 'cikti', tip: 'mantiksal' }
          ]
        },
        {
          id: 'dugum_branch',
          tip_kodu: 'akis_kosul',
          baslik: 'Branch (Koşul)',
          alt_baslik: 'If / Else Kararı',
          kategori: 'akis',
          renk: '#8b5cf6',
          ikon_adi: 'GitBranch',
          konum_x: 600,
          konum_y: 180,
          ozellikler: {},
          girdiler: [
            { id: 'dugum_branch_giris_akis', ad: 'giris_akis', etiket: 'Giriş', yon: 'girdi', tip: 'akis' },
            { id: 'dugum_branch_kosul', ad: 'kosul', etiket: 'Koşul', yon: 'girdi', tip: 'mantiksal', varsayilan_deger: true, zorunlu: true }
          ],
          ciktilar: [
            { id: 'dugum_branch_dogru_akis', ad: 'dogru_akis', etiket: 'Doğru (True)', yon: 'cikti', tip: 'akis' },
            { id: 'dugum_branch_yanlis_akis', ad: 'yanlis_akis', etiket: 'Yanlış (False)', yon: 'cikti', tip: 'akis' }
          ]
        },
        {
          id: 'dugum_log_basarili',
          tip_kodu: 'sistem_konsol_yazdir',
          baslik: 'Console Log',
          alt_baslik: 'Başarılı',
          kategori: 'sistem',
          renk: '#64748b',
          ikon_adi: 'Terminal',
          konum_x: 880,
          konum_y: 120,
          ozellikler: {},
          girdiler: [
            { id: 'dugum_log_basarili_giris_akis', ad: 'giris_akis', etiket: 'Giriş', yon: 'girdi', tip: 'akis' },
            { id: 'dugum_log_basarili_mesaj', ad: 'mesaj', etiket: 'Mesaj', yon: 'girdi', tip: 'herhangi', varsayilan_deger: 'Tebrikler! Sınavı başarıyla geçtiniz. (Başarılı)' }
          ],
          ciktilar: [
            { id: 'dugum_log_basarili_cikis_akis', ad: 'cikis_akis', etiket: 'Akış', yon: 'cikti', tip: 'akis' }
          ]
        },
        {
          id: 'dugum_log_basarisiz',
          tip_kodu: 'sistem_konsol_yazdir',
          baslik: 'Console Log',
          alt_baslik: 'Başarısız',
          kategori: 'sistem',
          renk: '#64748b',
          ikon_adi: 'Terminal',
          konum_x: 880,
          konum_y: 280,
          ozellikler: {},
          girdiler: [
            { id: 'dugum_log_basarisiz_giris_akis', ad: 'giris_akis', etiket: 'Giriş', yon: 'girdi', tip: 'akis' },
            { id: 'dugum_log_basarisiz_mesaj', ad: 'mesaj', etiket: 'Mesaj', yon: 'girdi', tip: 'herhangi', varsayilan_deger: 'Üzgünüz! Baraj puanının altında kaldınız. (Başarısız)' }
          ],
          ciktilar: [
            { id: 'dugum_log_basarisiz_cikis_akis', ad: 'cikis_akis', etiket: 'Akış', yon: 'cikti', tip: 'akis' }
          ]
        }
      ],
      baglantilar: [
        {
          id: 'bag_1',
          kaynak_dugum_id: 'dugum_baslangic',
          kaynak_port_id: 'dugum_baslangic_cikis_akis',
          hedef_dugum_id: 'dugum_branch',
          hedef_port_id: 'dugum_branch_giris_akis',
          tip: 'akis'
        },
        {
          id: 'bag_2',
          kaynak_dugum_id: 'dugum_degisken_puan',
          kaynak_port_id: 'dugum_degisken_puan_deger',
          hedef_dugum_id: 'dugum_karsilastir',
          hedef_port_id: 'dugum_karsilastir_a',
          tip: 'sayi'
        },
        {
          id: 'bag_3',
          kaynak_dugum_id: 'dugum_karsilastir',
          kaynak_port_id: 'dugum_karsilastir_sonuc',
          hedef_dugum_id: 'dugum_branch',
          hedef_port_id: 'dugum_branch_kosul',
          tip: 'mantiksal'
        },
        {
          id: 'bag_4',
          kaynak_dugum_id: 'dugum_branch',
          kaynak_port_id: 'dugum_branch_dogru_akis',
          hedef_dugum_id: 'dugum_log_basarili',
          hedef_port_id: 'dugum_log_basarili_giris_akis',
          tip: 'akis'
        },
        {
          id: 'bag_5',
          kaynak_dugum_id: 'dugum_branch',
          kaynak_port_id: 'dugum_branch_yanlis_akis',
          hedef_dugum_id: 'dugum_log_basarisiz',
          hedef_port_id: 'dugum_log_basarisiz_giris_akis',
          tip: 'akis'
        }
      ],
      dosyalar: [
        {
          id: 'dosya_main_graph',
          yol: 'src/main.graph',
          ad: 'main.graph',
          tur: 'grafik',
          icerik: '// Puan Kontrolü Görsel Akış Grafiği\n'
        },
        {
          id: 'dosya_yardimci_graph',
          yol: 'src/hesaplamalar.graph',
          ad: 'hesaplamalar.graph',
          tur: 'grafik',
          icerik: '// Yardımcı Hesaplama Grafiği\n',
          grafik_verisi: {
            dugumler: [
              {
                id: 'dugum_fn_giris',
                tip_kodu: 'akis_baslangic',
                baslik: 'Başlangıç',
                alt_baslik: 'Alt Akış Girişi',
                kategori: 'akis',
                renk: '#10b981',
                ikon_adi: 'Play',
                konum_x: 60,
                konum_y: 150,
                ozellikler: {},
                girdiler: [],
                ciktilar: [
                  { id: 'dugum_fn_giris_cikis_akis', ad: 'cikis_akis', etiket: 'Akış', yon: 'cikti', tip: 'akis' }
                ]
              },
              {
                id: 'dugum_carp',
                tip_kodu: 'matematik_carp',
                baslik: 'Çarp (Multiply)',
                alt_baslik: 'X * Y',
                kategori: 'matematik',
                renk: '#3b82f6',
                ikon_adi: 'Plus',
                konum_x: 320,
                konum_y: 150,
                ozellikler: {},
                girdiler: [
                  { id: 'dugum_carp_a', ad: 'a', etiket: 'A Değeri', yon: 'girdi', tip: 'sayi', varsayilan_deger: 10 },
                  { id: 'dugum_carp_b', ad: 'b', etiket: 'B Değeri', yon: 'girdi', tip: 'sayi', varsayilan_deger: 5 }
                ],
                ciktilar: [
                  { id: 'dugum_carp_sonuc', ad: 'sonuc', etiket: 'Sonuç', yon: 'cikti', tip: 'sayi' }
                ]
              }
            ],
            baglantilar: []
          }
        },
        {
          id: 'dosya_utils',
          yol: 'src/utils.ts',
          ad: 'utils.ts',
          tur: 'kod',
          icerik: `/**\n * NODEFORGE - Yardımcı Fonksiyonlar\n * Developed By K7~\n */\n\nexport function puan_durumu_mesaji(puan: number, baraj: number = 50): string {\n  return puan >= baraj ? "BAŞARILI: Tebrikler" : "BAŞARISIZ: Kaldınız";\n}\n`
        },
        {
          id: 'dosya_config',
          yol: 'config.json',
          ad: 'config.json',
          tur: 'yapilandirma',
          icerik: '{\n  "project": "Puan Kontrolü",\n  "version": "1.0.0",\n  "author": "Developed By K7~",\n  "debug": true\n}'
        },
        {
          id: 'dosya_readme',
          yol: 'README.md',
          ad: 'README.md',
          tur: 'veri',
          icerik: '# Puan Kontrolü Projesi\n\nBu projede görsel düğümler (Blueprint) ile puan denetimi ve şartlı dallanma yapısı kurulmuştur.\n'
        }
      ],
      gorunum: {
        kaydirma_x: 20,
        kaydirma_y: 40,
        olcek: 1,
        izgara_goster: true,
        hizalama_aktif: true
      }
    }
  },
  {
    id: 'sablon_dongu_toplam',
    ad: 'Döngü ve Sayı Toplayıcı',
    aciklama: 'For döngüsü ile 1 ile 10 arasındaki sayıları toplayıp ekrana yazdırır.',
    kategori: 'Algoritmalar',
    hedef_dil: 'typescript',
    veri: {
      id: 'proje_dongu_02',
      ayarlar: {
        proje_adi: 'Döngü ve Sayı Toplayıcı',
        surum: '1.0.0',
        yazar: 'Developed By K7~ ',
        hedef_dil: 'typescript',
        giris_noktasi: 'main.ts',
        aciklama: 'For döngüsü ve matematiksel toplam işlemi.',
        olusturma_tarihi: new Date().toISOString(),
        guncelleme_tarihi: new Date().toISOString()
      },
      degiskenler: [
        { id: 'deg_toplam', ad: 'toplam', tip: 'sayi', varsayilan_deger: 0, aciklama: 'Toplam değer' }
      ],
      fonksiyonlar: [],
      dugumler: [
        {
          id: 'd_basla',
          tip_kodu: 'akis_baslangic',
          baslik: 'Başlangıç',
          alt_baslik: 'Program Girişi',
          kategori: 'akis',
          renk: '#10b981',
          ikon_adi: 'Play',
          konum_x: 60,
          konum_y: 200,
          ozellikler: {},
          girdiler: [],
          ciktilar: [
            { id: 'd_basla_cikis', ad: 'cikis_akis', etiket: 'Akış', yon: 'cikti', tip: 'akis' }
          ]
        },
        {
          id: 'd_for',
          tip_kodu: 'akis_sayac_dongusu',
          baslik: 'For Döngüsü',
          alt_baslik: '1 -> 10',
          kategori: 'akis',
          renk: '#f59e0b',
          ikon_adi: 'Repeat',
          konum_x: 320,
          konum_y: 200,
          ozellikler: {},
          girdiler: [
            { id: 'd_for_giris', ad: 'giris_akis', etiket: 'Giriş', yon: 'girdi', tip: 'akis' },
            { id: 'd_for_baslangic', ad: 'baslangic', etiket: 'Başlangıç', yon: 'girdi', tip: 'sayi', varsayilan_deger: 1 },
            { id: 'd_for_bitis', ad: 'bitis', etiket: 'Bitiş', yon: 'girdi', tip: 'sayi', varsayilan_deger: 10 },
            { id: 'd_for_artis', ad: 'artis', etiket: 'Artış', yon: 'girdi', tip: 'sayi', varsayilan_deger: 1 }
          ],
          ciktilar: [
            { id: 'd_for_govde', ad: 'dongu_govdesi', etiket: 'Döngü Gövdesi', yon: 'cikti', tip: 'akis' },
            { id: 'd_for_i', ad: 'indeks', etiket: 'Mevcut İndeks (i)', yon: 'cikti', tip: 'sayi' },
            { id: 'd_for_bitti', ad: 'tamamlandi', etiket: 'Tamamlandı', yon: 'cikti', tip: 'akis' }
          ]
        },
        {
          id: 'd_log_govde',
          tip_kodu: 'sistem_konsol_yazdir',
          baslik: 'Console Log',
          alt_baslik: 'Adım Log',
          kategori: 'sistem',
          renk: '#64748b',
          ikon_adi: 'Terminal',
          konum_x: 620,
          konum_y: 120,
          ozellikler: {},
          girdiler: [
            { id: 'd_log_govde_giris', ad: 'giris_akis', etiket: 'Giriş', yon: 'girdi', tip: 'akis' },
            { id: 'd_log_govde_mesaj', ad: 'mesaj', etiket: 'Mesaj', yon: 'girdi', tip: 'herhangi', varsayilan_deger: 'Döngü adımı çalışıyor' }
          ],
          ciktilar: [
            { id: 'd_log_govde_cikis', ad: 'cikis_akis', etiket: 'Akış', yon: 'cikti', tip: 'akis' }
          ]
        },
        {
          id: 'd_log_bitti',
          tip_kodu: 'sistem_konsol_yazdir',
          baslik: 'Console Log',
          alt_baslik: 'Döngü Sonu',
          kategori: 'sistem',
          renk: '#64748b',
          ikon_adi: 'Terminal',
          konum_x: 620,
          konum_y: 300,
          ozellikler: {},
          girdiler: [
            { id: 'd_log_bitti_giris', ad: 'giris_akis', etiket: 'Giriş', yon: 'girdi', tip: 'akis' },
            { id: 'd_log_bitti_mesaj', ad: 'mesaj', etiket: 'Mesaj', yon: 'girdi', tip: 'herhangi', varsayilan_deger: 'Tüm döngü adımları başarıyla tamamlandı!' }
          ],
          ciktilar: [
            { id: 'd_log_bitti_cikis', ad: 'cikis_akis', etiket: 'Akış', yon: 'cikti', tip: 'akis' }
          ]
        }
      ],
      baglantilar: [
        {
          id: 'b_for_1',
          kaynak_dugum_id: 'd_basla',
          kaynak_port_id: 'd_basla_cikis',
          hedef_dugum_id: 'd_for',
          hedef_port_id: 'd_for_giris',
          tip: 'akis'
        },
        {
          id: 'b_for_2',
          kaynak_dugum_id: 'd_for',
          kaynak_port_id: 'd_for_govde',
          hedef_dugum_id: 'd_log_govde',
          hedef_port_id: 'd_log_govde_giris',
          tip: 'akis'
        },
        {
          id: 'b_for_3',
          kaynak_dugum_id: 'd_for',
          kaynak_port_id: 'd_for_bitti',
          hedef_dugum_id: 'd_log_bitti',
          hedef_port_id: 'd_log_bitti_giris',
          tip: 'akis'
        }
      ],
      dosyalar: [
        {
          id: 'dosya_main_graph',
          yol: 'src/main.graph',
          ad: 'main.graph',
          tur: 'grafik',
          icerik: '// Döngü ve Toplama Akışı\n'
        },
        {
          id: 'dosya_utils',
          yol: 'src/utils.ts',
          ad: 'utils.ts',
          tur: 'kod',
          icerik: `/**\n * NODEFORGE - Döngü Yardımcıları\n * Developed By K7~\n */\n\nexport function dizi_topla(sayilar: number[]): number {\n  return sayilar.reduce((a, b) => a + b, 0);\n}\n`
        },
        {
          id: 'dosya_config',
          yol: 'config.json',
          ad: 'config.json',
          tur: 'yapilandirma',
          icerik: '{\n  "project": "Döngü ve Sayı Toplayıcı",\n  "version": "1.0.0"\n}'
        }
      ],
      gorunum: {
        kaydirma_x: 40,
        kaydirma_y: 40,
        olcek: 1,
        izgara_goster: true,
        hizalama_aktif: true
      }
    }
  }
];
