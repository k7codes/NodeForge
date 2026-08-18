/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Dahili Metin ve Kod Editoru (Coklu Dosya Destegi)
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Save, 
  Copy, 
  Download, 
  Check, 
  Code2, 
  FileText, 
  Settings, 
  FileCode, 
  Sparkles,
  Info,
  Layers,
  FileCheck
} from 'lucide-react';
import { dosya_tanimi } from '../tipler/grafik_tipleri';

interface metin_kod_editoru_ozellikleri {
  dosya: dosya_tanimi;
  on_kaydet: (dosya_id: string, yeni_icerik: string) => void;
  on_kapat?: () => void;
}

export const MetinKodEditoru: React.FC<metin_kod_editoru_ozellikleri> = ({
  dosya,
  on_kaydet
}) => {
  const [icerik, set_icerik] = useState(dosya.icerik || '');
  const [degisti, set_degisti] = useState(false);
  const [kopyalandi, set_kopyalandi] = useState(false);
  const [kaydedildi, set_kaydedildi] = useState(false);
  const [imlec_konumu, set_imlec_konumu] = useState({ satir: 1, sutun: 1 });
  const textarea_ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    set_icerik(dosya.icerik || '');
    set_degisti(false);
  }, [dosya.id, dosya.icerik]);

  const degisiklik_oldu = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    set_icerik(e.target.value);
    set_degisti(true);
    imlec_guncelle();
  };

  const imlec_guncelle = () => {
    if (!textarea_ref.current) return;
    const pos = textarea_ref.current.selectionStart;
    const metin_onceki = textarea_ref.current.value.substring(0, pos);
    const satirlar = metin_onceki.split('\n');
    set_imlec_konumu({
      satir: satirlar.length,
      sutun: satirlar[satirlar.length - 1].length + 1
    });
  };

  const kaydet = () => {
    on_kaydet(dosya.id, icerik);
    set_degisti(false);
    set_kaydedildi(true);
    setTimeout(() => set_kaydedildi(false), 2000);
  };

  const kopyala = () => {
    navigator.clipboard.writeText(icerik);
    set_kopyalandi(true);
    setTimeout(() => set_kopyalandi(false), 2000);
  };

  const indir = () => {
    const blob = new Blob([icerik], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = dosya.ad;
    a.click();
    URL.revokeObjectURL(url);
  };

  const bicimlendir_json = () => {
    if (dosya.ad.endsWith('.json') || dosya.tur === 'yapilandirma') {
      try {
        const parsed = JSON.parse(icerik);
        const formatli = JSON.stringify(parsed, null, 2);
        set_icerik(formatli);
        set_degisti(true);
      } catch {
        alert('Geçersiz JSON sözdizimi!');
      }
    }
  };

  // Kısayol: Ctrl+S ile kaydet
  const tus_basildi = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey && e.key.toLowerCase() === 's') {
      e.preventDefault();
      kaydet();
    }
    // Tab tuşuna basıldığında 2 boşluk bırak
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const yeni = icerik.substring(0, start) + '  ' + icerik.substring(end);
      set_icerik(yeni);
      set_degisti(true);
      setTimeout(() => {
        if (textarea_ref.current) {
          textarea_ref.current.selectionStart = textarea_ref.current.selectionEnd = start + 2;
        }
      }, 0);
    }
  };

  const satirlar = icerik.split('\n');

  // Dosya türü ikonu
  const ikon_getir = () => {
    if (dosya.ad.endsWith('.ts') || dosya.ad.endsWith('.js')) return <Code2 className="w-4 h-4 text-cyan-400" />;
    if (dosya.ad.endsWith('.py')) return <Code2 className="w-4 h-4 text-emerald-400" />;
    if (dosya.ad.endsWith('.cs') || dosya.ad.endsWith('.cpp')) return <FileCode className="w-4 h-4 text-purple-400" />;
    if (dosya.ad.endsWith('.json')) return <Settings className="w-4 h-4 text-amber-400" />;
    if (dosya.ad.endsWith('.md')) return <FileText className="w-4 h-4 text-blue-400" />;
    return <FileText className="w-4 h-4 text-slate-400" />;
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-slate-950 text-slate-100 select-none overflow-hidden">
      {/* Üst Bilgi ve Eylem Çubuğu */}
      <div className="h-10 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between px-4 text-xs">
        <div className="flex items-center gap-2.5">
          {ikon_getir()}
          <span className="font-semibold text-slate-200 font-mono">{dosya.ad}</span>
          <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">({dosya.yol})</span>
          {degisti && (
            <span className="flex items-center gap-1 text-[10px] bg-amber-950/80 text-amber-300 border border-amber-800/60 px-2 py-0.5 rounded-full font-medium animate-pulse">
              ● Kaydedilmemiş Değişiklik
            </span>
          )}
          {kaydedildi && (
            <span className="flex items-center gap-1 text-[10px] bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 px-2 py-0.5 rounded-full font-medium">
              <Check className="w-3 h-3" /> Kaydedildi
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5">
          {(dosya.ad.endsWith('.json') || dosya.tur === 'yapilandirma') && (
            <button
              onClick={bicimlendir_json}
              className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 text-[11px] border border-slate-700 transition-colors"
              title="JSON Kodunu Biçimlendir"
            >
              <Sparkles className="w-3 h-3 text-amber-400" />
              <span>Biçimlendir</span>
            </button>
          )}

          <button
            onClick={kopyala}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 text-[11px] border border-slate-700 transition-colors"
            title="Tüm İçeriği Kopyala"
          >
            {kopyalandi ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3 text-slate-400" />}
            <span>{kopyalandi ? 'Kopyalandı' : 'Kopyala'}</span>
          </button>

          <button
            onClick={indir}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center gap-1 text-[11px] border border-slate-700 transition-colors"
            title="Dosyayı İndir"
          >
            <Download className="w-3 h-3 text-slate-400" />
            <span>İndir</span>
          </button>

          <button
            onClick={kaydet}
            className={`px-3 py-1 rounded flex items-center gap-1.5 text-[11px] font-semibold border transition-all shadow-sm ${
              degisti
                ? 'bg-cyan-600 hover:bg-cyan-500 text-white border-cyan-500 shadow-cyan-950 animate-pulse'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border-slate-700'
            }`}
            title="Değişiklikleri Kaydet (Ctrl+S)"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Kaydet</span>
            <span className="text-[9px] opacity-70 font-mono hidden md:inline">Ctrl+S</span>
          </button>
        </div>
      </div>

      {/* Ana Kod Editör Alanı (Satır Numaraları + Textarea) */}
      <div className="flex-1 flex overflow-hidden relative font-mono text-xs select-text">
        {/* Sol Satır Numaraları */}
        <div className="w-12 bg-slate-950/90 text-slate-600 select-none py-3 px-2 text-right border-r border-slate-800/80 font-mono overflow-hidden flex-shrink-0">
          {satirlar.map((_, i) => (
            <div 
              key={i} 
              className={`leading-6 ${imlec_konumu.satir === i + 1 ? 'text-cyan-400 font-bold bg-cyan-950/30 -mr-2 pr-2 rounded-l' : ''}`}
            >
              {i + 1}
            </div>
          ))}
        </div>

        {/* Textarea Düzenleyici */}
        <div className="flex-1 relative h-full bg-slate-950">
          <textarea
            ref={textarea_ref}
            value={icerik}
            onChange={degisiklik_oldu}
            onKeyDown={tus_basildi}
            onClick={imlec_guncelle}
            onKeyUp={imlec_guncelle}
            spellCheck={false}
            className="w-full h-full p-3 bg-transparent text-slate-200 resize-none outline-none font-mono text-xs leading-6 selection:bg-cyan-900/60 selection:text-cyan-100 whitespace-pre overflow-auto"
            placeholder="// Buraya kodunuzu veya metninizi yazabilirsiniz..."
          />
        </div>
      </div>

      {/* Alt Durum Çubuğu (Status Bar) */}
      <div className="h-6 bg-slate-900 border-t border-slate-800/80 flex items-center justify-between px-3 text-[11px] text-slate-400 font-mono select-none">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-300">
            <FileCheck className="w-3 h-3 text-cyan-400" />
            <span>{dosya.tur.toUpperCase()}</span>
          </span>
          <span>Satır: <strong className="text-slate-200">{imlec_konumu.satir}</strong>, Sütun: <strong className="text-slate-200">{imlec_konumu.sutun}</strong></span>
          <span>Toplam: <strong className="text-slate-200">{satirlar.length}</strong> satır</span>
          <span>{icerik.length} karakter</span>
        </div>

        <div className="flex items-center gap-3 text-[10px]">
          <span>UTF-8</span>
          <span>Spaces: 2</span>
          <span className="text-cyan-400">NODEFORGE Editor</span>
        </div>
      </div>
    </div>
  );
};
