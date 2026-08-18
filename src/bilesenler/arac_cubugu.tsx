/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Hizli Erisim Arac Cubugu (Toolbar)
 */

import React from 'react';
import { 
  Play, 
  Code2, 
  FileCode,
  Save, 
  Undo2, 
  Redo2, 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Grid, 
  Magnet, 
  Plus, 
  FilePlus, 
  Loader2,
  Trash2
} from 'lucide-react';
import { BilgiKutusu } from './bilgi_kutusu';

interface arac_cubugu_ozellikleri {
  olcek: number;
  izgara_acik: boolean;
  hizalama_acik: boolean;
  calisiyor_mu: boolean;
  geri_alinabilir_mi: boolean;
  yinelenebilir_mi: boolean;
  secili_sayisi?: number;
  on_secilileri_sil?: () => void;
  on_yeni_proje: () => void;
  on_kaydet: () => void;
  on_geri_al: () => void;
  on_yinele: () => void;
  on_yakinlastir: () => void;
  on_uzaklastir: () => void;
  on_olcek_sifirla: () => void;
  on_ortala: () => void;
  on_izgara_degis: () => void;
  on_hizalama_degis: () => void;
  on_arama_ac: () => void;
  on_calistir: () => void;
  on_derle: () => void;
  on_kaynak_koda_ekle?: () => void;
}

