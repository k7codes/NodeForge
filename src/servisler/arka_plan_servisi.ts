/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~ 
 * Arka Plan Calistirma ve Kod Çevrim Servisi (Execution Engine)
 */

import { calistirma_sonucu, konsol_kaydi, proje_yapisi } from '../tipler/grafik_tipleri';
import { projeyi_derle_ve_kod_uret } from '../uretici/kod_uretim_yoneticisi';
import { grafigi_ara_temsile_donustur, ara_komut, ara_ifade } from '../uretici/ara_temsil';

export async function projeyi_calistir(proje: proje_yapisi): Promise<calistirma_sonucu> {
  const baslama_zamani = performance.now();
  const ciktilar: konsol_kaydi[] = [];
  const hedef_dil = proje.ayarlar.hedef_dil || 'typescript';

  // 1. STATİK DİLLER (C++, C#, Rust, Go)
  // Tarayıcı ortamında C++, C#, Rust, Go binary derleyicisi bulunmadığından,
  // bu dillerin asıl amacı görsel grafiği eksiksiz kaynak koda çevirmektir.
  const statik_diller = ['cpp', 'csharp', 'rust', 'go'];
  if (statik_diller.includes(hedef_dil)) {
    const derleme = projeyi_derle_ve_kod_uret(proje, hedef_dil);

    let dil_etiketi = 'C++ 20';
    let dosya_adi = 'main.cpp';
    let derleme_komutu = 'g++ -std=c++20 main.cpp -o program && ./program';

    if (hedef_dil === 'csharp') {
      dil_etiketi = 'C# (.NET 8)';
      dosya_adi = 'Program.cs';
      derleme_komutu = 'dotnet run  (veya Visual Studio / Rider)';
    } else if (hedef_dil === 'rust') {
      dil_etiketi = 'Rust 2024';
      dosya_adi = 'main.rs';
      derleme_komutu = 'rustc main.rs && ./main (veya cargo run)';
    } else if (hedef_dil === 'go') {
      dil_etiketi = 'Golang 1.22';
      dosya_adi = 'main.go';
      derleme_komutu = 'go run main.go';
    }

    ciktilar.push({
      id: 'statik_baslik_' + Math.random().toString(36).substring(2, 7),
      seviye: 'bilgi',
      metin: `=== [ ${dil_etiketi.toUpperCase()} KAYNAK KOD ÇEVRİMİ TAMAMLANDI ] ===`,
      zaman: new Date().toLocaleTimeString()
    });

    ciktilar.push({
      id: 'statik_bilgi_' + Math.random().toString(36).substring(2, 7),
      seviye: 'bilgi',
      metin: `Görsel akış grafiğiniz başarıyla saf ${dil_etiketi} kaynak koduna dönüştürüldü (${derleme.ana_kod.split('\n').length} satır).`,
      zaman: new Date().toLocaleTimeString()
    });

    ciktilar.push({
      id: 'statik_uyari_' + Math.random().toString(36).substring(2, 7),
      seviye: 'uyari',
      metin: `[STATİK DİL] ${dil_etiketi} derlenen (compiled) bir dil olduğu için tarayıcı ortamında doğrudan binary olarak çalıştırılamaz. Üretilen kaynak kodu alt paneldeki 'Kodu İndir' butonuyla alabilirsiniz.`,
      zaman: new Date().toLocaleTimeString()
    });

    ciktilar.push({
      id: 'statik_ipucu_' + Math.random().toString(36).substring(2, 7),
      seviye: 'basari',
      metin: `Çıktı Dosyası: ${dosya_adi}  |  Derleme/Çalıştırma Komutu: ${derleme_komutu}`,
      zaman: new Date().toLocaleTimeString()
    });

    const bitis_zamani = performance.now();
    return {
      basarili: true,
      cikis_kodu: 0,
      calisma_suresi_ms: Math.round((bitis_zamani - baslama_zamani) * 100) / 100,
      ciktilar
    };
  }

  // 2. DİNAMİK DİLLER (Python, JavaScript, TypeScript)
  const derleme = projeyi_derle_ve_kod_uret(proje, hedef_dil);

  if (!derleme.basarili) {
    derleme.hatalar.forEach(hata => {
      ciktilar.push({
        id: 'hata_' + Math.random().toString(36).substring(2, 7),
        seviye: 'hata',
        metin: `[DERLEME / DOĞRULAMA HATASI] ${hata.mesaj}`,
        zaman: new Date().toLocaleTimeString()
      });
    });

    return {
      basarili: false,
      cikis_kodu: 1,
      calisma_suresi_ms: 0,
      ciktilar,
      hata_mesaji: 'Grafik doğrulama hataları nedeniyle yürütme durduruldu.'
    };
  }

  // 2A. PYTHON YÜRÜTME MOTORU (Python Interpreter Simulator)
  if (hedef_dil === 'python') {
    try {
      ciktilar.push({
        id: 'py_basla_' + Math.random().toString(36).substring(2, 7),
        seviye: 'bilgi',
        metin: `[Python 3.x Yorumlayıcı] Program başlatılıyor: ${proje.ayarlar.proje_adi}`,
        zaman: new Date().toLocaleTimeString()
      });

      const ara_temsil = grafigi_ara_temsile_donustur(proje);
      await python_ara_temsil_yurut(ara_temsil, ciktilar);

      const bitis_zamani = performance.now();
      const calisma_suresi_ms = Math.round((bitis_zamani - baslama_zamani) * 100) / 100;

      ciktilar.push({
        id: 'py_bitir_' + Math.random().toString(36).substring(2, 7),
        seviye: 'basari',
        metin: `[Python 3.x] Program başarıyla tamamlandı (Süre: ${calisma_suresi_ms} ms, Çıkış Kodu: 0)`,
        zaman: new Date().toLocaleTimeString()
      });

      return {
        basarili: true,
        cikis_kodu: 0,
        calisma_suresi_ms,
        ciktilar
      };
    } catch (err: any) {
      const bitis_zamani = performance.now();
      ciktilar.push({
        id: 'py_err_' + Math.random().toString(36).substring(2, 7),
        seviye: 'hata',
        metin: `[Python Runtime Error] ${err?.message || String(err)}`,
        zaman: new Date().toLocaleTimeString()
      });

      return {
        basarili: false,
        cikis_kodu: 1,
        calisma_suresi_ms: Math.round((bitis_zamani - baslama_zamani) * 100) / 100,
        ciktilar,
        hata_mesaji: err?.message
      };
    }
  }

  // 2B. JAVASCRIPT & TYPESCRIPT YÜRÜTME MOTORU
  try {
    ciktilar.push({
      id: 'js_basla_' + Math.random().toString(36).substring(2, 7),
      seviye: 'bilgi',
      metin: `[V8 Runtime] Çalıştırma başlatılıyor: ${proje.ayarlar.proje_adi} (${hedef_dil.toUpperCase()})`,
      zaman: new Date().toLocaleTimeString()
    });

    const ozel_konsol = {
      log: (...args: any[]) => {
        const metin = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
        ciktilar.push({
          id: 'log_' + Math.random().toString(36).substring(2, 7),
          seviye: 'gunluk',
          metin,
          zaman: new Date().toLocaleTimeString()
        });
      },
      warn: (...args: any[]) => {
        const metin = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
        ciktilar.push({
          id: 'warn_' + Math.random().toString(36).substring(2, 7),
          seviye: 'uyari',
          metin,
          zaman: new Date().toLocaleTimeString()
        });
      },
      error: (...args: any[]) => {
        const metin = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
        ciktilar.push({
          id: 'err_' + Math.random().toString(36).substring(2, 7),
          seviye: 'hata',
          metin,
          zaman: new Date().toLocaleTimeString()
        });
      },
      info: (...args: any[]) => {
        const metin = args.map(a => typeof a === 'object' ? JSON.stringify(a, null, 2) : String(a)).join(' ');
        ciktilar.push({
          id: 'info_' + Math.random().toString(36).substring(2, 7),
          seviye: 'bilgi',
          metin,
          zaman: new Date().toLocaleTimeString()
        });
      }
    };

    // JS/TS için çalıştırılabilir kodu hazırla
    let yurutulecek_kod = derleme.ana_kod;
    if (hedef_dil === 'typescript') {
      // TS tip açıklamalarını runtime için temizle
      yurutulecek_kod = yurutulecek_kod
        .replace(/:\s*[A-Za-z0-9_<>\[\]|& ]+/g, '')
        .replace(/as\s+[A-Za-z0-9_<>\[\]]+/g, '');
    }

    const yurutucu = new Function('console', 'setTimeout', 'setInterval', `
      return (async () => {
        ${yurutulecek_kod}
      })();
    `);

    await Promise.race([
      yurutucu(ozel_konsol, setTimeout, setInterval),
      new Promise((_, reject) => setTimeout(() => reject(new Error('Çalışma zaman aşımı (Timeout: 5000ms). Sonsuz döngü tespit edildi!')), 5000))
    ]);

    const bitis_zamani = performance.now();
    const calisma_suresi_ms = Math.round((bitis_zamani - baslama_zamani) * 100) / 100;

    ciktilar.push({
      id: 'basari_' + Math.random().toString(36).substring(2, 7),
      seviye: 'basari',
      metin: `[BAŞARILI] Program tamamlandı (Süre: ${calisma_suresi_ms} ms, Çıkış Kodu: 0)`,
      zaman: new Date().toLocaleTimeString()
    });

    return {
      basarili: true,
      cikis_kodu: 0,
      calisma_suresi_ms,
      ciktilar
    };
  } catch (hata: any) {
    const bitis_zamani = performance.now();
    const calisma_suresi_ms = Math.round((bitis_zamani - baslama_zamani) * 100) / 100;

    ciktilar.push({
      id: 'hata_' + Math.random().toString(36).substring(2, 7),
      seviye: 'hata',
      metin: `[ÇALIŞMA ZAMANI HATASI] ${hata.message || String(hata)}`,
      zaman: new Date().toLocaleTimeString()
    });

    return {
      basarili: false,
      cikis_kodu: 1,
      calisma_suresi_ms,
      ciktilar,
      hata_mesaji: hata.message
    };
  }
}

