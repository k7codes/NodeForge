/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~ 
 * JavaScript Kod Uretici (ES6+)
 */

import { ara_proje_temsili, ara_komut, ara_ifade } from './ara_temsil';

export function javascript_kodu_uret(ara_temsil: ara_proje_temsili): string {
  const satirlar: string[] = [];

  satirlar.push('/**');
  satirlar.push(` * NODEFORGE Visual Programming Studio`);
  satirlar.push(` * Proje: ${ara_temsil.proje_adi}`);
  satirlar.push(` * Hedef Dil: JavaScript (ES6+)`);
  satirlar.push(` * Developed By K7~`);
  satirlar.push(` * Üretim Zamanı: ${new Date().toLocaleString()}`);
  satirlar.push(' */');
  satirlar.push('');

  // 1. Değişken Tanımlamaları
  if (ara_temsil.degisken_bildirimleri.length > 0) {
    satirlar.push('// ==================== DEĞİŞKENLER ====================');
    ara_temsil.degisken_bildirimleri.forEach(deg => {
      const deger_metni = JSON.stringify(deg.ilk_deger !== undefined ? deg.ilk_deger : null);
      satirlar.push(`let ${deg.ad} = ${deger_metni};${deg.aciklama ? ` // ${deg.aciklama}` : ''}`);
    });
    satirlar.push('');
  }

  // 2. Fonksiyon Tanımlamaları
  if (ara_temsil.fonksiyon_bildirimleri.length > 0) {
    satirlar.push('// ==================== FONKSİYONLAR ====================');
    ara_temsil.fonksiyon_bildirimleri.forEach(fn => {
      const params = fn.parametreler?.map(p => p.ad).join(', ') || '';
      satirlar.push(`function ${fn.fonksiyon_adi}(${params}) {`);
      const govde_satirlari = komutlari_isle(fn.fonksiyon_govdesi || [], 1);
      govde_satirlari.forEach(s => satirlar.push(s));
      satirlar.push('}');
      satirlar.push('');
    });
  }

  // 3. Ana Yürütme Fonksiyonu
  satirlar.push('// ==================== ANA PROGRAM AKIŞI ====================');
  satirlar.push('async function main() {');
  satirlar.push('  console.log("[NODEFORGE] Program başlatıldı (JavaScript).");');
  
  if (ara_temsil.ana_akis_komutlari.length > 0) {
    const ana_satirlar = komutlari_isle(ara_temsil.ana_akis_komutlari, 1);
    ana_satirlar.forEach(s => satirlar.push(s));
  } else {
    satirlar.push('  // Başlangıç düğümüne bağlı herhangi bir akış bulunamadı.');
  }

  satirlar.push('  console.log("[NODEFORGE] Program tamamlandı.");');
  satirlar.push('}');
  satirlar.push('');
  satirlar.push('// Programı çalıştır');
  satirlar.push('main();');

  return satirlar.join('\n');
}

function ifadeyi_metne_cevir(ifade?: ara_ifade): string {
  if (!ifade) return 'null';

  switch (ifade.tur) {
    case 'sabit':
      if (typeof ifade.deger === 'string') {
        return `"${ifade.deger.replace(/"/g, '\\"')}"`;
      }
      return String(ifade.deger);

    case 'degisken':
      return String(ifade.deger);

    case 'ikili_islem': {
      const sol = ifadeyi_metne_cevir(ifade.sol);
      const sag = ifadeyi_metne_cevir(ifade.sag);
      if (ifade.operator === '[]') {
        return `${sol}[${sag}]`;
      }
      if (ifade.operator === '**') {
        return `Math.pow(${sol}, ${sag})`;
      }
      return `(${sol} ${ifade.operator} ${sag})`;
    }

    case 'mantik_islem': {
      if (ifade.operator === '!') {
        return `!(${ifadeyi_metne_cevir(ifade.sol)})`;
      }
      const sol = ifadeyi_metne_cevir(ifade.sol);
      const sag = ifadeyi_metne_cevir(ifade.sag);
      return `(${sol} ${ifade.operator} ${sag})`;
    }

    case 'matematik_fonksiyon': {
      const fn = ifade.fonksiyon_adi || 'abs';
      const args = ifade.argumanlar?.map(a => ifadeyi_metne_cevir(a)) || [];
      if (fn === 'min') return `Math.min(${args.join(', ')})`;
      if (fn === 'max') return `Math.max(${args.join(', ')})`;
      if (fn === 'round') return `Math.round(${args[0] || '0'})`;
      if (fn === 'floor') return `Math.floor(${args[0] || '0'})`;
      if (fn === 'ceil') return `Math.ceil(${args[0] || '0'})`;
      if (fn === 'sqrt') return `Math.sqrt(${args[0] || '0'})`;
      if (fn === 'abs') return `Math.abs(${args[0] || '0'})`;
      if (fn === 'pow') return `Math.pow(${args[0] || '0'}, ${args[1] || '1'})`;
      return `Math.${fn}(${args.join(', ')})`;
    }

    case 'dize_birlestir': {
      const sol = ifadeyi_metne_cevir(ifade.sol);
      const sag = ifadeyi_metne_cevir(ifade.sag);
      const ayrac = ifade.ek_bilgi?.ayrac ? `"${ifade.ek_bilgi.ayrac}"` : '""';
      return `String(${sol}) + ${ayrac} + String(${sag})`;
    }

    case 'dize_islem': {
      const sol = ifadeyi_metne_cevir(ifade.sol);
      if (ifade.operator === 'uzunluk') return `String(${sol}).length`;
      if (ifade.operator === 'buyuk_harf') return `String(${sol}).toUpperCase()`;
      if (ifade.operator === 'kucuk_harf') return `String(${sol}).toLowerCase()`;
      if (ifade.operator === 'iceriyor') {
        const sag = ifadeyi_metne_cevir(ifade.sag);
        return `String(${sol}).includes(${sag})`;
      }
      return `String(${sol})`;
    }

    case 'rastgele': {
      const min = ifadeyi_metne_cevir(ifade.sol);
      const max = ifadeyi_metne_cevir(ifade.sag);
      return `Math.floor(Math.random() * (${max} - ${min} + 1)) + ${min}`;
    }

    case 'fonksiyon_cagrisi': {
      const args = ifade.argumanlar?.map(a => ifadeyi_metne_cevir(a)).join(', ') || '';
      return `${ifade.deger}(${args})`;
    }

    default:
      return String(ifade.deger ?? 'null');
  }
}

function komutlari_isle(komutlar: ara_komut[], girinti_seviyesi: number): string[] {
  const sonuc: string[] = [];
  const girinti = '  '.repeat(girinti_seviyesi);

  komutlar.forEach(komut => {
    switch (komut.tur) {
      case 'konsol_yaz': {
        const ifade_str = ifadeyi_metne_cevir(komut.mesaj);
        sonuc.push(`${girinti}console.log(${ifade_str});`);
        break;
      }

      case 'konsol_uyari': {
        const ifade_str = ifadeyi_metne_cevir(komut.mesaj);
        sonuc.push(`${girinti}console.warn(${ifade_str});`);
        break;
      }

      case 'degisken_ata': {
        const ifade_str = ifadeyi_metne_cevir(komut.ifade);
        sonuc.push(`${girinti}${komut.degisken_adi} = ${ifade_str};`);
        break;
      }

      case 'degisken_artir': {
        const ifade_str = ifadeyi_metne_cevir(komut.ifade);
        sonuc.push(`${girinti}${komut.degisken_adi} += ${ifade_str};`);
        break;
      }

      case 'kosul_blogu': {
        const kosul_str = ifadeyi_metne_cevir(komut.kosul);
        sonuc.push(`${girinti}if (${kosul_str}) {`);
        if (komut.dogru_govde && komut.dogru_govde.length > 0) {
          const dogru_satirlar = komutlari_isle(komut.dogru_govde, girinti_seviyesi + 1);
          dogru_satirlar.forEach(s => sonuc.push(s));
        }

        if (komut.yanlis_govde && komut.yanlis_govde.length > 0) {
          sonuc.push(`${girinti}} else {`);
          const yanlis_satirlar = komutlari_isle(komut.yanlis_govde, girinti_seviyesi + 1);
          yanlis_satirlar.forEach(s => sonuc.push(s));
        }
        sonuc.push(`${girinti}}`);
        break;
      }

      case 'dongu_for': {
        const basla = ifadeyi_metne_cevir(komut.baslangic);
        const bitir = ifadeyi_metne_cevir(komut.bitis);
        const artis = ifadeyi_metne_cevir(komut.artis);
        const sayac = komut.sayac_adi || 'i';

        sonuc.push(`${girinti}for (let ${sayac} = ${basla}; ${sayac} <= ${bitir}; ${sayac} += ${artis}) {`);
        if (komut.dongu_govdesi && komut.dongu_govdesi.length > 0) {
          const govde_satirlar = komutlari_isle(komut.dongu_govdesi, girinti_seviyesi + 1);
          govde_satirlar.forEach(s => sonuc.push(s));
        }
        sonuc.push(`${girinti}}`);

        if (komut.dongu_tamamlandi_govdesi && komut.dongu_tamamlandi_govdesi.length > 0) {
          const tamamlama_satirlar = komutlari_isle(komut.dongu_tamamlandi_govdesi, girinti_seviyesi);
          tamamlama_satirlar.forEach(s => sonuc.push(s));
        }
        break;
      }

      case 'dongu_while': {
        const kosul_str = ifadeyi_metne_cevir(komut.kosul);
        sonuc.push(`${girinti}while (${kosul_str}) {`);
        if (komut.dongu_govdesi && komut.dongu_govdesi.length > 0) {
          const govde_satirlar = komutlari_isle(komut.dongu_govdesi, girinti_seviyesi + 1);
          govde_satirlar.forEach(s => sonuc.push(s));
        }
        sonuc.push(`${girinti}}`);
        if (komut.dongu_tamamlandi_govdesi && komut.dongu_tamamlandi_govdesi.length > 0) {
          const tamamlama_satirlar = komutlari_isle(komut.dongu_tamamlandi_govdesi, girinti_seviyesi);
          tamamlama_satirlar.forEach(s => sonuc.push(s));
        }
        break;
      }

      case 'gecikme': {
        sonuc.push(`${girinti}await new Promise(r => setTimeout(r, ${komut.sure_ms || 1000}));`);
        break;
      }

      case 'fonksiyon_cagir': {
        sonuc.push(`${girinti}${komut.fonksiyon_adi}();`);
        break;
      }

      case 'fonksiyon_donusu': {
        const ifade_str = ifadeyi_metne_cevir(komut.ifade);
        sonuc.push(`${girinti}return ${ifade_str};`);
        break;
      }

      default:
        break;
    }
  });

  return sonuc;
}
