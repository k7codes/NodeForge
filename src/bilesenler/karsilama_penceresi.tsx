/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Yeni Proje ve Sablon Secim Penceresi
 */

import React, { useState } from 'react';
import { X, Sparkles, FilePlus, Cpu, ArrowRight } from 'lucide-react';
import { dil_secenegi } from '../tipler/grafik_tipleri';
import { hazir_sablonlar } from '../tanimlar/sablon_projeler';
import { DIL_KATALOGU } from '../tanimlar/dil_katalogu';

interface karsilama_penceresi_ozellikleri {
  acik: boolean;
  on_kapat: () => void;
  on_sablon_sec: (sablon_id: string) => void;
  on_bos_proje_olustur: (ad: string, dil: dil_secenegi) => void;
}

export const KarsilamaPenceresi: React.FC<karsilama_penceresi_ozellikleri> = ({
  acik,
  on_kapat,
  on_sablon_sec,
  on_bos_proje_olustur
}) => {
  const [proje_adi, set_proje_adi] = useState('BenimProjem');
  const [secili_dil, set_secili_dil] = useState<dil_secenegi>('typescript');

  if (!acik) return null;

  const bos_proje_baslat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proje_adi.trim()) return;
    on_bos_proje_olustur(proje_adi.trim(), secili_dil);
    on_kapat();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 select-none animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col text-xs text-slate-300">
        {/* Modal Başlığı */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-md shadow-cyan-500/20">
              <Cpu className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">NODEFORGE Studio</h2>
              <p className="text-[11px] text-slate-400">Yeni Proje Başlat veya Şablon Seç</p>
            </div>
          </div>
          <button
            onClick={on_kapat}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal İçeriği */}
        <div className="p-5 space-y-5 overflow-y-auto max-h-[70vh]">
          {/* Yeni Boş Proje Formu */}
          <form onSubmit={bos_proje_baslat} className="p-4 bg-slate-950/70 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs">
              <FilePlus className="w-4 h-4" />
              <span>Sıfırdan Boş Proje Oluştur</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <label className="block text-[11px] text-slate-400 mb-1">Proje Adı:</label>
                <input
                  type="text"
                  value={proje_adi}
                  onChange={(e) => set_proje_adi(e.target.value)}
                  placeholder="Proje adı girin"
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white font-medium focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Hedef Dil:</label>
                <select
                  value={secili_dil}
                  onChange={(e) => set_secili_dil(e.target.value as dil_secenegi)}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-cyan-400 font-semibold focus:outline-none focus:border-cyan-500"
                >
                  {DIL_KATALOGU.map(d => (
                    <option key={d.kod} value={d.kod}>
                      {d.ad}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <button
                type="submit"
                className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white font-semibold rounded-lg flex items-center gap-1.5 shadow-md shadow-cyan-950 transition-colors"
              >
                <span>Boş Proje Başlat</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Hazır Proje Şablonları */}
          <div>
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Hazır Örnek Şablonlar</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {hazir_sablonlar.map(s => (
                <div
                  key={s.id}
                  onClick={() => {
                    on_sablon_sec(s.id);
                    on_kapat();
                  }}
                  className="p-3 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-cyan-500/60 rounded-xl cursor-pointer transition-all hover:scale-[1.02] flex flex-col justify-between group"
                >
                  <div>
                    <div className="font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {s.ad}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {s.aciklama}
                    </p>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[10px] text-cyan-400 font-medium">
                    <span>Şablonu Yükle</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Alt Bilgi */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-center text-[11px] font-mono text-slate-500">
          NODEFORGE Visual Programming Studio — <span className="text-cyan-400">Developed By K7~</span>
        </div>
      </div>
    </div>
  );
};
