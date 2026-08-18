/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Ust Ana Menu Cubugu
 */

import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, 
  Cpu, 
  Save, 
  Download, 
  Upload, 
  Undo2, 
  Redo2, 
  Trash2, 
  Copy, 
  Clipboard, 
  HelpCircle, 
  Sparkles,
  Code2, 
  FileCode, 
  Plus,
  Globe,
  BookOpen
} from 'lucide-react';
import { dil_secenegi } from '../tipler/grafik_tipleri';
import { hazir_sablonlar } from '../tanimlar/sablon_projeler';
import { DIL_KATALOGU } from '../tanimlar/dil_katalogu';
import { BilgiKutusu } from './bilgi_kutusu';

interface ust_menu_ozellikleri {
  proje_adi: string;
  hedef_dil: dil_secenegi;
  calisiyor_mu: boolean;
  on_calistir: () => void;
  on_derle: () => void;
  on_kaydet: () => void;
  on_yeni_proje: () => void;
  on_sablon_sec: (sablon_id: string) => void;
  on_disa_aktar: () => void;
  on_ice_aktar: () => void;
  on_geri_al: () => void;
  on_yinele: () => void;
  on_sil: () => void;
  on_kopyala: () => void;
  on_yapistir: () => void;
  on_secimi_temizle: () => void;
  on_kisayollari_goster: () => void;
  on_hakkinda_goster: () => void;
  on_kilavuz_goster?: () => void;
  on_dil_degistir: (dil: dil_secenegi) => void;
  on_dil_modal_ac?: () => void;
  sol_panel_acik: boolean;
  sag_panel_acik: boolean;
  alt_panel_acik: boolean;
  on_sol_panel_degis: () => void;
  on_sag_panel_degis: () => void;
  on_alt_panel_degis: () => void;
  izgara_acik: boolean;
  on_izgara_degis: () => void;
}

