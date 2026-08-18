/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Alt Panel: Konsol (Terminal), Uretilen Kod, Sorunlar ve Derleme Ciktisi
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Terminal, 
  Code2, 
  AlertTriangle, 
  CheckCircle2, 
  Copy, 
  Download, 
  Trash2, 
  ChevronUp, 
  ChevronDown, 
  X, 
  Check,
  Cpu,
  AlertCircle
} from 'lucide-react';
import { konsol_kaydi, derleme_sonucu, dil_secenegi } from '../tipler/grafik_tipleri';
import { BilgiKutusu } from './bilgi_kutusu';

interface alt_panel_ozellikleri {
  acik: boolean;
  on_kapat: () => void;
  konsol_kayitlari: konsol_kaydi[];
  on_konsol_temizle: () => void;
  derleme_sonucu: derleme_sonucu | null;
  hedef_dil: dil_secenegi;
  on_dugum_odaklan?: (dugum_id: string) => void;
  dis_sekme?: 'konsol' | 'kod' | 'sorunlar' | 'derleme';
  on_sekme_degis?: (sekme: 'konsol' | 'kod' | 'sorunlar' | 'derleme') => void;
}

export const AltPanel: React.FC<alt_panel_ozellikleri> = ({
  acik,
  on_kapat,
  konsol_kayitlari,
  on_konsol_temizle,
  derleme_sonucu,
  hedef_dil,
  dis_sekme,
  on_sekme_degis
}) => {
  const [yerel_sekme, set_yerel_sekme] = useState<'konsol' | 'kod' | 'sorunlar' | 'derleme'>('konsol');
  const [tam_ekran, set_tam_ekran] = useState(false);
  const [kopyalandi, set_kopyalandi] = useState(false);
  const [secili_uretim_dosyasi, set_secili_uretim_dosyasi] = useState<string>('');
  const konsol_sonu_ref = useRef<HTMLDivElement>(null);

  const aktif_sekme = dis_sekme || yerel_sekme;
  const sekme_degistir = (yeni_sekme: 'konsol' | 'kod' | 'sorunlar' | 'derleme') => {
    set_yerel_sekme(yeni_sekme);
    if (on_sekme_degis) on_sekme_degis(yeni_sekme);
  };

  const uretilen_dosyalar = derleme_sonucu?.dosyalar || {};
  const dosya_yollari = Object.keys(uretilen_dosyalar);

  // Varsayılan üretilen dosya
  useEffect(() => {
    if (dosya_yollari.length > 0 && (!secili_uretim_dosyasi || !uretilen_dosyalar[secili_uretim_dosyasi])) {
      // Önce src/ ile başlayan ana dosyayı seç
      const ana = dosya_yollari.find(y => y.startsWith('src/')) || dosya_yollari[0];
      set_secili_uretim_dosyasi(ana);
    }
  }, [derleme_sonucu, secili_uretim_dosyasi, dosya_yollari]);

  // Otomatik konsol kaydırma
  useEffect(() => {
    if (aktif_sekme === 'konsol' && konsol_sonu_ref.current) {
      konsol_sonu_ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [konsol_kayitlari, aktif_sekme]);

  if (!acik) return null;

  const dogrulama = derleme_sonucu?.dogrulama;
  const hata_sayisi = dogrulama?.hatalar?.length || 0;
  const uyari_sayisi = dogrulama?.uyarilar?.length || 0;

  const gosterilen_kod = (secili_uretim_dosyasi && uretilen_dosyalar[secili_uretim_dosyasi]) 
    ? uretilen_dosyalar[secili_uretim_dosyasi]
    : (derleme_sonucu?.ana_kod || derleme_sonucu?.kod || '// Kod derleniyor...');

  const kod_satirlari = gosterilen_kod.split('\n');

  const kod_kopyala = () => {
    navigator.clipboard.writeText(gosterilen_kod);
    set_kopyalandi(true);
    setTimeout(() => set_kopyalandi(false), 2000);
  };

  const kod_indir = () => {
    let varsayilan_ad = 'main.ts';
    if (hedef_dil === 'cpp') varsayilan_ad = 'main.cpp';
    else if (hedef_dil === 'csharp') varsayilan_ad = 'Program.cs';
    else if (hedef_dil === 'python') varsayilan_ad = 'main.py';
    else if (hedef_dil === 'javascript') varsayilan_ad = 'main.js';
    else if (hedef_dil === 'rust') varsayilan_ad = 'main.rs';
    else if (hedef_dil === 'go') varsayilan_ad = 'main.go';

    const dosya_adi = secili_uretim_dosyasi ? secili_uretim_dosyasi.split('/').pop() : varsayilan_ad;
    const blob = new Blob([gosterilen_kod], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = dosya_adi || varsayilan_ad;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div 
      className={`bg-slate-950 border-t border-slate-800 flex flex-col z-30 transition-all select-none ${
        tam_ekran ? 'h-[65vh]' : 'h-64'
      }`}
    >
      {/* Üst Sekme Başlık Çubuğu */}
      <div className="h-9 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between px-3 text-xs">
        <div className="flex items-center gap-1">
          {/* Konsol / Terminal */}
          <button
            onClick={() => sekme_degistir('konsol')}
            className={`px-3 py-1.5 rounded-t flex items-center gap-1.5 font-medium transition-colors ${
              aktif_sekme === 'konsol'
                ? 'bg-slate-950 text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>Konsol & Yürütme</span>
            {konsol_kayitlari.length > 0 && (
              <span className="text-[10px] bg-slate-800 text-slate-400 px-1 rounded-full">
                {konsol_kayitlari.length}
              </span>
            )}
          </button>

          {/* Üretilen Kod */}
          <button
            onClick={() => sekme_degistir('kod')}
            className={`px-3 py-1.5 rounded-t flex items-center gap-1.5 font-medium transition-colors ${
              aktif_sekme === 'kod'
                ? 'bg-slate-950 text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Üretilen Kaynak Kod</span>
            <span className="text-[10px] bg-slate-800 text-cyan-300 font-mono px-1 rounded uppercase">
              {hedef_dil}
            </span>
          </button>

          {/* Sorunlar ve Uyarılar */}
          <button
            onClick={() => sekme_degistir('sorunlar')}
            className={`px-3 py-1.5 rounded-t flex items-center gap-1.5 font-medium transition-colors ${
              aktif_sekme === 'sorunlar'
                ? 'bg-slate-950 text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Sorunlar</span>
            {(hata_sayisi > 0 || uyari_sayisi > 0) && (
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold font-mono ${
                hata_sayisi > 0 ? 'bg-red-950 text-red-400 border border-red-800' : 'bg-amber-950 text-amber-400'
              }`}>
                {hata_sayisi} hata, {uyari_sayisi} uyarı
              </span>
            )}
          </button>

          {/* Derleme İstatistikleri */}
          <button
            onClick={() => sekme_degistir('derleme')}
            className={`px-3 py-1.5 rounded-t flex items-center gap-1.5 font-medium transition-colors ${
              aktif_sekme === 'derleme'
                ? 'bg-slate-950 text-cyan-400 border-t-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>Derleme Çıktısı</span>
          </button>

          <BilgiKutusu
            baslik="Alt Panel & Konsol"
            aciklama="Canlı yürütme çıktıları, 7 farklı hedef dilde otomatik üretilen kaynak kodlar, döngü/bağlantı statik analiz raporları ve derleme istatistiklerini içerir."
            ipucu="F5 ile kodu çalıştırabilir, 'İndir' ile bilgisayarınıza .ts/.py/.cs/.cpp/.go/.rs dosyası olarak kaydedebilirsiniz."
            boyut="kucuk"
          />
        </div>

        {/* Sağ Kontroller */}
        <div className="flex items-center gap-1.5">
          {aktif_sekme === 'konsol' && (
            <button
              onClick={on_konsol_temizle}
              title="Konsolu Temizle"
              className="p-1 text-slate-400 hover:text-slate-200 rounded hover:bg-slate-800 flex items-center gap-1 text-[11px]"
            >
              <Trash2 className="w-3 h-3" />
              <span>Temizle</span>
            </button>
          )}

          {aktif_sekme === 'kod' && (
            <>
              <button
                onClick={kod_kopyala}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 text-[11px]"
              >
                {kopyalandi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                <span>{kopyalandi ? 'Kopyalandı' : 'Kopyala'}</span>
              </button>
              <button
                onClick={kod_indir}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 text-[11px]"
              >
                <Download className="w-3 h-3" />
                <span>İndir</span>
              </button>
            </>
          )}

          <div className="h-3.5 w-px bg-slate-800 mx-1" />

          {/* Boyutlandırma ve Kapatma */}
          <button
            onClick={() => set_tam_ekran(!tam_ekran)}
            className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800"
            title={tam_ekran ? "Küçült" : "Büyüt"}
          >
            {tam_ekran ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={on_kapat}
            className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-slate-800"
            title="Paneli Kapat"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* SEKME 1: KONSOL & LOGLAR */}
      {aktif_sekme === 'konsol' && (
        <div className="flex-1 overflow-y-auto p-2 font-mono text-xs space-y-1 bg-slate-950">
          {konsol_kayitlari.length === 0 ? (
            <div className="text-slate-600 text-center py-8">
              Konsol çıktısı bulunmuyor. Projeyi yürütmek için F5 veya 'Çalıştır' butonuna basın.
            </div>
          ) : (
            konsol_kayitlari.map(kayit => {
              let renk = 'text-slate-300';
              let rozet_stil = 'bg-slate-800 text-slate-400';
              let rozet_metin = 'LOG';

              if (kayit.seviye === 'bilgi') {
                renk = 'text-cyan-300';
                rozet_stil = 'bg-cyan-950 text-cyan-400 border border-cyan-800/60';
                rozet_metin = 'INFO';
              } else if (kayit.seviye === 'basari') {
                renk = 'text-emerald-300';
                rozet_stil = 'bg-emerald-950 text-emerald-400 border border-emerald-800/60';
                rozet_metin = 'SUCCESS';
              } else if (kayit.seviye === 'uyari') {
                renk = 'text-amber-300';
                rozet_stil = 'bg-amber-950 text-amber-400 border border-amber-800/60';
                rozet_metin = 'WARN';
              } else if (kayit.seviye === 'hata') {
                renk = 'text-red-400 font-semibold';
                rozet_stil = 'bg-red-950 text-red-400 border border-red-800/60';
                rozet_metin = 'ERROR';
              }

              return (
                <div key={kayit.id} className="flex items-start gap-2 py-0.5 hover:bg-slate-900/50 px-1.5 rounded">
                  <span className="text-slate-600 text-[10px] select-none">{kayit.zaman}</span>
                  <span className={`text-[10px] px-1 py-0.2 rounded font-mono font-bold select-none ${rozet_stil}`}>
                    {rozet_metin}
                  </span>
                  <span className={`flex-1 break-all ${renk}`}>{kayit.metin}</span>
                </div>
              );
            })
          )}
          <div ref={konsol_sonu_ref} />
        </div>
      )}

      {/* SEKME 2: ÜRETİLEN KOD ÖNİZLEME */}
      {aktif_sekme === 'kod' && (
        <div className="flex-1 flex flex-col min-h-0 bg-slate-950">
          {/* Üretilen Dosya Seçici Çubuğu */}
          {dosya_yollari.length > 0 && (
            <div className="h-8 bg-slate-900/60 border-b border-slate-800/80 flex items-center gap-1.5 px-3 overflow-x-auto text-[11px] font-mono select-none flex-shrink-0">
              <span className="text-slate-500 text-[10px] uppercase font-bold pr-1">Üretilen Dosyalar:</span>
              {dosya_yollari.map(dosya_yol => {
                const secili = dosya_yol === secili_uretim_dosyasi;
                return (
                  <button
                    key={dosya_yol}
                    onClick={() => set_secili_uretim_dosyasi(dosya_yol)}
                    className={`px-2.5 py-0.5 rounded transition-all flex items-center gap-1.5 ${
                      secili
                        ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60 font-semibold'
                        : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                    }`}
                  >
                    <span>{dosya_yol}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Kod Alanı (Satır Numaraları + Pre) */}
          <div className="flex-1 overflow-auto flex font-mono text-xs select-text p-2">
            {/* Sol Satır Numaraları */}
            <div className="w-10 text-slate-600 select-none py-1 pr-3 text-right font-mono flex-shrink-0 border-r border-slate-800/60">
              {kod_satirlari.map((_, i) => (
                <div key={i} className="leading-5 text-[11px]">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Kod Gövdesi */}
            <div className="flex-1 pl-3 py-1 overflow-x-auto">
              <pre className="text-cyan-300 leading-5 font-mono text-xs whitespace-pre">
                {gosterilen_kod}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* SEKME 3: SORUNLAR VE STATİK ANALİZ */}
      {aktif_sekme === 'sorunlar' && (
        <div className="flex-1 overflow-y-auto p-3 text-xs space-y-2 bg-slate-950">
          {(!dogrulama || ((dogrulama.hatalar?.length || 0) === 0 && (dogrulama.uyarilar?.length || 0) === 0)) ? (
            <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/40 border border-emerald-900/60 p-3 rounded-lg">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <div>
                <div className="font-semibold">Grafik Doğrulandı</div>
                <div className="text-[11px] text-slate-400">Hiçbir hata veya uyarı tespit edilmedi.</div>
              </div>
            </div>
          ) : (
            <>
              {(dogrulama.hatalar || []).map(h => (
                <div key={h.id} className="p-2.5 bg-red-950/30 border border-red-900/60 rounded-lg flex items-start gap-2 text-red-300">
                  <AlertCircle className="w-4 h-4 flex-shrink-0 text-red-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-red-200">{h.mesaj}</div>
                    {h.dugum_id && (
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Düğüm ID: <span className="text-red-400">{h.dugum_id}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {(dogrulama.uyarilar || []).map(u => (
                <div key={u.id} className="p-2.5 bg-amber-950/30 border border-amber-900/60 rounded-lg flex items-start gap-2 text-amber-300">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 text-amber-400 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-semibold text-amber-200">{u.mesaj}</div>
                    {u.dugum_id && (
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                        Düğüm ID: <span className="text-amber-400">{u.dugum_id}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}

      {/* SEKME 4: DERLEME ÇIKTISI VE İSTATİSTİKLER */}
      {aktif_sekme === 'derleme' && (
        <div className="flex-1 overflow-y-auto p-3 text-xs space-y-3 bg-slate-950">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Hedef Dil</div>
              <div className="text-lg font-bold font-mono text-cyan-400 uppercase mt-0.5">{hedef_dil}</div>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Doğrulama Durumu</div>
              <div className={`text-lg font-bold font-mono mt-0.5 ${derleme_sonucu?.basarili ? 'text-emerald-400' : 'text-red-400'}`}>
                {derleme_sonucu?.basarili ? 'GEÇERLİ' : 'HATALI'}
              </div>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">IR Komut Sayısı</div>
              <div className="text-lg font-bold font-mono text-purple-400 mt-0.5">
                {derleme_sonucu?.ara_temsil?.ana_akis_komutlari?.length || 0}
              </div>
            </div>
            <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase font-semibold">Geliştirici İmzası</div>
              <div className="text-xs font-bold font-mono text-cyan-300 mt-1.5 truncate">Developed By K7~</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
