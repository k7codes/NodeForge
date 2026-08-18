/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Kod Uretim ve Derleme Yoneticisi (7 Hedef Dil Desteği)
 */

import { proje_yapisi, derleme_sonucu, dil_secenegi } from '../tipler/grafik_tipleri';
import { grafigi_dogrula } from '../dogrulama/grafik_dogrulayici';
import { grafigi_ara_temsile_donustur } from './ara_temsil';
import { javascript_kodu_uret } from './javascript_uretici';
import { typescript_kodu_uret } from './typescript_uretici';
import { python_kodu_uret } from './python_uretici';
import { csharp_kodu_uret } from './csharp_uretici';
import { cpp_kodu_uret } from './cpp_uretici';
import { go_kodu_uret } from './go_uretici';
import { rust_kodu_uret } from './rust_uretici';

export function projeyi_derle_ve_kod_uret(
  proje: proje_yapisi, 
  hedef_dil_ezme?: dil_secenegi
): derleme_sonucu {
  const baslama_zamani = performance.now();
  const secilen_dil = hedef_dil_ezme || proje.ayarlar.hedef_dil || 'typescript';

  // 1. Grafik Doğrulama
  const dogrulama = grafigi_dogrula(proje);

  // 2. Ara Temsil (IR) Oluşturma
  const ara_temsil = grafigi_ara_temsile_donustur(proje);

  // 3. Dil Üreticisini Çalıştır
  let ana_kod = '';
  let dosya_adi = 'main.ts';

  switch (secilen_dil) {
    case 'javascript':
      ana_kod = javascript_kodu_uret(ara_temsil);
      dosya_adi = 'main.js';
      break;

    case 'typescript':
      ana_kod = typescript_kodu_uret(ara_temsil);
      dosya_adi = 'main.ts';
      break;

    case 'python':
      ana_kod = python_kodu_uret(ara_temsil);
      dosya_adi = 'main.py';
      break;

    case 'csharp':
      ana_kod = csharp_kodu_uret(ara_temsil);
      dosya_adi = 'Program.cs';
      break;

    case 'cpp':
      ana_kod = cpp_kodu_uret(ara_temsil);
      dosya_adi = 'main.cpp';
      break;

    case 'go':
      ana_kod = go_kodu_uret(ara_temsil);
      dosya_adi = 'main.go';
      break;

    case 'rust':
      ana_kod = rust_kodu_uret(ara_temsil);
      dosya_adi = 'main.rs';
      break;

    default:
      ana_kod = typescript_kodu_uret(ara_temsil);
      dosya_adi = 'main.ts';
      break;
  }

  // 4. Sanal Dosya Ağacı Paketle
  const dosyalar: Record<string, string> = {
    [`src/${dosya_adi}`]: ana_kod,
    'project.nodeforge': JSON.stringify(proje, null, 2),
    'nodeforge.config.json': JSON.stringify({
      name: (proje.ayarlar.proje_adi || 'nodeforge-app').toLowerCase().replace(/[^a-z0-9]/g, '-'),
      version: proje.ayarlar.surum || '1.0.0',
      description: proje.ayarlar.aciklama || 'NODEFORGE Application',
      target_language: secilen_dil,
      author: 'Developed By K7~',
      entry_file: `src/${dosya_adi}`,
      built_at: new Date().toISOString()
    }, null, 2)
  };

  // Projedeki ek kullanıcı metin/kod dosyalarını da sanal dosya ağacına ekle
  if (Array.isArray(proje.dosyalar)) {
    proje.dosyalar.forEach(d => {
      if (d.tur !== 'grafik' && d.icerik) {
        dosyalar[d.yol || d.ad] = d.icerik;
      }
    });
  }

  const bitis_zamani = performance.now();
  const uretim_suresi_ms = Math.round((bitis_zamani - baslama_zamani) * 100) / 100;
  const kod_satir_sayisi = ana_kod.split('\n').length;

  return {
    basarili: dogrulama.hatalar.length === 0,
    uretim_suresi_ms,
    ana_kod,
    kod: ana_kod,
    dosyalar,
    hatalar: dogrulama.hatalar,
    uyarilar: dogrulama.uyarilar,
    ara_temsil,
    dogrulama: {
      gecerli: dogrulama.hatalar.length === 0,
      gecerli_mi: dogrulama.gecerli_mi,
      hatalar: dogrulama.hatalar,
      uyarilar: dogrulama.uyarilar,
      bilgiler: dogrulama.bilgiler
    },
    istatistikler: {
      toplam_dugum: (proje.dugumler || []).length,
      toplam_baglanti: (proje.baglantilar || []).length,
      toplam_degisken: (proje.degiskenler || []).length,
      toplam_fonksiyon: (proje.fonksiyonlar || []).length,
      kod_satir_sayisi
    }
  };
}
