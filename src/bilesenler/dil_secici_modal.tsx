/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Detayli Dil Secenekleri ve Derleme Yapilandirma Modali
 */

import React, { useState } from 'react';
import { 
  FileCode, 
  Code, 
  Terminal, 
  Cpu, 
  Zap, 
  Layers, 
  ShieldCheck, 
  Check, 
  X, 
  Info, 
  ExternalLink,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { dil_secenegi, dil_detayi } from '../tipler/grafik_tipleri';
import { DIL_KATALOGU } from '../tanimlar/dil_katalogu';
import { BilgiKutusu } from './bilgi_kutusu';

interface dil_secici_modal_ozellikleri {
  acik: boolean;
  on_kapat: () => void;
  su_anki_dil: dil_secenegi;
  on_dil_sec: (dil: dil_secenegi) => void;
}

export const DilSeciciModal: React.FC<dil_secici_modal_ozellikleri> = ({
  acik,
  on_kapat,
  su_anki_dil,
  on_dil_sec
}) => {
  const [secilen_gecici_dil, set_secilen_gecici_dil] = useState<dil_secenegi>(su_anki_dil);

  if (!acik) return null;

  const aktif_detay: dil_detayi = DIL_KATALOGU[secilen_gecici_dil];

  const ikon_getir = (dil: dil_secenegi) => {
    switch (dil) {
      case 'typescript': return <FileCode className="w-5 h-5 text-blue-400" />;
      case 'javascript': return <Code className="w-5 h-5 text-yellow-400" />;
      case 'python': return <Terminal className="w-5 h-5 text-sky-400" />;
      case 'csharp': return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'cpp': return <Zap className="w-5 h-5 text-blue-500" />;
      case 'go': return <Layers className="w-5 h-5 text-cyan-400" />;
      case 'rust': return <ShieldCheck className="w-5 h-5 text-amber-500" />;
    }
  };

  const dilleri_listele: dil_secenegi[] = ['typescript', 'javascript', 'python', 'csharp', 'cpp', 'go', 'rust'];

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Üst Başlık */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-700/50 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="font-bold text-white text-base">Hedef Programlama Dili Seçenekleri</h2>
                <BilgiKutusu 
                  baslik="Hedef Dil Dönüşümü"
                  aciklama="NODEFORGE oluşturduğunuz görsel grafiği seçilen dilin kurallarına ve derleyici yapısına göre anında saf koda dönüştürür."
                  ipucu="Herhangi bir zamanda dili değiştirip farklı dillerdeki eşdeğer çıktıyı alabilirsiniz."
                />
              </div>
              <p className="text-xs text-slate-400">Görsel grafiğin derleneceği programlama dilini ve ortamını seçin</p>
            </div>
          </div>
          <button 
            onClick={on_kapat}
            className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Ana İçerik */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Sol Kolon: Dil Listesi */}
          <div className="md:col-span-5 space-y-2">
            <div className="text-[11px] font-semibold uppercase text-slate-400 px-1 mb-1">
              Desteklenen 7 Programlama Dili
            </div>
            {dilleri_listele.map(dil_id => {
              const d = DIL_KATALOGU[dil_id];
              const secili = secilen_gecici_dil === dil_id;
              const su_anki = su_anki_dil === dil_id;

              return (
                <button
                  key={dil_id}
                  onClick={() => set_secilen_gecici_dil(dil_id)}
                  className={`w-full text-left p-3 rounded-lg border transition-all flex items-center justify-between ${
                    secili 
                      ? 'bg-cyan-950/60 border-cyan-500/80 shadow-md shadow-cyan-950 ring-1 ring-cyan-500/40' 
                      : 'bg-slate-950/60 border-slate-800 hover:bg-slate-800/60 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded bg-slate-900 border border-slate-800">
                      {ikon_getir(dil_id)}
                    </div>
                    <div>
                      <div className="font-semibold text-slate-100 text-xs flex items-center gap-1.5">
                        <span>{d.ad}</span>
                        {su_anki && (
                          <span className="text-[9px] bg-emerald-950 text-emerald-400 border border-emerald-800/60 px-1.5 py-0.2 rounded font-mono">
                            Aktif
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        .{d.uzanti} • {d.surum}
                      </div>
                    </div>
                  </div>
                  <ArrowRight className={`w-4 h-4 transition-transform ${secili ? 'text-cyan-400 translate-x-0.5' : 'text-slate-600'}`} />
                </button>
              );
            })}
          </div>

          {/* Sağ Kolon: Seçilen Dilin Detaylı Bilgi Kartı */}
          <div className="md:col-span-7 bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
            <div className="space-y-3.5">
              {/* Başlık & İkon */}
              <div className="flex items-center gap-3 pb-3 border-b border-slate-800">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800">
                  {ikon_getir(secilen_gecici_dil)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    {aktif_detay.ad}
                    <span className="text-xs text-cyan-400 font-mono font-normal">({aktif_detay.surum})</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{aktif_detay.calisma_zamani}</p>
                </div>
              </div>

              {/* Açıklama */}
              <div>
                <div className="text-[11px] uppercase font-semibold text-slate-400 mb-1">Açıklama</div>
                <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                  {aktif_detay.aciklama}
                </p>
              </div>

              {/* Kullanım Alanı */}
              <div>
                <div className="text-[11px] uppercase font-semibold text-slate-400 mb-1">Kullanım Alanı & Entegrasyon</div>
                <div className="text-xs text-cyan-300 font-medium bg-cyan-950/30 p-2 rounded border border-cyan-900/40">
                  {aktif_detay.kullanim_alani}
                </div>
              </div>

              {/* Öne Çıkan Özellikler */}
              <div>
                <div className="text-[11px] uppercase font-semibold text-slate-400 mb-1.5">Derleme & Motor Özellikleri</div>
                <ul className="space-y-1 text-xs text-slate-300">
                  {aktif_detay.ozellikler.map((oz, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                      <span>{oz}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Alt Seçim Butonu */}
            <div className="pt-4 mt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-[11px] text-slate-500 font-mono">
                Uzantı: <span className="text-cyan-400 font-bold">.{aktif_detay.uzanti}</span>
              </div>
              <button
                onClick={() => {
                  on_dil_sec(secilen_gecici_dil);
                  on_kapat();
                }}
                className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-semibold text-xs flex items-center gap-2 shadow-md shadow-cyan-950 transition-all"
              >
                <Check className="w-4 h-4" />
                <span>Bu Dili Hedef Olarak Ayarla</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
