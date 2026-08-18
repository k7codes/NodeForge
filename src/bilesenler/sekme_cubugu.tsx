/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Editor Sekme Cubugu (VS Code Tarzi Coklu Dosya Sekmeleri)
 */

import React from 'react';
import { 
  Network, 
  Code2, 
  Settings, 
  FileText, 
  FileCode, 
  X, 
  Plus, 
  ChevronRight,
  FolderOpen
} from 'lucide-react';
import { dosya_tanimi } from '../tipler/grafik_tipleri';

interface sekme_cubugu_ozellikleri {
  acik_dosyalar: string[];
  aktif_dosya_id: string;
  tum_dosyalar: dosya_tanimi[];
  on_dosya_sec: (id: string) => void;
  on_dosya_kapat: (id: string, e: React.MouseEvent) => void;
  on_yeni_dosya: () => void;
}

export const SekmeCubugu: React.FC<sekme_cubugu_ozellikleri> = ({
  acik_dosyalar,
  aktif_dosya_id,
  tum_dosyalar,
  on_dosya_sec,
  on_dosya_kapat,
  on_yeni_dosya
}) => {
  const dosya_haritasi = new Map<string, dosya_tanimi>();
  tum_dosyalar.forEach(d => {
    if (d && d.id) {
      dosya_haritasi.set(d.id, d);
    }
  });

  const ikon_getir = (dosya: dosya_tanimi) => {
    if (dosya.tur === 'grafik' || dosya.ad.endsWith('.graph')) {
      return <Network className="w-3.5 h-3.5 text-cyan-400" />;
    }
    if (dosya.ad.endsWith('.ts') || dosya.ad.endsWith('.js')) {
      return <Code2 className="w-3.5 h-3.5 text-yellow-400" />;
    }
    if (dosya.ad.endsWith('.py')) {
      return <Code2 className="w-3.5 h-3.5 text-emerald-400" />;
    }
    if (dosya.ad.endsWith('.cs') || dosya.ad.endsWith('.cpp') || dosya.ad.endsWith('.rs') || dosya.ad.endsWith('.go')) {
      return <FileCode className="w-3.5 h-3.5 text-purple-400" />;
    }
    if (dosya.ad.endsWith('.json') || dosya.tur === 'yapilandirma') {
      return <Settings className="w-3.5 h-3.5 text-amber-400" />;
    }
    return <FileText className="w-3.5 h-3.5 text-slate-400" />;
  };

  const aktif_dosya = dosya_haritasi.get(aktif_dosya_id);

  return (
    <div className="h-9 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-2 select-none z-10 flex-shrink-0">
      {/* Sol Sekmeler */}
      <div className="flex items-center gap-1 overflow-x-auto scrollbar-none h-full py-1">
        {acik_dosyalar.map(dosya_id => {
          const dosya = dosya_haritasi.get(dosya_id);
          if (!dosya) return null;
          const aktif = dosya_id === aktif_dosya_id;

          return (
            <div
              key={dosya_id}
              onClick={() => on_dosya_sec(dosya_id)}
              className={`group h-7 px-3 rounded flex items-center gap-2 text-xs font-mono cursor-pointer transition-all border ${
                aktif
                  ? 'bg-slate-900 text-cyan-300 border-cyan-500/50 shadow-sm shadow-cyan-950/40'
                  : 'bg-slate-950/60 text-slate-400 hover:text-slate-200 hover:bg-slate-900/50 border-transparent'
              }`}
            >
              {ikon_getir(dosya)}
              <span className="truncate max-w-[130px]">{dosya.ad}</span>
              {dosya.tur === 'grafik' && (
                <span className="text-[9px] bg-cyan-950 text-cyan-400 px-1 rounded border border-cyan-800/60 uppercase">
                  GRAPH
                </span>
              )}
              <button
                onClick={(e) => on_dosya_kapat(dosya_id, e)}
                className="opacity-0 group-hover:opacity-100 p-0.5 hover:bg-slate-800 rounded text-slate-400 hover:text-red-400 transition-all ml-1"
                title="Sekmeyi Kapat"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}

        {/* Hızlı Yeni Dosya Butonu */}
        <button
          onClick={on_yeni_dosya}
          className="h-7 px-2 rounded hover:bg-slate-900 text-slate-400 hover:text-cyan-300 flex items-center gap-1 text-xs transition-colors"
          title="Yeni Dosya veya Grafik Oluştur"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Sağ Ekmek Kırıntısı (Breadcrumb) */}
      {aktif_dosya && (
        <div className="hidden lg:flex items-center gap-1 text-[11px] text-slate-500 font-mono pr-2">
          <FolderOpen className="w-3 h-3 text-slate-500" />
          <span>proje</span>
          <ChevronRight className="w-3 h-3 text-slate-600" />
          <span className="text-slate-300 font-medium">{aktif_dosya.yol}</span>
        </div>
      )}
    </div>
  );
};
