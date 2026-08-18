/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Bilgi Kutusu (Info Popover & Tooltip System)
 * Her yapilan islemin yaninda kullanicilara rehberlik saglayan 'i' kutusu
 */

import React, { useState, useRef, useEffect } from 'react';
import { Info, HelpCircle, Lightbulb, KeyRound, Sparkles, X } from 'lucide-react';

export interface bilgi_kutusu_ozellikleri {
  baslik: string;
  aciklama: string;
  ipucu?: string;
  kisayol?: string;
  ornek?: string;
  portlar?: { ad: string; tip: string; aciklama: string }[];
  boyut?: 'kucuk' | 'normal' | 'buyuk';
  konum?: 'ust' | 'alt' | 'sol' | 'sag' | 'otomatik';
  className?: string;
}

export const BilgiKutusu: React.FC<bilgi_kutusu_ozellikleri> = ({
  baslik,
  aciklama,
  ipucu,
  kisayol,
  ornek,
  portlar,
  boyut = 'normal',
  konum = 'otomatik',
  className = ''
}) => {
  const [gorunur, set_gorunur] = useState(false);
  const [tiklandi_acik, set_tiklandi_acik] = useState(false);
  const kutu_ref = useRef<HTMLDivElement>(null);
  const tetikleyici_ref = useRef<HTMLButtonElement>(null);

  // Dışarı tıklandığında kapatma
  useEffect(() => {
    function tiklama_kontrol(e: MouseEvent) {
      if (
        kutu_ref.current && 
        !kutu_ref.current.contains(e.target as Node) &&
        tetikleyici_ref.current &&
        !tetikleyici_ref.current.contains(e.target as Node)
      ) {
        set_tiklandi_acik(false);
        set_gorunur(false);
      }
    }
    if (tiklandi_acik) {
      document.addEventListener('mousedown', tiklama_kontrol);
      return () => document.removeEventListener('mousedown', tiklama_kontrol);
    }
  }, [tiklandi_acik]);

  const acik_mi = gorunur || tiklandi_acik;

  // Buton boyutu
  const buton_boyut = boyut === 'kucuk' ? 'w-3.5 h-3.5 text-[9px]' : 'w-4 h-4 text-[10px]';

  return (
    <div className={`relative inline-flex items-center align-middle ${className}`}>
      <button
        ref={tetikleyici_ref}
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          set_tiklandi_acik(!tiklandi_acik);
        }}
        onMouseEnter={() => set_gorunur(true)}
        onMouseLeave={() => !tiklandi_acik && set_gorunur(false)}
        aria-label={`Bilgi: ${baslik}`}
        className={`rounded-full flex items-center justify-center font-bold font-mono transition-all duration-150 ${buton_boyut} ${
          acik_mi
            ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40 ring-2 ring-cyan-400/40 scale-110'
            : 'bg-slate-800/90 hover:bg-cyan-950 text-slate-400 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/50'
        }`}
        title={`${baslik} hakkında bilgi almak için tıklayın`}
      >
        i
      </button>

      {acik_mi && (
        <div
          ref={kutu_ref}
          onClick={(e) => e.stopPropagation()}
          className="absolute z-[100] w-64 md:w-72 p-3 bg-slate-900/95 backdrop-blur-md border border-cyan-500/40 rounded-lg shadow-2xl shadow-slate-950 text-xs text-slate-200 left-1/2 -translate-x-1/2 bottom-full mb-2 animate-in fade-in zoom-in-95 duration-150 pointer-events-auto"
        >
          {/* Üst Başlık & Kapatma */}
          <div className="flex items-center justify-between gap-2 pb-1.5 mb-1.5 border-b border-slate-800">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold truncate">
              <Sparkles className="w-3.5 h-3.5 flex-shrink-0 text-cyan-400" />
              <span className="truncate">{baslik}</span>
            </div>
            {tiklandi_acik && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  set_tiklandi_acik(false);
                  set_gorunur(false);
                }}
                className="text-slate-400 hover:text-white p-0.5 rounded hover:bg-slate-800"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Açıklama Metni */}
          <p className="text-slate-300 leading-relaxed text-[11px] mb-2">
            {aciklama}
          </p>

          {/* Portlar Bilgisi Varsa */}
          {portlar && portlar.length > 0 && (
            <div className="mb-2 bg-slate-950/80 rounded p-1.5 border border-slate-800/80">
              <div className="text-[10px] uppercase font-semibold text-slate-400 mb-1 flex items-center gap-1">
                <span>Portlar & Tipler</span>
              </div>
              <div className="space-y-1">
                {portlar.map((p, idx) => (
                  <div key={idx} className="flex items-start justify-between text-[10px] gap-1">
                    <span className="font-mono text-cyan-300">{p.ad}:</span>
                    <span className="text-purple-300 font-mono text-[9px] bg-purple-950/60 px-1 rounded">{p.tip}</span>
                    <span className="text-slate-400 text-[10px] flex-1 text-right truncate">{p.aciklama}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Örnek veya İpucu */}
          {ipucu && (
            <div className="flex items-start gap-1.5 text-[10px] text-amber-300 bg-amber-950/40 border border-amber-800/40 p-1.5 rounded mb-1.5">
              <Lightbulb className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-amber-400" />
              <span className="leading-tight">{ipucu}</span>
            </div>
          )}

          {/* Kod Örneği */}
          {ornek && (
            <div className="bg-slate-950 rounded p-1.5 font-mono text-[10px] text-emerald-400 border border-slate-800 overflow-x-auto mb-1.5">
              <code>{ornek}</code>
            </div>
          )}

          {/* Kısayol */}
          {kisayol && (
            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-800/80">
              <span className="flex items-center gap-1"><KeyRound className="w-3 h-3 text-cyan-400" /> Kısayol:</span>
              <kbd className="px-1.5 py-0.2 bg-slate-800 text-cyan-300 rounded font-mono font-semibold border border-slate-700 text-[9px]">
                {kisayol}
              </kbd>
            </div>
          )}

          {/* Küçük Ok İşareti */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 border-r border-b border-cyan-500/40 rotate-45" />
        </div>
      )}
    </div>
  );
};
