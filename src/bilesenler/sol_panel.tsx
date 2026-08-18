/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Sol Panel: Dugum Kutuphanesi, Degiskenler ve Fonksiyonlar
 */

import React, { useState } from 'react';
import { 
  Library, 
  Variable, 
  Code, 
  Search, 
  Plus, 
  Trash2, 
  Play, 
  GitBranch, 
  Repeat, 
  Clock, 
  ArrowUpRight, 
  CornerDownRight, 
  Scale, 
  Binary, 
  GitFork, 
  Plus as MathPlus, 
  Minus, 
  X, 
  Divide, 
  FileText, 
  Scissors, 
  Zap, 
  Terminal, 
  FolderOpen
} from 'lucide-react';
import { dugum_kategorisi, degisken_tanimi, veri_tipi, fonksiyon_tanimi, dosya_tanimi, dil_secenegi } from '../tipler/grafik_tipleri';
import { dugum_katalogu, dugum_sablonu, kategori_bilgileri } from '../tanimlar/dugum_katalogu';
import { BilgiKutusu } from './bilgi_kutusu';
import { DosyaGezgini } from './dosya_gezgini';

interface sol_panel_ozellikleri {
  acik: boolean;
  degiskenler: degisken_tanimi[];
  fonksiyonlar: fonksiyon_tanimi[];
  dosyalar: dosya_tanimi[];
  aktif_dosya_id: string;
  hedef_dil: dil_secenegi;
  on_dugum_ekle: (sablon: dugum_sablonu, x?: number, y?: number) => void;
  on_degisken_ekle: (ad: string, tip: veri_tipi, varsayilan: any, aciklama?: string) => void;
  on_degisken_sil: (id: string) => void;
  on_fonksiyon_ekle: (ad: string, donus_tipi: veri_tipi) => void;
  on_dosya_sec: (id: string) => void;
  on_dosya_olustur: (ad: string, tur: 'grafik' | 'kod' | 'yapilandirma' | 'veri' | 'diger', icerik?: string) => void;
  on_dosya_sil: (id: string) => void;
  on_dosya_adi_degistir: (id: string, yeni_ad: string) => void;
}

const ikon_haritasi: Record<string, React.ElementType> = {
  Play,
  GitBranch,
  Repeat,
  Clock,
  Variable,
  ArrowUpRight,
  CornerDownRight,
  Scale,
  Binary,
  GitFork,
  Plus: MathPlus,
  Minus,
  X,
  Divide,
  FileText,
  Scissors,
  Zap,
  Terminal,
  Code,
  FolderOpen
};

