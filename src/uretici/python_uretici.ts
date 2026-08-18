/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~ 
 * Python Kod Uretici (Python 3.x Standartları)
 */

import { ara_proje_temsili, ara_komut, ara_ifade } from './ara_temsil';

export function python_kodu_uret(ara_temsil: ara_proje_temsili): string {
  const satirlar: string[] = [];

  satirlar.push('"""');
  satirlar.push(`NODEFORGE Visual Programming Studio`);
  satirlar.push(`Proje: ${ara_temsil.proje_adi}`);
  satirlar.push(`Hedef Dil: Python 3.x`);
  satirlar.push(`Developed By K7~`);
  satirlar.push(`Üretim Zamanı: ${new Date().toLocaleString()}`);
  satirlar.push('"""');
  satirlar.push('');
  satirlar.push('import math');
  satirlar.push('import random');
  satirlar.push('import time');
  satirlar.push('import json');
  satirlar.push('');

  // 1. Değişken Tanımlamaları
  if (ara_temsil.degisken_bildirimleri.length > 0) {
    satirlar.push('# ==================== DEĞİŞKENLER ====================');
    ara_temsil.degisken_bildirimleri.forEach(deg => {
      let deger_metni = 'None';
      if (typeof deg.ilk_deger === 'boolean') {
        deger_metni = deg.ilk_deger ? 'True' : 'False';
      } else if (typeof deg.ilk_deger === 'string') {
        deger_metni = JSON.stringify(deg.ilk_deger);
      } else if (deg.ilk_deger !== undefined && deg.ilk_deger !== null) {
        deger_metni = JSON.stringify(deg.ilk_deger);
      }
      satirlar.push(`${deg.ad} = ${deger_metni}${deg.aciklama ? `  # ${deg.aciklama}` : ''}`);
    });
    satirlar.push('');
  }

  // 2. Fonksiyon Tanımlamaları
  if (ara_temsil.fonksiyon_bildirimleri.length > 0) {
    satirlar.push('# ==================== FONKSİYONLAR ====================');
    ara_temsil.fonksiyon_bildirimleri.forEach(fn => {
      const params = fn.parametreler?.map(p => p.ad).join(', ') || '';
      satirlar.push(`def ${fn.fonksiyon_adi}(${params}):`);
      const govde_satirlari = komutlari_isle(fn.fonksiyon_govdesi || [], 1);
      if (govde_satirlari.length === 0) {
        satirlar.push('    pass');
      } else {
        govde_satirlari.forEach(s => satirlar.push(s));
      }
      satirlar.push('');
    });
  }

  // 3. Ana Program Fonksiyonu
  satirlar.push('# ==================== ANA PROGRAM AKIŞI ====================');
  satirlar.push('def main():');
  satirlar.push('    print("[NODEFORGE] Program başlatıldı (Python 3).")');
  
  if (ara_temsil.degisken_bildirimleri.length > 0) {
    const global_vars = ara_temsil.degisken_bildirimleri.map(d => d.ad).join(', ');
    satirlar.push(`    global ${global_vars}`);
  }

  if (ara_temsil.ana_akis_komutlari.length > 0) {
    const ana_satirlar = komutlari_isle(ara_temsil.ana_akis_komutlari, 1);
    ana_satirlar.forEach(s => satirlar.push(s));
  } else {
    satirlar.push('    # Başlangıç düğümüne bağlı akış yok');
    satirlar.push('    pass');
  }

  satirlar.push('    print("[NODEFORGE] Program tamamlandı.")');
  satirlar.push('');
  satirlar.push('if __name__ == "__main__":');
  satirlar.push('    main()');

  return satirlar.join('\n');
}

function ifadeyi_metne_cevir(ifade?: ara_ifade): string {
  if (!ifade) return 'None';

  switch (ifade.tur) {
    case 'sabit':
      if (typeof ifade.deger === 'boolean') {
        return ifade.deger ? 'True' : 'False';
      }
      if (typeof ifade.deger === 'string') {
        return JSON.stringify(ifade.deger);
      }
      if (ifade.deger === null || ifade.deger === undefined) {
        return 'None';
      }
      return String(ifade.deger);

    case 'degisken':
      return String(ifade.deger);

    case 'ikili_islem': {
      const sol = ifadeyi_metne_cevir(ifade.sol);
      const sag = ifadeyi_metne_cevir(ifade.sag);
      if (ifade.operator === '[]') {
        return `${sol}[int(${sag})]`;
      }
      if (ifade.operator === '**') {
        return `(${sol} ** ${sag})`;
      }
      return `(${sol} ${ifade.operator} ${sag})`;
    }

    case 'mantik_islem': {
      if (ifade.operator === '!') {
        return `not (${ifadeyi_metne_cevir(ifade.sol)})`;
      }
      const op = ifade.operator === '&&' ? 'and' : 'or';
      const sol = ifadeyi_metne_cevir(ifade.sol);
      const sag = ifadeyi_metne_cevir(ifade.sag);
      return `(${sol} ${op} ${sag})`;
    }

    case 'matematik_fonksiyon': {
      const fn = ifade.fonksiyon_adi || 'abs';
      const args = ifade.argumanlar?.map(a => ifadeyi_metne_cevir(a)) || [];
      if (fn === 'min') return `min(${args.join(', ')})`;
      if (fn === 'max') return `max(${args.join(', ')})`;
      if (fn === 'round') return `round(${args[0] || '0'})`;
      if (fn === 'floor') return `math.floor(${args[0] || '0'})`;
      if (fn === 'ceil') return `math.ceil(${args[0] || '0'})`;
      if (fn === 'sqrt') return `math.sqrt(${args[0] || '0'})`;
      if (fn === 'abs') return `abs(${args[0] || '0'})`;
      if (fn === 'pow') return `pow(${args[0] || '0'}, ${args[1] || '1'})`;
      return `math.${fn}(${args.join(', ')})`;
    }

    case 'dize_birlestir': {
      const sol = ifadeyi_metne_cevir(ifade.sol);
      const sag = ifadeyi_metne_cevir(ifade.sag);
      const ayrac = ifade.ek_bilgi?.ayrac || '';
      return `(str(${sol}) + "${ayrac}" + str(${sag}))`;
    }

    case 'dize_islem': {
      const sol = ifadeyi_metne_cevir(ifade.sol);
      if (ifade.operator === 'uzunluk') return `len(str(${sol}))`;
      if (ifade.operator === 'buyuk_harf') return `str(${sol}).upper()`;
      if (ifade.operator === 'kucuk_harf') return `str(${sol}).lower()`;
      if (ifade.operator === 'iceriyor') {
        const sag = ifadeyi_metne_cevir(ifade.sag);
        return `(str(${sag}) in str(${sol}))`;
      }
      return `str(${sol})`;
    }

    case 'rastgele': {
      const min = ifadeyi_metne_cevir(ifade.sol);
      const max = ifadeyi_metne_cevir(ifade.sag);
      return `random.randint(int(${min}), int(${max}))`;
    }

    case 'fonksiyon_cagrisi': {
      const args = ifade.argumanlar?.map(a => ifadeyi_metne_cevir(a)).join(', ') || '';
      let fn_adi = String(ifade.deger);
      if (fn_adi === 'Math.min') fn_adi = 'min';
      if (fn_adi === 'Math.max') fn_adi = 'max';
      if (fn_adi === 'Math.abs') fn_adi = 'abs';
      if (fn_adi === 'Math.round') fn_adi = 'round';
      if (fn_adi === 'Math.floor') fn_adi = 'math.floor';
      if (fn_adi === 'Math.ceil') fn_adi = 'math.ceil';
      if (fn_adi === 'Math.sqrt') fn_adi = 'math.sqrt';
      return `${fn_adi}(${args})`;
    }

    default:
      return String(ifade.deger ?? 'None');
  }
}

function komutlari_isle(komutlar: ara_komut[], girinti_seviyesi: number): string[] {
  const sonuc: string[] = [];
  const girinti = '    '.repeat(girinti_seviyesi);

  komutlar.forEach(komut => {
    switch (komut.tur) {
      case 'konsol_yaz': {
        const ifade_str = ifadeyi_metne_cevir(komut.mesaj);
        sonuc.push(`${girinti}print(${ifade_str})`);
        break;
      }

      case 'konsol_uyari': {
        const ifade_str = ifadeyi_metne_cevir(komut.mesaj);
        sonuc.push(`${girinti}print(f"[UYARI] {${ifade_str}}")`);
        break;
      }

      case 'degisken_ata': {
        const ifade_str = ifadeyi_metne_cevir(komut.ifade);
        sonuc.push(`${girinti}${komut.degisken_adi} = ${ifade_str}`);
        break;
      }

      case 'degisken_artir': {
        const ifade_str = ifadeyi_metne_cevir(komut.ifade);
        sonuc.push(`${girinti}${komut.degisken_adi} += ${ifade_str}`);
        break;
      }

      case 'kosul_blogu': {
        const kosul_str = ifadeyi_metne_cevir(komut.kosul);
        sonuc.push(`${girinti}if ${kosul_str}:`);
        if (komut.dogru_govde && komut.dogru_govde.length > 0) {
          const dogru_satirlar = komutlari_isle(komut.dogru_govde, girinti_seviyesi + 1);
          dogru_satirlar.forEach(s => sonuc.push(s));
        } else {
          sonuc.push(`${girinti}    pass`);
        }

        if (komut.yanlis_govde && komut.yanlis_govde.length > 0) {
          sonuc.push(`${girinti}else:`);
          const yanlis_satirlar = komutlari_isle(komut.yanlis_govde, girinti_seviyesi + 1);
          yanlis_satirlar.forEach(s => sonuc.push(s));
        }
        break;
      }

      case 'dongu_for': {
        const basla = ifadeyi_metne_cevir(komut.baslangic);
        const bitir = ifadeyi_metne_cevir(komut.bitis);
        const artis = ifadeyi_metne_cevir(komut.artis);
        const sayac = komut.sayac_adi || 'i';

        sonuc.push(`${girinti}for ${sayac} in range(int(${basla}), int(${bitir}) + 1, int(${artis})):`);
        if (komut.dongu_govdesi && komut.dongu_govdesi.length > 0) {
          const govde_satirlar = komutlari_isle(komut.dongu_govdesi, girinti_seviyesi + 1);
          govde_satirlar.forEach(s => sonuc.push(s));
        } else {
          sonuc.push(`${girinti}    pass`);
        }

        if (komut.dongu_tamamlandi_govdesi && komut.dongu_tamamlandi_govdesi.length > 0) {
          const tamamlama_satirlar = komutlari_isle(komut.dongu_tamamlandi_govdesi, girinti_seviyesi);
          tamamlama_satirlar.forEach(s => sonuc.push(s));
        }
        break;
      }

      case 'dongu_while': {
        const kosul_str = ifadeyi_metne_cevir(komut.kosul);
        sonuc.push(`${girinti}while ${kosul_str}:`);
        if (komut.dongu_govdesi && komut.dongu_govdesi.length > 0) {
          const govde_satirlar = komutlari_isle(komut.dongu_govdesi, girinti_seviyesi + 1);
          govde_satirlar.forEach(s => sonuc.push(s));
        } else {
          sonuc.push(`${girinti}    pass`);
        }
        if (komut.dongu_tamamlandi_govdesi && komut.dongu_tamamlandi_govdesi.length > 0) {
          const tamamlama_satirlar = komutlari_isle(komut.dongu_tamamlandi_govdesi, girinti_seviyesi);
          tamamlama_satirlar.forEach(s => sonuc.push(s));
        }
        break;
      }

      case 'gecikme': {
        const saniye = (komut.sure_ms || 1000) / 1000;
        sonuc.push(`${girinti}time.sleep(${saniye})`);
        break;
      }

      case 'fonksiyon_cagir': {
        sonuc.push(`${girinti}${komut.fonksiyon_adi}()`);
        break;
      }

      case 'fonksiyon_donusu': {
        const ifade_str = ifadeyi_metne_cevir(komut.ifade);
        sonuc.push(`${girinti}return ${ifade_str}`);
        break;
      }

      default:
        break;
    }
  });

  return sonuc;
}