export const UstMenu: React.FC<ust_menu_ozellikleri> = ({
  proje_adi,
  hedef_dil,
  calisiyor_mu,
  on_calistir,
  on_derle,
  on_kaydet,
  on_yeni_proje,
  on_sablon_sec,
  on_disa_aktar,
  on_ice_aktar,
  on_geri_al,
  on_yinele,
  on_sil,
  on_kopyala,
  on_yapistir,
  on_secimi_temizle,
  on_kisayollari_goster,
  on_hakkinda_goster,
  on_kilavuz_goster,
  on_dil_degistir,
  on_dil_modal_ac,
  sol_panel_acik,
  sag_panel_acik,
  alt_panel_acik,
  on_sol_panel_degis,
  on_sag_panel_degis,
  on_alt_panel_degis,
  izgara_acik,
  on_izgara_degis
}) => {
  const [aktif_menu, set_aktif_menu] = useState<string | null>(null);
  const menu_ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function tiklama_disari(e: MouseEvent) {
      if (menu_ref.current && !menu_ref.current.contains(e.target as Node)) {
        set_aktif_menu(null);
      }
    }
    document.addEventListener('mousedown', tiklama_disari);
    return () => document.removeEventListener('mousedown', tiklama_disari);
  }, []);

  const menu_tikla = (menu_adi: string) => {
    set_aktif_menu(aktif_menu === menu_adi ? null : menu_adi);
  };

  const islem_yap = (fonksiyon: () => void) => {
    fonksiyon();
    set_aktif_menu(null);
  };

  return (
    <header className="h-10 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-3 select-none z-50 text-xs text-slate-300">
      {/* Sol Logo ve Menü Butonları */}
      <div className="flex items-center gap-1" ref={menu_ref}>
        {/* Logo & Marka */}
        <div 
          onClick={on_hakkinda_goster}
          className="flex items-center gap-2 pr-3 mr-1 border-r border-slate-800 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <div className="w-5 h-5 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-sm shadow-cyan-500/20">
            <Cpu className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="font-bold tracking-wider text-white text-sm bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-400">
            NODEFORGE
          </span>
          <span className="text-[10px] text-slate-500 font-mono hidden md:inline">
            STUDIO
          </span>
        </div>

        {/* Dosya Menüsü */}
        <div className="relative">
          <button 
            onClick={() => menu_tikla('dosya')}
            className={`px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors ${aktif_menu === 'dosya' ? 'bg-slate-800 text-white' : ''}`}
          >
            Dosya
          </button>
          {aktif_menu === 'dosya' && (
            <div className="absolute left-0 top-full mt-1 w-56 bg-slate-900 border border-slate-700 rounded-md shadow-2xl py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
              <button onClick={() => islem_yap(on_yeni_proje)} className="w-full px-3 py-1.5 text-left hover:bg-cyan-950/60 hover:text-cyan-300 flex items-center justify-between">
                <span className="flex items-center gap-2"><Plus className="w-3.5 h-3.5 text-cyan-400" /> Yeni Proje</span>
                <span className="text-[10px] text-slate-500">Ctrl+N</span>
              </button>
              <button onClick={() => islem_yap(on_kaydet)} className="w-full px-3 py-1.5 text-left hover:bg-cyan-950/60 hover:text-cyan-300 flex items-center justify-between">
                <span className="flex items-center gap-2"><Save className="w-3.5 h-3.5 text-emerald-400" /> Projeyi Kaydet</span>
                <span className="text-[10px] text-slate-500">Ctrl+S</span>
              </button>
              <div className="h-px bg-slate-800 my-1" />
              <div className="px-3 py-1 text-[10px] uppercase font-semibold tracking-wider text-slate-500">Hazır Şablonlar</div>
              {hazir_sablonlar.map(s => (
                <button 
                  key={s.id} 
                  onClick={() => islem_yap(() => on_sablon_sec(s.id))}
                  className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-white flex items-center gap-2 truncate text-slate-300"
                >
                  <Sparkles className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span className="truncate">{s.ad}</span>
                </button>
              ))}
              <div className="h-px bg-slate-800 my-1" />
              <button onClick={() => islem_yap(on_ice_aktar)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-white flex items-center justify-between">
                <span className="flex items-center gap-2"><Upload className="w-3.5 h-3.5 text-blue-400" /> İçe Aktar (.nodeforge)</span>
              </button>
              <button onClick={() => islem_yap(on_disa_aktar)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-white flex items-center justify-between">
                <span className="flex items-center gap-2"><Download className="w-3.5 h-3.5 text-purple-400" /> Dışa Aktar (.nodeforge)</span>
              </button>
            </div>
          )}
        </div>

        {/* Düzen Menüsü */}
        <div className="relative">
          <button 
            onClick={() => menu_tikla('duzen')}
            className={`px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors ${aktif_menu === 'duzen' ? 'bg-slate-800 text-white' : ''}`}
          >
            Düzen
          </button>
          {aktif_menu === 'duzen' && (
            <div className="absolute left-0 top-full mt-1 w-52 bg-slate-900 border border-slate-700 rounded-md shadow-2xl py-1 z-50">
              <button onClick={() => islem_yap(on_geri_al)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-white flex items-center justify-between">
                <span className="flex items-center gap-2"><Undo2 className="w-3.5 h-3.5 text-amber-400" /> Geri Al</span>
                <span className="text-[10px] text-slate-500">Ctrl+Z</span>
              </button>
              <button onClick={() => islem_yap(on_yinele)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-white flex items-center justify-between">
                <span className="flex items-center gap-2"><Redo2 className="w-3.5 h-3.5 text-amber-400" /> Yinele</span>
                <span className="text-[10px] text-slate-500">Ctrl+Y</span>
              </button>
              <div className="h-px bg-slate-800 my-1" />
              <button onClick={() => islem_yap(on_kopyala)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-white flex items-center justify-between">
                <span className="flex items-center gap-2"><Copy className="w-3.5 h-3.5 text-cyan-400" /> Kopyala</span>
                <span className="text-[10px] text-slate-500">Ctrl+C</span>
              </button>
              <button onClick={() => islem_yap(on_yapistir)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-white flex items-center justify-between">
                <span className="flex items-center gap-2"><Clipboard className="w-3.5 h-3.5 text-cyan-400" /> Yapıştır</span>
                <span className="text-[10px] text-slate-500">Ctrl+V</span>
              </button>
              <button onClick={() => islem_yap(on_sil)} className="w-full px-3 py-1.5 text-left hover:bg-red-950/50 hover:text-red-300 flex items-center justify-between text-red-400">
                <span className="flex items-center gap-2"><Trash2 className="w-3.5 h-3.5" /> Seçilileri Sil</span>
                <span className="text-[10px] text-slate-500">Delete</span>
              </button>
              <div className="h-px bg-slate-800 my-1" />
              <button onClick={() => islem_yap(on_secimi_temizle)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-white">
                Seçimi Temizle (Esc)
              </button>
            </div>
          )}
        </div>

        {/* Görünüm Menüsü */}
        <div className="relative">
          <button 
            onClick={() => menu_tikla('gorunum')}
            className={`px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors ${aktif_menu === 'gorunum' ? 'bg-slate-800 text-white' : ''}`}
          >
            Görünüm
          </button>
          {aktif_menu === 'gorunum' && (
            <div className="absolute left-0 top-full mt-1 w-56 bg-slate-900 border border-slate-700 rounded-md shadow-2xl py-1 z-50">
              <button onClick={() => islem_yap(on_sol_panel_degis)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-white flex items-center justify-between">
                <span>Düğüm Kütüphanesi (Sol)</span>
                <span className="text-cyan-400">{sol_panel_acik ? '✓' : ''}</span>
              </button>
              <button onClick={() => islem_yap(on_sag_panel_degis)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-white flex items-center justify-between">
                <span>Denetçi & Gezgin (Sağ)</span>
                <span className="text-cyan-400">{sag_panel_acik ? '✓' : ''}</span>
              </button>
              <button onClick={() => islem_yap(on_alt_panel_degis)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-white flex items-center justify-between">
                <span>Konsol & Kod Paneli (Alt)</span>
                <span className="text-cyan-400">{alt_panel_acik ? '✓' : ''}</span>
              </button>
              <div className="h-px bg-slate-800 my-1" />
              <button onClick={() => islem_yap(on_izgara_degis)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-white flex items-center justify-between">
                <span>Canvas Izgara Görünümü</span>
                <span className="text-cyan-400">{izgara_acik ? '✓' : ''}</span>
              </button>
            </div>
          )}
        </div>

        {/* Derle & Çalıştır Menüsü */}
        <div className="relative">
          <button 
            onClick={() => menu_tikla('calistir')}
            className={`px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors ${aktif_menu === 'calistir' ? 'bg-slate-800 text-white' : ''}`}
          >
            Yürüt
          </button>
          {aktif_menu === 'calistir' && (
            <div className="absolute left-0 top-full mt-1 w-56 bg-slate-900 border border-slate-700 rounded-md shadow-2xl py-1 z-50">
              <button onClick={() => islem_yap(on_calistir)} className="w-full px-3 py-1.5 text-left hover:bg-emerald-950/60 hover:text-emerald-300 flex items-center justify-between text-emerald-400 font-medium">
                <span className="flex items-center gap-2"><Play className="w-3.5 h-3.5 fill-current" /> Projeyi Çalıştır</span>
                <span className="text-[10px] text-slate-500">F5</span>
              </button>
              <button onClick={() => islem_yap(on_derle)} className="w-full px-3 py-1.5 text-left hover:bg-cyan-950/60 hover:text-cyan-300 flex items-center justify-between text-cyan-400">
                <span className="flex items-center gap-2"><Code2 className="w-3.5 h-3.5" /> Doğrula ve Derle</span>
                <span className="text-[10px] text-slate-500">Ctrl+B</span>
              </button>
            </div>
          )}
        </div>

        {/* Yardım Menüsü */}
        <div className="relative">
          <button 
            onClick={() => menu_tikla('yardim')}
            className={`px-2.5 py-1 rounded hover:bg-slate-800 hover:text-white transition-colors ${aktif_menu === 'yardim' ? 'bg-slate-800 text-white' : ''}`}
          >
            Yardım
          </button>
          {aktif_menu === 'yardim' && (
            <div className="absolute left-0 top-full mt-1 w-56 bg-slate-900 border border-slate-700 rounded-md shadow-2xl py-1 z-50">
              {on_kilavuz_goster && (
                <button onClick={() => islem_yap(on_kilavuz_goster)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-cyan-300 flex items-center gap-2 text-cyan-400 font-medium">
                  <BookOpen className="w-3.5 h-3.5" /> Detaylı Kullanım Kılavuzu
                </button>
              )}
              <button onClick={() => islem_yap(on_kisayollari_goster)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-white flex items-center gap-2">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" /> Klavye Kısayolları
              </button>
              <button onClick={() => islem_yap(on_hakkinda_goster)} className="w-full px-3 py-1.5 text-left hover:bg-slate-800 hover:text-white flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-purple-400" /> NODEFORGE Hakkında
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Orta Proje Başlığı */}
      <div className="hidden lg:flex items-center gap-2 bg-slate-900/80 px-3 py-1 rounded-full border border-slate-800">
        <FileCode className="w-3.5 h-3.5 text-cyan-400" />
        <span className="font-medium text-slate-200">{proje_adi}</span>
        <span className="text-[10px] bg-slate-800 text-cyan-300 font-mono px-1.5 py-0.5 rounded uppercase">
          {hedef_dil}
        </span>
        {on_kilavuz_goster && (
          <button
            onClick={on_kilavuz_goster}
            className="flex items-center gap-1 text-[11px] bg-cyan-950/80 hover:bg-cyan-900 text-cyan-300 px-2 py-0.5 rounded-full border border-cyan-800/80 transition-colors ml-1"
            title="Detaylı Kullanım Kılavuzunu Aç"
          >
            <BookOpen className="w-3 h-3" />
            <span>Kılavuz</span>
          </button>
        )}
      </div>

      {/* Sağ Durum ve Geliştirici İmzası */}
      <div className="flex items-center gap-2.5">
        {/* Hedef Dil Seçici (7 Dil Desteği) */}
        <div className="flex items-center bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 gap-1">
          <Globe className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
          <span className="text-[10px] text-slate-500 font-medium">Dil:</span>
          <select 
            value={hedef_dil} 
            onChange={(e) => on_dil_degistir(e.target.value as dil_secenegi)}
            className="bg-transparent text-cyan-400 text-xs font-semibold focus:outline-none cursor-pointer"
          >
            {DIL_KATALOGU.map(d => (
              <option key={d.kod} value={d.kod} className="bg-slate-900 text-slate-200">
                {d.ad}
              </option>
            ))}
          </select>
          {on_dil_modal_ac && (
            <button
              onClick={on_dil_modal_ac}
              title="Detaylı Dil Kataloğu ve Seçici"
              className="p-0.5 text-slate-400 hover:text-cyan-300 rounded"
            >
              <Sparkles className="w-3 h-3 text-cyan-400" />
            </button>
          )}
        </div>

        {/* Motor Durumu */}
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-950/40 border border-emerald-800/40 text-emerald-400 text-[11px] font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>{calisiyor_mu ? 'Çalışıyor...' : 'Hazır'}</span>
        </div>

        {/* Geliştirici İmzası */}
        <div className="hidden sm:flex items-center text-[11px] font-mono text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded border border-slate-800/80">
          <span className="text-slate-500 mr-1">İmza:</span>
          <span className="text-cyan-300 font-semibold tracking-wide">Developed By K7~</span>
        </div>
      </div>
    </header>
  );
};
