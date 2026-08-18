/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Hakkinda Bilgilendirme Penceresi
 */

import React from 'react';
import { X, Cpu, ShieldCheck, Zap, Layers, Globe } from 'lucide-react';

interface hakkinda_penceresi_ozellikleri {
  acik: boolean;
  on_kapat: () => void;
}

export const HakkindaPenceresi: React.FC<hakkinda_penceresi_ozellikleri> = ({ acik, on_kapat }) => {
  if (!acik) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 select-none animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden flex flex-col text-xs text-slate-300">
        <div className="p-5 bg-gradient-to-b from-slate-950 to-slate-900 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
              <Cpu className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400">
                NODEFORGE
              </h2>
              <p className="text-xs text-slate-400 font-medium">Visual Programming Studio</p>
            </div>
          </div>
          <button
            onClick={on_kapat}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-slate-300">
          <p className="leading-relaxed">
            <strong className="text-white">NODEFORGE</strong>, Unreal Engine Blueprint sisteminden ilham alan, 
            modern web standartlarında geliştirilmiş profesyonel bir <strong>Görsel Programlama IDE'sidir</strong>.
          </p>

          <div className="space-y-2">
            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <Zap className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">Görsel Akış & Yüksek FPS Tuval Motoru</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Akış portları (Flow) ve Tip güvenli veri portları (Data) ile 60 FPS donanım hızlandırmalı sınırsız tuval üzerinde program mantığı oluşturun.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <Globe className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">7 Hedef Dil Desteği & IR Mimarisi</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Grafikler TypeScript, JavaScript, Python 3, C# (.NET), C++20, Go ve Rust dillerine eşzamanlı derlenir.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-slate-950/70 border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-slate-200">Statik Doğrulama & İzolasyonlu VM</span>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Çalıştırma öncesi eksik bağlantı ve tip uyuşmazlığı taranır; kod güvenli ortamda yürütülür.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono">
          <span className="text-slate-500">Sürüm: 1.0.0 Pro</span>
          <span className="text-cyan-300 font-semibold">Developed By K7~</span>
        </div>
      </div>
    </div>
  );
};
