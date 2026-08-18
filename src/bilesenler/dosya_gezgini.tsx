/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Dosya Gezgini (File Explorer) Bileşeni
 */

import React, { useState } from 'react';
import { 
  Folder, 
  FolderPlus, 
  FilePlus, 
  FileCode, 
  Code2, 
  Settings, 
  FileText, 
  Network, 
  Trash2, 
  Edit3, 
  Copy, 
  Search, 
  Check, 
  X,
  Sparkles,
  ChevronRight,
  MoreVertical,
  Plus
} from 'lucide-react';
import { dosya_tanimi, dil_secenegi } from '../tipler/grafik_tipleri';
import { BilgiKutusu } from './bilgi_kutusu';

interface dosya_gezgini_ozellikleri {
  dosyalar: dosya_tanimi[];
  aktif_dosya_id: string;
  hedef_dil: dil_secenegi;
  on_dosya_sec: (id: string) => void;
  on_dosya_olustur: (ad: string, tur: 'grafik' | 'kod' | 'yapilandirma' | 'veri' | 'diger', icerik?: string) => void;
  on_dosya_sil: (id: string) => void;
  on_dosya_adi_degistir: (id: string, yeni_ad: string) => void;
}

export const DosyaGezgini: React.FC<dosya_gezgini_ozellikleri> = ({
  dosyalar,
  aktif_dosya_id,
  hedef_dil,
  on_dosya_sec,
  on_dosya_olustur,
  on_dosya_sil,
  on_dosya_adi_degistir
}) => {
  const [arama, set_arama] = useState('');
  const [yeni_dosya_modal, set_yeni_dosya_modal] = useState(false);
  const [yeni_ad, set_yeni_ad] = useState('');
  const [yeni_tur, set_yeni_tur] = useState<'grafik' | 'kod' | 'yapilandirma' | 'veri' | 'diger'>('grafik');
  const [duzenlenen_dosya_id, set_duzenlenen_dosya_id] = useState<string | null>(null);
  const [duzenlenen_ad, set_duzenlenen_ad] = useState('');

  const filtrelenmis_dosyalar = (dosyalar || []).filter(d => 
    d.ad.toLowerCase().includes(arama.toLowerCase()) || 
    d.yol.toLowerCase().includes(arama.toLowerCase())
  );

  const yeni_dosya_ekle = () => {
    let ad = yeni_ad.trim();
    if (!ad) {
      if (yeni_tur === 'grafik') ad = `grafik_${Date.now().toString().slice(-4)}.graph`;
      else if (yeni_tur === 'kod') {
        const uzanti = hedef_dil === 'python' ? 'py' : (hedef_dil === 'csharp' ? 'cs' : (hedef_dil === 'cpp' ? 'cpp' : 'ts'));
        ad = `modul_${Date.now().toString().slice(-4)}.${uzanti}`;
      } else if (yeni_tur === 'yapilandirma') ad = 'ayarlar.json';
      else ad = 'notlar.md';
    } else {
      // Uzantı kontrolü
      if (yeni_tur === 'grafik' && !ad.endsWith('.graph')) {
        ad += '.graph';
      }
    }

    let varsayilan_icerik = '';
    if (yeni_tur === 'kod') {
      varsayilan_icerik = `// NODEFORGE - ${ad}\n// Gelistirici: Developed By K7~\n\nexport function ornek_fonksiyon() {\n  console.log("Yeni modul calisti.");\n}\n`;
    } else if (yeni_tur === 'yapilandirma') {
      varsayilan_icerik = `{\n  "version": "1.0.0",\n  "enabled": true,\n  "settings": {}\n}`;
    } else if (yeni_tur === 'veri') {
      varsayilan_icerik = `# ${ad}\n\nBu dosya proje dokümantasyonudur.\n`;
    }

    on_dosya_olustur(ad, yeni_tur, varsayilan_icerik);
    set_yeni_ad('');
    set_yeni_dosya_modal(false);
  };

  const ad_degistir_baslat = (dosya: dosya_tanimi, e: React.MouseEvent) => {
    e.stopPropagation();
    set_duzenlenen_dosya_id(dosya.id);
    set_duzenlenen_ad(dosya.ad);
  };

  const ad_degistir_onayla = (dosya_id: string, e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (duzenlenen_ad.trim()) {
      on_dosya_adi_degistir(dosya_id, duzenlenen_ad.trim());
    }
    set_duzenlenen_dosya_id(null);
  };

  const ikon_getir = (dosya: dosya_tanimi) => {
    if (dosya.tur === 'grafik' || dosya.ad.endsWith('.graph')) {
      return <Network className="w-4 h-4 text-cyan-400 flex-shrink-0" />;
    }
    if (dosya.ad.endsWith('.ts') || dosya.ad.endsWith('.js')) {
      return <Code2 className="w-4 h-4 text-yellow-400 flex-shrink-0" />;
    }
    if (dosya.ad.endsWith('.py')) {
      return <Code2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />;
    }
    if (dosya.ad.endsWith('.cs') || dosya.ad.endsWith('.cpp') || dosya.ad.endsWith('.rs') || dosya.ad.endsWith('.go')) {
      return <FileCode className="w-4 h-4 text-purple-400 flex-shrink-0" />;
    }
    if (dosya.ad.endsWith('.json') || dosya.tur === 'yapilandirma') {
      return <Settings className="w-4 h-4 text-amber-400 flex-shrink-0" />;
    }
    return <FileText className="w-4 h-4 text-blue-400 flex-shrink-0" />;
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-200 select-none">
      {/* Üst Başlık & Hızlı Ekleme */}
      <div className="p-3 border-b border-slate-800 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Folder className="w-4 h-4 text-cyan-400" />
            <span>Proje Dosya Gezgini</span>
            <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded-full font-mono">
              {dosyalar.length}
            </span>
          </div>

          <div className="flex items-center gap-1">
            <BilgiKutusu
              baslik="Proje Dosya Gezgini"
              aciklama="Projenizde birden fazla görsel Blueprint grafiği (.graph) veya yardımcı kod (.ts, .py, .json) dosyası oluşturup eşzamanlı düzenleyebilirsiniz."
              boyut="kucuk"
            />
            <button
              onClick={() => {
                set_yeni_tur('grafik');
                set_yeni_dosya_modal(true);
              }}
              className="p-1 rounded bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/60 transition-colors"
              title="Yeni Dosya Ekle"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Arama Kutusu */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={arama}
            onChange={e => set_arama(e.target.value)}
            placeholder="Dosyalarda ara..."
            className="w-full pl-8 pr-3 py-1 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
          />
        </div>
      </div>

      {/* Yeni Dosya Oluşturma Modalı / Çubuğu */}
      {yeni_dosya_modal && (
        <div className="p-3 bg-slate-900 border-b border-cyan-900/60 space-y-2.5 animate-fadeIn">
          <div className="flex items-center justify-between text-xs font-semibold text-cyan-300">
            <span>Yeni Dosya Oluştur</span>
            <button 
              onClick={() => set_yeni_dosya_modal(false)}
              className="text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
            <button
              onClick={() => set_yeni_tur('grafik')}
              className={`p-1.5 rounded flex items-center gap-1.5 border text-left transition-all ${
                yeni_tur === 'grafik' 
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Network className="w-3.5 h-3.5 text-cyan-400" />
              <span className="truncate">Görsel Grafik (.graph)</span>
            </button>

            <button
              onClick={() => set_yeni_tur('kod')}
              className={`p-1.5 rounded flex items-center gap-1.5 border text-left transition-all ${
                yeni_tur === 'kod' 
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-yellow-400" />
              <span className="truncate">Kaynak Kod (.ts/.py)</span>
            </button>

            <button
              onClick={() => set_yeni_tur('yapilandirma')}
              className={`p-1.5 rounded flex items-center gap-1.5 border text-left transition-all ${
                yeni_tur === 'yapilandirma' 
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <Settings className="w-3.5 h-3.5 text-amber-400" />
              <span className="truncate">Yapılandırma (.json)</span>
            </button>

            <button
              onClick={() => set_yeni_tur('veri')}
              className={`p-1.5 rounded flex items-center gap-1.5 border text-left transition-all ${
                yeni_tur === 'veri' 
                  ? 'bg-cyan-950 text-cyan-300 border-cyan-500' 
                  : 'bg-slate-950 text-slate-400 border-slate-800 hover:bg-slate-800'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-blue-400" />
              <span className="truncate">Belge / Not (.md)</span>
            </button>
          </div>

          <div className="space-y-1">
            <input
              type="text"
              value={yeni_ad}
              onChange={e => set_yeni_ad(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && yeni_dosya_ekle()}
              placeholder={yeni_tur === 'grafik' ? 'hesaplama_akisi.graph' : 'yardimci.ts'}
              className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={() => set_yeni_dosya_modal(false)}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs"
            >
              İptal
            </button>
            <button
              onClick={yeni_dosya_ekle}
              className="px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-1 shadow-sm shadow-cyan-950"
            >
              <Plus className="w-3 h-3" />
              <span>Oluştur</span>
            </button>
          </div>
        </div>
      )}

      {/* Dosya Listesi */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1 font-mono text-xs">
        {filtrelenmis_dosyalar.length === 0 ? (
          <div className="text-center py-8 text-slate-500 text-xs font-sans">
            Dosya bulunamadı.
          </div>
        ) : (
          filtrelenmis_dosyalar.map(dosya => {
            const secili = dosya.id === aktif_dosya_id;
            const duzenleniyor = duzenlenen_dosya_id === dosya.id;

            return (
              <div
                key={dosya.id}
                onClick={() => on_dosya_sec(dosya.id)}
                className={`group flex items-center justify-between p-2 rounded cursor-pointer transition-all border ${
                  secili
                    ? 'bg-slate-900 text-cyan-300 border-cyan-500/60 shadow-sm shadow-cyan-950'
                    : 'bg-slate-950/40 text-slate-300 hover:bg-slate-900/60 hover:text-white border-transparent'
                }`}
              >
                <div className="flex items-center gap-2 min-w-0 flex-1">
                  {ikon_getir(dosya)}
                  {duzenleniyor ? (
                    <form 
                      onSubmit={e => ad_degistir_onayla(dosya.id, e)}
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1 flex-1"
                    >
                      <input
                        type="text"
                        value={duzenlenen_ad}
                        onChange={e => set_duzenlenen_ad(e.target.value)}
                        onBlur={() => ad_degistir_onayla(dosya.id)}
                        autoFocus
                        className="w-full bg-slate-950 px-1 py-0.5 border border-cyan-500 rounded text-xs text-cyan-300 font-mono focus:outline-none"
                      />
                    </form>
                  ) : (
                    <div className="min-w-0 flex-1">
                      <div className="truncate font-medium flex items-center gap-1.5">
                        <span>{dosya.ad}</span>
                        {dosya.tur === 'grafik' && (
                          <span className="text-[9px] bg-cyan-950 text-cyan-400 px-1 py-0.2 rounded border border-cyan-800/60 font-sans font-semibold">
                            GRAPH
                          </span>
                        )}
                      </div>
                      <div className="text-[10px] text-slate-500 font-sans truncate">
                        {dosya.yol}
                      </div>
                    </div>
                  )}
                </div>

                {/* Hızlı Eylemler (Hover Durumunda) */}
                {!duzenleniyor && (
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                    <button
                      onClick={e => ad_degistir_baslat(dosya, e)}
                      className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-cyan-300"
                      title="Yeniden Adlandır (F2)"
                    >
                      <Edit3 className="w-3 h-3" />
                    </button>
                    {dosyalar.length > 1 && (
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          if (confirm(`'${dosya.ad}' dosyasını silmek istediğinize emin misiniz?`)) {
                            on_dosya_sil(dosya.id);
                          }
                        }}
                        className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-red-400"
                        title="Dosyayı Sil"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Alt Bilgi Çubuğu */}
      <div className="p-2.5 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400">
        <span>Hedef: <strong className="text-slate-200 font-mono uppercase">{hedef_dil}</strong></span>
        <span className="text-cyan-400 font-mono">NODEFORGE VFS</span>
      </div>
    </div>
  );
};
