/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Klavye Kisayollari Rehberi
 */

import React from 'react';
import { X, Keyboard } from 'lucide-react';

interface kisayol_rehberi_ozellikleri {
  acik: boolean;
  on_kapat: () => void;
}

const KISAYOLLAR = [
  { tus: 'Space / Tab', aciklama: 'Hızlı düğüm arama ve ekleme menüsünü açar' },
  { tus: 'F5', aciklama: 'Projeyi anında yürütür ve konsol çıktısını açar' },
  { tus: 'Ctrl + B', aciklama: 'Grafiği doğrular ve kaynak kodu derler' },
  { tus: 'Ctrl + S', aciklama: 'Mevcut projeyi tarayıcıya/sunucuya kaydeder' },
  { tus: 'Ctrl + Z', aciklama: 'Son yapılan işlemi geri alır' },
  { tus: 'Ctrl + Y', aciklama: 'Geri alınan işlemi yineler' },
  { tus: 'Ctrl + C', aciklama: 'Seçili düğümleri panoya kopyalar' },
  { tus: 'Ctrl + V', aciklama: 'Kopyalanan düğümleri tuvale yapıştırır' },
  { tus: 'Ctrl + D', aciklama: 'Seçili düğümü anında çoğaltır' },
  { tus: 'Delete / Backspace', aciklama: 'Seçili düğüm veya kablo bağlantısını siler' },
  { tus: 'Fare Tekerleği', aciklama: 'İmlecin bulunduğu noktaya yakınlaştırır / uzaklaştırır' },
  { tus: 'Orta Tık / Alt + Sürükle', aciklama: 'Tuvali serbestçe kaydırır (Pan)' },
  { tus: 'Sağ Tık (Tuval)', aciklama: 'Yeni düğüm ekleme ve genel işlem menüsünü açar' },
  { tus: 'Sağ Tık (Kablo)', aciklama: 'Tıklanan bağlantı kablosunu anında kaldırır' }
];

export const KisayolRehberi: React.FC<kisayol_rehberi_ozellikleri> = ({ acik, on_kapat }) => {
  if (!acik) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 select-none animate-in fade-in duration-150">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-lg rounded-xl shadow-2xl overflow-hidden flex flex-col text-xs text-slate-300">
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
            <Keyboard className="w-4 h-4" />
            <span>Klavye ve Fare Kısayolları</span>
          </div>
          <button
            onClick={on_kapat}
            className="p-1 rounded text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto max-h-[60vh] space-y-2">
          {KISAYOLLAR.map((k, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded bg-slate-950/70 border border-slate-800/80">
              <span className="font-mono bg-slate-800 text-cyan-300 px-2 py-0.5 rounded text-[11px] font-semibold">
                {k.tus}
              </span>
              <span className="text-slate-300 text-right text-[11px] ml-4">{k.aciklama}</span>
            </div>
          ))}
        </div>

        <div className="p-3 bg-slate-950 border-t border-slate-800 text-center text-[11px] font-mono text-slate-500">
          NODEFORGE — <span className="text-cyan-400">Developed By K7~</span>
        </div>
      </div>
    </div>
  );
};