export const SolPanel: React.FC<sol_panel_ozellikleri> = ({
  acik,
  degiskenler,
  fonksiyonlar,
  dosyalar,
  aktif_dosya_id,
  hedef_dil,
  on_dugum_ekle,
  on_degisken_ekle,
  on_degisken_sil,
  on_fonksiyon_ekle,
  on_dosya_sec,
  on_dosya_olustur,
  on_dosya_sil,
  on_dosya_adi_degistir
}) => {
  const [aktif_sekme, set_aktif_sekme] = useState<'kutuphane' | 'dosyalar' | 'degiskenler' | 'fonksiyonlar'>('kutuphane');
  const [arama_metni, set_arama_metni] = useState('');
  const [secili_kategori, set_secili_kategori] = useState<string>('hepsi');
  const [yeni_degisken_acik, set_yeni_degisken_acik] = useState(false);

  // Yeni Değişken Form State
  const [yeni_var_ad, set_yeni_var_ad] = useState('');
  const [yeni_var_tip, set_yeni_var_tip] = useState<veri_tipi>('sayi');
  const [yeni_var_deger, set_yeni_var_deger] = useState<string>('0');

  // Yeni Fonksiyon Form State
  const [yeni_fn_acik, set_yeni_fn_acik] = useState(false);
  const [yeni_fn_ad, set_yeni_fn_ad] = useState('');

  if (!acik) return null;

  // Düğüm filtreleme
  const filtrelenmis_dugumler = dugum_katalogu.filter(d => {
    const arama_uygun = d.baslik.toLowerCase().includes(arama_metni.toLowerCase()) ||
      d.aciklama.toLowerCase().includes(arama_metni.toLowerCase()) ||
      d.kategori.toLowerCase().includes(arama_metni.toLowerCase());
    
    if (secili_kategori === 'hepsi') return arama_uygun;
    return arama_uygun && d.kategori === secili_kategori;
  });

  const degisken_kaydet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeni_var_ad.trim()) return;
    let islenmis_deger: any = yeni_var_deger;
    if (yeni_var_tip === 'sayi') islenmis_deger = Number(yeni_var_deger) || 0;
    if (yeni_var_tip === 'mantiksal') islenmis_deger = yeni_var_deger === 'true';

    on_degisken_ekle(yeni_var_ad.trim(), yeni_var_tip, islenmis_deger);
    set_yeni_var_ad('');
    set_yeni_var_deger('0');
    set_yeni_degisken_acik(false);
  };

  const fonksiyon_kaydet = (e: React.FormEvent) => {
    e.preventDefault();
    if (!yeni_fn_ad.trim()) return;
    on_fonksiyon_ekle(yeni_fn_ad.trim(), 'herhangi');
    set_yeni_fn_ad('');
    set_yeni_fn_acik(false);
  };

  return (
    <aside className="w-80 bg-slate-950/95 border-r border-slate-800 flex flex-col h-[calc(100vh-84px)] z-30 select-none backdrop-blur-sm">
      {/* Üst Sekme Başlıkları */}
      <div className="flex border-b border-slate-800 bg-slate-900/50 p-1 gap-1 text-xs">
        <button
          onClick={() => set_aktif_sekme('kutuphane')}
          className={`flex-1 py-1.5 rounded flex items-center justify-center gap-1 font-medium transition-colors ${
            aktif_sekme === 'kutuphane' 
              ? 'bg-slate-800 text-cyan-400 shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
          title="Düğüm Kütüphanesi"
        >
          <Library className="w-3.5 h-3.5" />
          <span>Kütüphane</span>
        </button>

        <button
          onClick={() => set_aktif_sekme('dosyalar')}
          className={`flex-1 py-1.5 rounded flex items-center justify-center gap-1 font-medium transition-colors ${
            aktif_sekme === 'dosyalar' 
              ? 'bg-slate-800 text-cyan-400 shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
          title="Proje Dosya Gezgini"
        >
          <FolderOpen className="w-3.5 h-3.5" />
          <span>Dosyalar ({dosyalar?.length || 0})</span>
        </button>

        <button
          onClick={() => set_aktif_sekme('degiskenler')}
          className={`flex-1 py-1.5 rounded flex items-center justify-center gap-1 font-medium transition-colors ${
            aktif_sekme === 'degiskenler' 
              ? 'bg-slate-800 text-cyan-400 shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
          title="Değişkenler"
        >
          <Variable className="w-3.5 h-3.5" />
          <span>Değişken</span>
        </button>

        <button
          onClick={() => set_aktif_sekme('fonksiyonlar')}
          className={`flex-1 py-1.5 rounded flex items-center justify-center gap-1 font-medium transition-colors ${
            aktif_sekme === 'fonksiyonlar' 
              ? 'bg-slate-800 text-cyan-400 shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
          title="Fonksiyonlar"
        >
          <Code className="w-3.5 h-3.5" />
          <span>Fn</span>
        </button>
      </div>

      {/* SEKME: DOSYA GEZGİNİ */}
      {aktif_sekme === 'dosyalar' && (
        <div className="flex-1 flex flex-col min-h-0">
          <DosyaGezgini
            dosyalar={dosyalar || []}
            aktif_dosya_id={aktif_dosya_id}
            hedef_dil={hedef_dil}
            on_dosya_sec={on_dosya_sec}
            on_dosya_olustur={on_dosya_olustur}
            on_dosya_sil={on_dosya_sil}
            on_dosya_adi_degistir={on_dosya_adi_degistir}
          />
        </div>
      )}

      {/* SEKME 1: DÜĞÜM KÜTÜPHANESİ */}
      {aktif_sekme === 'kutuphane' && (
        <div className="flex-1 flex flex-col min-h-0">
          {/* Arama Alanı */}
          <div className="p-3 border-b border-slate-800 bg-slate-950">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[11px] font-semibold text-slate-400 uppercase">Düğüm Arama</span>
              <BilgiKutusu
                baslik="Düğüm Kütüphanesi"
                aciklama="NODEFORGE'un tüm akış, mantık, matematik, metin ve sistem düğümlerini içerir. Düğümleri tuvale sürükleyip bırakabilir veya tıklayarak ekleyebilirsiniz."
                ipucu="Tuval üzerinde Space veya Tab tuşuna basarak hızlı arama açabilirsiniz."
                boyut="kucuk"
              />
            </div>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Düğüm ara... (örn: If, Karşılaştır, For)"
                value={arama_metni}
                onChange={(e) => set_arama_metni(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-slate-900 border border-slate-800 rounded text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
              />
            </div>

            {/* Kategori Filtre Butonları */}
            <div className="flex gap-1 overflow-x-auto pt-2 pb-0.5 no-scrollbar">
              <button
                onClick={() => set_secili_kategori('hepsi')}
                className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition-colors ${
                  secili_kategori === 'hepsi' 
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60' 
                    : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                }`}
              >
                Tümü ({dugum_katalogu.length})
              </button>
              {(Object.keys(kategori_bilgileri) as dugum_kategorisi[]).map(kat => (
                <button
                  key={kat}
                  onClick={() => set_secili_kategori(kat)}
                  className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition-colors ${
                    secili_kategori === kat 
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60' 
                      : 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                  }`}
                >
                  {kategori_bilgileri[kat].ad}
                </button>
              ))}
            </div>
          </div>

          {/* Düğüm Listesi */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {filtrelenmis_dugumler.length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                Eşleşen düğüm bulunamadı.
              </div>
            ) : (
              filtrelenmis_dugumler.map(sablon => {
                const IkonBileseni = ikon_haritasi[sablon.ikon_adi] || Zap;
                return (
                  <div
                    key={sablon.tip_kodu}
                    onClick={() => on_dugum_ekle(sablon)}
                    draggable
                    onDragStart={(e) => {
                      e.dataTransfer.setData('application/nodeforge-sablon', JSON.stringify(sablon));
                    }}
                    className="p-2 rounded-lg bg-slate-900/70 hover:bg-slate-850 border border-slate-800 hover:border-cyan-800/60 cursor-pointer transition-all hover:translate-x-0.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 overflow-hidden flex-1 min-w-0">
                        <div 
                          className="w-6 h-6 rounded flex items-center justify-center text-white flex-shrink-0 shadow-sm"
                          style={{ backgroundColor: sablon.renk }}
                        >
                          <IkonBileseni className="w-3.5 h-3.5" />
                        </div>
                        <div className="truncate flex-1">
                          <div className="text-xs font-medium text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                            {sablon.baslik}
                          </div>
                          {sablon.alt_baslik && (
                            <div className="text-[10px] text-slate-500 truncate">
                              {sablon.alt_baslik}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <BilgiKutusu
                          baslik={sablon.baslik}
                          aciklama={sablon.aciklama}
                          ipucu={`Kategori: ${sablon.kategori.toUpperCase()}`}
                          boyut="kucuk"
                          portlar={[
                            ...(sablon.girdiler || []).map(g => ({ ad: g.etiket, tip: g.tip, aciklama: 'Girdi Portu' })),
                            ...(sablon.ciktilar || []).map(c => ({ ad: c.etiket, tip: c.tip, aciklama: 'Çıktı Portu' }))
                          ]}
                        />
                        <Plus className="w-3.5 h-3.5 text-slate-600 group-hover:text-cyan-400 opacity-0 group-hover:opacity-100 transition-all" />
                      </div>
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 line-clamp-1">
                      {sablon.aciklama}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* SEKME 2: DEĞİŞKENLER */}
      {aktif_sekme === 'degiskenler' && (
        <div className="flex-1 flex flex-col min-h-0 p-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-300">Proje Değişkenleri</span>
              <BilgiKutusu
                baslik="Değişken Yönetimi"
                aciklama="Projenizde global olarak saklanan verileri (puan, sayaç, kullanıcı verisi vb.) yönetin. Get ve Set düğümleri ile grafiğe bağlayabilirsiniz."
                ipucu="Tüm hedef dillerde (TS, Python, C#, C++, Go, Rust) değişkenler otomatik derlenir."
                boyut="kucuk"
              />
            </div>
            <button
              onClick={() => set_yeni_degisken_acik(!yeni_degisken_acik)}
              className="px-2 py-1 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/60 rounded text-xs flex items-center gap-1 font-medium transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>Yeni Değişken</span>
            </button>
          </div>

          {/* Yeni Değişken Formu */}
          {yeni_degisken_acik && (
            <form onSubmit={degisken_kaydet} className="mt-2 p-2.5 bg-slate-900 rounded-lg border border-cyan-900/60 space-y-2">
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Değişken Adı:</label>
                <input
                  type="text"
                  placeholder="örn: puan, sayac, isim"
                  value={yeni_var_ad}
                  onChange={(e) => set_yeni_var_ad(e.target.value)}
                  className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">Tipi:</label>
                  <select
                    value={yeni_var_tip}
                    onChange={(e) => set_yeni_var_tip(e.target.value as veri_tipi)}
                    className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="sayi">Sayı (number)</option>
                    <option value="metin">Metin (string)</option>
                    <option value="mantiksal">Mantıksal (boolean)</option>
                    <option value="dizi">Dizi (array)</option>
                    <option value="nesne">Nesne (object)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-400 mb-0.5">İlk Değer:</label>
                  <input
                    type="text"
                    value={yeni_var_deger}
                    onChange={(e) => set_yeni_var_deger(e.target.value)}
                    className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => set_yeni_degisken_acik(false)}
                  className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-[11px] hover:bg-slate-700"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-cyan-600 text-white rounded text-[11px] font-medium hover:bg-cyan-500"
                >
                  Ekle
                </button>
              </div>
            </form>
          )}

          {/* Değişkenler Listesi */}
          <div className="flex-1 overflow-y-auto mt-2 space-y-1.5">
            {(degiskenler || []).length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                Henüz değişken tanımlanmadı.
              </div>
            ) : (
              (degiskenler || []).map(deg => (
                <div key={deg.id} className="p-2 bg-slate-900/80 rounded border border-slate-800 flex items-center justify-between group">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-xs text-cyan-300 font-semibold">{deg.ad}</span>
                      <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded font-mono">
                        {deg.tip}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                      Varsayılan: {JSON.stringify(deg.varsayilan_deger)}
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => {
                        const sablon = dugum_katalogu.find(d => d.tip_kodu === 'degisken_getir');
                        if (sablon) {
                          on_dugum_ekle({
                            ...sablon,
                            varsayilan_ozellikler: { degisken_adi: deg.ad }
                          });
                        }
                      }}
                      title="Canvas'a 'Get' Düğümü Ekle"
                      className="px-1.5 py-0.5 bg-slate-800 hover:bg-cyan-900 text-cyan-400 rounded text-[10px] font-mono"
                    >
                      Get
                    </button>
                    <button
                      onClick={() => {
                        const sablon = dugum_katalogu.find(d => d.tip_kodu === 'degisken_ata');
                        if (sablon) {
                          on_dugum_ekle({
                            ...sablon,
                            varsayilan_ozellikler: { degisken_adi: deg.ad }
                          });
                        }
                      }}
                      title="Canvas'a 'Set' Düğümü Ekle"
                      className="px-1.5 py-0.5 bg-slate-800 hover:bg-cyan-900 text-cyan-400 rounded text-[10px] font-mono"
                    >
                      Set
                    </button>
                    <button
                      onClick={() => on_degisken_sil(deg.id)}
                      className="p-1 text-slate-500 hover:text-red-400 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* SEKME 3: FONKSİYONLAR */}
      {aktif_sekme === 'fonksiyonlar' && (
        <div className="flex-1 flex flex-col min-h-0 p-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-semibold text-slate-300">Özel Fonksiyonlar</span>
              <BilgiKutusu
                baslik="Özel Fonksiyonlar"
                aciklama="Tekrar eden mantıkları modüler bloklara ayırın. Her fonksiyon bağımsız bir alt grafik gibi çalışır."
                boyut="kucuk"
              />
            </div>
            <button
              onClick={() => set_yeni_fn_acik(!yeni_fn_acik)}
              className="px-2 py-1 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-800/60 rounded text-xs flex items-center gap-1 font-medium transition-colors"
            >
              <Plus className="w-3 h-3" />
              <span>Yeni Fonksiyon</span>
            </button>
          </div>

          {/* Yeni Fonksiyon Formu */}
          {yeni_fn_acik && (
            <form onSubmit={fonksiyon_kaydet} className="mt-2 p-2.5 bg-slate-900 rounded-lg border border-cyan-900/60 space-y-2">
              <div>
                <label className="block text-[10px] text-slate-400 mb-0.5">Fonksiyon Adı:</label>
                <input
                  type="text"
                  placeholder="örn: puan_kontrolu, hesapla"
                  value={yeni_fn_ad}
                  onChange={(e) => set_yeni_fn_ad(e.target.value)}
                  className="w-full px-2 py-1 bg-slate-950 border border-slate-800 rounded text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>
              <div className="flex justify-end gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => set_yeni_fn_acik(false)}
                  className="px-2 py-1 bg-slate-800 text-slate-400 rounded text-[11px] hover:bg-slate-700"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="px-2.5 py-1 bg-cyan-600 text-white rounded text-[11px] font-medium hover:bg-cyan-500"
                >
                  Oluştur
                </button>
              </div>
            </form>
          )}

          {/* Fonksiyon Listesi */}
          <div className="flex-1 overflow-y-auto mt-2 space-y-1.5">
            {(fonksiyonlar || []).length === 0 ? (
              <div className="text-center py-8 text-slate-500 text-xs">
                Tanımlı fonksiyon bulunmuyor.
              </div>
            ) : (
              (fonksiyonlar || []).map(fn => (
                <div key={fn.id} className="p-2 bg-slate-900/80 rounded border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Code className="w-3.5 h-3.5 text-teal-400" />
                    <div>
                      <span className="font-mono text-xs text-teal-300 font-semibold">{fn.ad}()</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      const sablon = dugum_katalogu.find(d => d.tip_kodu === 'fonksiyon_cagrisi');
                      if (sablon) {
                        on_dugum_ekle({
                          ...sablon,
                          varsayilan_ozellikler: { fonksiyon_adi: fn.ad }
                        });
                      }
                    }}
                    className="px-2 py-0.5 bg-slate-800 hover:bg-teal-900 text-teal-300 rounded text-[10px] font-mono"
                  >
                    Çağır
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </aside>
  );
};