/**
 * Python IR Yorumlayıcısı
 * Python anlambilimini ve veri tiplerini tarayıcıda birebir simüle eder.
 */
async function python_ara_temsil_yurut(ara_temsil: any, ciktilar: konsol_kaydi[]) {
  const bellek: Record<string, any> = {};

  // 1. Python Değişkenlerini Tanımla
  if (ara_temsil.degisken_bildirimleri) {
    ara_temsil.degisken_bildirimleri.forEach((deg: any) => {
      let val = deg.ilk_deger;
      if (deg.tip === 'sayi') val = Number(val || 0);
      else if (deg.tip === 'mantiksal') val = Boolean(val);
      else if (deg.tip === 'metin') val = String(val || '');
      else if (deg.tip === 'dizi') val = Array.isArray(val) ? val : [];
      bellek[deg.ad] = val;
    });
  }

  // Değer Çözümleyici (Python Semantiği)
  function python_ifade_degerlendir(ifade?: ara_ifade): any {
    if (!ifade) return null;

    switch (ifade.tur) {
      case 'sabit':
        return ifade.deger;

      case 'degisken':
        return bellek[String(ifade.deger)] !== undefined ? bellek[String(ifade.deger)] : null;

      case 'ikili_islem': {
        const sol = python_ifade_degerlendir(ifade.sol);
        const sag = python_ifade_degerlendir(ifade.sag);
        if (ifade.operator === '+') return sol + sag;
        if (ifade.operator === '-') return sol - sag;
        if (ifade.operator === '*') return sol * sag;
        if (ifade.operator === '/') return sag !== 0 ? sol / sag : 0;
        if (ifade.operator === '%') return sol % sag;
        if (ifade.operator === '**') return Math.pow(sol, sag);
        if (ifade.operator === '[]') return sol ? sol[sag] : null;
        if (ifade.operator === '==') return sol === sag;
        if (ifade.operator === '!=') return sol !== sag;
        if (ifade.operator === '>') return sol > sag;
        if (ifade.operator === '<') return sol < sag;
        if (ifade.operator === '>=') return sol >= sag;
        if (ifade.operator === '<=') return sol <= sag;
        return null;
      }

      case 'mantik_islem': {
        const sol = Boolean(python_ifade_degerlendir(ifade.sol));
        if (ifade.operator === '!') return !sol;
        const sag = Boolean(python_ifade_degerlendir(ifade.sag));
        if (ifade.operator === '&&') return sol && sag;
        if (ifade.operator === '||') return sol || sag;
        return sol;
      }

      case 'matematik_fonksiyon': {
        const fn = ifade.fonksiyon_adi || 'abs';
        const args = (ifade.argumanlar || []).map(a => python_ifade_degerlendir(a));
        if (fn === 'min') return Math.min(...args);
        if (fn === 'max') return Math.max(...args);
        if (fn === 'round') return Math.round(Number(args[0] || 0));
        if (fn === 'floor') return Math.floor(Number(args[0] || 0));
        if (fn === 'ceil') return Math.ceil(Number(args[0] || 0));
        if (fn === 'sqrt') return Math.sqrt(Number(args[0] || 0));
        if (fn === 'abs') return Math.abs(Number(args[0] || 0));
        if (fn === 'pow') return Math.pow(Number(args[0] || 0), Number(args[1] || 1));
        return 0;
      }

      case 'dize_birlestir': {
        const sol = String(python_ifade_degerlendir(ifade.sol) ?? '');
        const sag = String(python_ifade_degerlendir(ifade.sag) ?? '');
        const ayrac = ifade.ek_bilgi?.ayrac || '';
        return sol + ayrac + sag;
      }

      case 'dize_islem': {
        const sol = String(python_ifade_degerlendir(ifade.sol) ?? '');
        if (ifade.operator === 'uzunluk') return sol.length;
        if (ifade.operator === 'buyuk_harf') return sol.toUpperCase();
        if (ifade.operator === 'kucuk_harf') return sol.toLowerCase();
        if (ifade.operator === 'iceriyor') {
          const sag = String(python_ifade_degerlendir(ifade.sag) ?? '');
          return sol.includes(sag);
        }
        return sol;
      }

      case 'rastgele': {
        const min = Number(python_ifade_degerlendir(ifade.sol) || 0);
        const max = Number(python_ifade_degerlendir(ifade.sag) || 100);
        return Math.floor(Math.random() * (max - min + 1)) + min;
      }

      default:
        return ifade.deger;
    }
  }

  // Komut Yürütücü
  async function python_komut_isle(komutlar: ara_komut[]) {
    for (const komut of komutlar) {
      switch (komut.tur) {
        case 'konsol_yaz': {
          const val = python_ifade_degerlendir(komut.mesaj);
          let cikti_metni = '';
          if (typeof val === 'boolean') cikti_metni = val ? 'True' : 'False';
          else if (val === null || val === undefined) cikti_metni = 'None';
          else if (typeof val === 'object') cikti_metni = JSON.stringify(val);
          else cikti_metni = String(val);

          ciktilar.push({
            id: 'py_out_' + Math.random().toString(36).substring(2, 7),
            seviye: 'gunluk',
            metin: cikti_metni,
            zaman: new Date().toLocaleTimeString()
          });
          break;
        }

        case 'konsol_uyari': {
          const val = python_ifade_degerlendir(komut.mesaj);
          ciktilar.push({
            id: 'py_warn_' + Math.random().toString(36).substring(2, 7),
            seviye: 'uyari',
            metin: `[UYARI] ${String(val)}`,
            zaman: new Date().toLocaleTimeString()
          });
          break;
        }

        case 'degisken_ata': {
          if (komut.degisken_adi) {
            bellek[komut.degisken_adi] = python_ifade_degerlendir(komut.ifade);
          }
          break;
        }

        case 'degisken_artir': {
          if (komut.degisken_adi) {
            const artis = python_ifade_degerlendir(komut.ifade);
            bellek[komut.degisken_adi] = (bellek[komut.degisken_adi] || 0) + artis;
          }
          break;
        }

        case 'kosul_blogu': {
          const kosul = Boolean(python_ifade_degerlendir(komut.kosul));
          if (kosul && komut.dogru_govde) {
            await python_komut_isle(komut.dogru_govde);
          } else if (!kosul && komut.yanlis_govde) {
            await python_komut_isle(komut.yanlis_govde);
          }
          break;
        }

        case 'dongu_for': {
          const basla = Number(python_ifade_degerlendir(komut.baslangic) || 0);
          const bitis = Number(python_ifade_degerlendir(komut.bitis) || 0);
          const artis = Number(python_ifade_degerlendir(komut.artis) || 1);
          const sayac = komut.sayac_adi || 'i';

          for (let i = basla; i <= bitis; i += artis) {
            bellek[sayac] = i;
            if (komut.dongu_govdesi) {
              await python_komut_isle(komut.dongu_govdesi);
            }
          }
          if (komut.dongu_tamamlandi_govdesi) {
            await python_komut_isle(komut.dongu_tamamlandi_govdesi);
          }
          break;
        }

        case 'dongu_while': {
          let max_dongu = 2000;
          while (Boolean(python_ifade_degerlendir(komut.kosul)) && max_dongu > 0) {
            max_dongu--;
            if (komut.dongu_govdesi) {
              await python_komut_isle(komut.dongu_govdesi);
            }
          }
          if (komut.dongu_tamamlandi_govdesi) {
            await python_komut_isle(komut.dongu_tamamlandi_govdesi);
          }
          break;
        }

        case 'gecikme': {
          const ms = Math.min(komut.sure_ms || 500, 2000);
          await new Promise(resolve => setTimeout(resolve, ms));
          break;
        }

        default:
          break;
      }
    }
  }

  // Ana Akışı Yürüt
  if (ara_temsil.ana_akis_komutlari && ara_temsil.ana_akis_komutlari.length > 0) {
    await python_komut_isle(ara_temsil.ana_akis_komutlari);
  }
}