export const AracCubugu: React.FC<arac_cubugu_ozellikleri> = ({
  olcek,
  izgara_acik,
  hizalama_acik,
  calisiyor_mu,
  geri_alinabilir_mi,
  yinelenebilir_mi,
  secili_sayisi = 0,
  on_secilileri_sil,
  on_yeni_proje,
  on_kaydet,
  on_geri_al,
  on_yinele,
  on_yakinlastir,
  on_uzaklastir,
  on_olcek_sifirla,
  on_ortala,
  on_izgara_degis,
  on_hizalama_degis,
  on_arama_ac,
  on_calistir,
  on_derle,
  on_kaynak_koda_ekle
}) => {
  return (
    <div className="h-11 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-3 text-xs select-none shadow-sm z-40">
      {/* Sol Grup: Temel Dosya & Geçmiş İşlemleri */}
      <div className="flex items-center gap-1.5">
        <button
          onClick={on_yeni_proje}
          title="Yeni Proje (Ctrl+N)"
          className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/60 transition-colors flex items-center gap-1"
        >
          <FilePlus className="w-4 h-4 text-cyan-400" />
          <span className="hidden sm:inline font-medium">Yeni</span>
        </button>

        <button
          onClick={on_kaydet}
          title="Kaydet (Ctrl+S)"
          className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700/60 transition-colors flex items-center gap-1"
        >
          <Save className="w-4 h-4 text-emerald-400" />
          <span className="hidden sm:inline font-medium">Kaydet</span>
        </button>

        <div className="h-4 w-px bg-slate-700/80 mx-1" />

        <button
          onClick={on_geri_al}
          disabled={!geri_alinabilir_mi}
          title="Geri Al (Ctrl+Z)"
          className={`p-1.5 rounded border transition-colors ${
            geri_alinabilir_mi 
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
              : 'bg-slate-900/50 text-slate-600 border-transparent cursor-not-allowed'
          }`}
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          onClick={on_yinele}
          disabled={!yinelenebilir_mi}
          title="Yinele (Ctrl+Y)"
          className={`p-1.5 rounded border transition-colors ${
            yinelenebilir_mi 
              ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700' 
              : 'bg-slate-900/50 text-slate-600 border-transparent cursor-not-allowed'
          }`}
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <div className="h-4 w-px bg-slate-700/80 mx-1" />

        {/* Hızlı Düğüm Ekleme / Arama */}
        <button
          onClick={on_arama_ac}
          title="Düğüm Ara & Ekle (Space / Tab)"
          className="px-2.5 py-1.5 rounded bg-cyan-950/70 hover:bg-cyan-900/80 text-cyan-300 border border-cyan-700/50 transition-colors flex items-center gap-1.5 font-medium shadow-sm shadow-cyan-950"
        >
          <Plus className="w-3.5 h-3.5 text-cyan-400" />
          <span>Düğüm Ekle</span>
          <span className="text-[10px] bg-cyan-900/60 px-1 py-0.2 rounded text-cyan-300 font-mono ml-1">Space</span>
        </button>

        {/* Seçili Düğümleri Silme Butonu */}
        {secili_sayisi > 0 && on_secilileri_sil && (
          <button
            type="button"
            onClick={on_secilileri_sil}
            title="Seçili Düğümleri Sil (Delete / Backspace)"
            className="px-2.5 py-1.5 rounded bg-red-950/80 hover:bg-red-900 text-red-300 hover:text-white border border-red-700/60 transition-all flex items-center gap-1.5 font-medium shadow-sm animate-in fade-in zoom-in-95 duration-100"
          >
            <Trash2 className="w-3.5 h-3.5 text-red-400" />
            <span>Sil ({secili_sayisi})</span>
            <span className="text-[10px] bg-red-900/80 px-1 py-0.2 rounded text-red-200 font-mono ml-0.5">Del</span>
          </button>
        )}

        <BilgiKutusu
          baslik="Hızlı Araç Çubuğu"
          aciklama="Yeni proje açma, kaydetme, sınırsız geri/ileri alma, tuval yakınlaştırma, ızgaraya yapışma (snapping) ve hızlı çalıştırma araçları."
          boyut="kucuk"
        />
      </div>

      {/* Orta Grup: Navigasyon ve Görünüm Kontrolleri */}
      <div className="flex items-center gap-1 bg-slate-950/70 px-2 py-1 rounded-lg border border-slate-800">
        <button
          onClick={on_uzaklastir}
          title="Uzaklaştır"
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <ZoomOut className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={on_olcek_sifirla}
          title="Ölçeği Sıfırla (%100)"
          className="px-1.5 py-0.5 rounded hover:bg-slate-800 text-slate-300 font-mono text-[11px] min-w-[45px] text-center"
        >
          %{Math.round(olcek * 100)}
        </button>

        <button
          onClick={on_yakinlastir}
          title="Yakınlaştır"
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <ZoomIn className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={on_ortala}
          title="Grafiğe Odaklan (Home)"
          className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
        >
          <Maximize2 className="w-3.5 h-3.5" />
        </button>

        <div className="h-3.5 w-px bg-slate-800 mx-1" />

        <button
          onClick={on_izgara_degis}
          title={izgara_acik ? "Izgarayı Gizle" : "Izgarayı Göster"}
          className={`p-1 rounded transition-colors ${
            izgara_acik ? 'bg-cyan-950 text-cyan-400' : 'hover:bg-slate-800 text-slate-500'
          }`}
        >
          <Grid className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={on_hizalama_degis}
          title={hizalama_acik ? "Izgaraya Hizalama Aktif" : "Serbest Konumlandırma"}
          className={`p-1 rounded transition-colors ${
            hizalama_acik ? 'bg-cyan-950 text-cyan-400' : 'hover:bg-slate-800 text-slate-500'
          }`}
        >
          <Magnet className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Sağ Grup: Derle, Kaynak Koda Ekle ve Çalıştır Butonları */}
      <div className="flex items-center gap-2">
        {/* Derleme Butonu */}
        <button
          onClick={on_derle}
          title="Grafiği Doğrula ve Kod Derle (Ctrl+B)"
          className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 flex items-center gap-1.5 font-medium transition-colors"
        >
          <Code2 className="w-3.5 h-3.5 text-cyan-400" />
          <span>Derle</span>
          <span className="text-[10px] text-slate-400 font-mono hidden md:inline">Ctrl+B</span>
        </button>

        {/* Kaynak Koda Ekle / Aktar Butonu */}
        {on_kaynak_koda_ekle && (
          <button
            onClick={on_kaynak_koda_ekle}
            title="Görsel Grafiği Kaynak Koda Dönüştür ve Proje Dosyasına Ekle"
            className="px-3 py-1.5 rounded bg-gradient-to-r from-amber-950/80 to-amber-900/60 hover:from-amber-900 hover:to-amber-800 text-amber-300 hover:text-amber-100 border border-amber-600/60 flex items-center gap-1.5 font-medium shadow-sm transition-all"
          >
            <FileCode className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Kaynak Koda Ekle</span>
          </button>
        )}

        {/* Çalıştır Butonu */}
        <button
          onClick={on_calistir}
          disabled={calisiyor_mu}
          title="Projeyi Yürüt (F5)"
          className={`px-4 py-1.5 rounded font-semibold text-white flex items-center gap-2 shadow-md transition-all ${
            calisiyor_mu 
              ? 'bg-emerald-700 opacity-80 cursor-wait' 
              : 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 shadow-emerald-950'
          }`}
        >
          {calisiyor_mu ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <Play className="w-4 h-4 fill-white text-white" />
          )}
          <span>{calisiyor_mu ? 'Yürütülüyor...' : 'Çalıştır'}</span>
          <span className="text-[10px] bg-emerald-800/80 px-1 py-0.2 rounded text-emerald-200 font-mono hidden md:inline">F5</span>
        </button>
      </div>
    </div>
  );
};
