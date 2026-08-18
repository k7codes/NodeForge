/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Sag Panel: Dugum Denetcisi (Inspector) ve Proje Gezgini (Project Explorer)
 */

import React, { useState } from 'react';
import { 
  Sliders, 
  FolderTree, 
  FileCode, 
  Info, 
  Trash2, 
  Copy, 
  Settings2,
  FileJson
} from 'lucide-react';
import { dugum_tanimi, proje_yapisi } from '../tipler/grafik_tipleri';
import { BilgiKutusu } from './bilgi_kutusu';

interface sag_panel_ozellikleri {
  acik: boolean;
  proje: proje_yapisi;
  secili_dugumler: dugum_tanimi[];
  on_dugum_ozellik_degis: (dugum_id: string, ozellik_adi: string, deger: any) => void;
  on_dugum_sil: (dugum_id: string) => void;
  on_dugum_cogalt: (dugum_id: string) => void;
  on_port_varsayilan_degis: (dugum_id: string, port_id: string, deger: any) => void;
}

export const SagPanel: React.FC<sag_panel_ozellikleri> = ({
  acik,
  proje,
  secili_dugumler,
  on_dugum_ozellik_degis,
  on_dugum_sil,
  on_dugum_cogalt,
  on_port_varsayilan_degis
}) => {
  const [aktif_sekme, set_aktif_sekme] = useState<'denetci' | 'gezgin'>('denetci');
  const ilk_secili = secili_dugumler[0];

  if (!acik) return null;

  return (
    <aside className="w-80 bg-slate-950/95 border-l border-slate-800 flex flex-col h-[calc(100vh-84px)] z-30 select-none backdrop-blur-sm">
      {/* Üst Sekme Butonları */}
      <div className="flex border-b border-slate-800 bg-slate-900/50 p-1 gap-1 text-xs">
        <button
          onClick={() => set_aktif_sekme('denetci')}
          className={`flex-1 py-1.5 rounded flex items-center justify-center gap-1.5 font-medium transition-colors ${
            aktif_sekme === 'denetci' 
              ? 'bg-slate-800 text-cyan-400 shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <Sliders className="w-3.5 h-3.5" />
          <span>Denetçi</span>
        </button>

        <button
          onClick={() => set_aktif_sekme('gezgin')}
          className={`flex-1 py-1.5 rounded flex items-center justify-center gap-1.5 font-medium transition-colors ${
            aktif_sekme === 'gezgin' 
              ? 'bg-slate-800 text-cyan-400 shadow-sm' 
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          <FolderTree className="w-3.5 h-3.5" />
          <span>Proje Gezgini</span>
        </button>
      </div>

      {/* SEKME 1: DÜĞÜM DENETÇİSİ (INSPECTOR) */}
      {aktif_sekme === 'denetci' && (
        <div className="flex-1 overflow-y-auto p-3 text-xs space-y-4">
          {!ilk_secili ? (
            <div className="text-center py-16 text-slate-500 space-y-2">
              <Info className="w-8 h-8 mx-auto text-slate-600" />
              <p className="font-medium text-slate-400">Düğüm Seçilmedi</p>
              <p className="text-[11px] text-slate-600 max-w-[200px] mx-auto">
                Özelliklerini incelemek ve düzenlemek için canvas üzerindeki herhangi bir düğüme tıklayın.
              </p>
            </div>
          ) : (
            <>
              {/* Seçili Düğüm Başlık Kartı */}
              <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ backgroundColor: ilk_secili.renk }}
                    />
                    <span className="font-bold text-slate-100 text-sm">{ilk_secili.baslik}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BilgiKutusu
                      baslik={ilk_secili.baslik}
                      aciklama={ilk_secili.alt_baslik || 'Bu düğümün parametrelerini ve port varsayılan değerlerini denetçi üzerinden düzenleyebilirsiniz.'}
                      ipucu={`Kategori: ${ilk_secili.kategori.toUpperCase()}`}
                      boyut="kucuk"
                    />
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-400">
                      {ilk_secili.kategori}
                    </span>
                  </div>
                </div>

                <div className="text-[10px] text-slate-500 font-mono">
                  ID: <span className="text-slate-400">{ilk_secili.id}</span>
                </div>

                {/* Hızlı Butonlar */}
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      on_dugum_cogalt(ilk_secili.id);
                    }}
                    className="flex-1 py-1.5 bg-slate-800 hover:bg-slate-700 text-cyan-300 rounded flex items-center justify-center gap-1.5 text-xs transition-colors border border-slate-700 hover:border-cyan-500/50 font-medium"
                  >
                    <Copy className="w-3.5 h-3.5" /> Çoğalt
                  </button>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      on_dugum_sil(ilk_secili.id);
                    }}
                    className="flex-1 py-1.5 bg-red-950/60 hover:bg-red-900/80 text-red-300 rounded flex items-center justify-center gap-1.5 text-xs transition-colors border border-red-900/50 hover:border-red-500/50 font-medium"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Düğümü Sil
                  </button>
                </div>
              </div>

              {/* Pozisyon Bilgisi */}
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 space-y-2">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Tuval Konumu</span>
                  <BilgiKutusu
                    baslik="Piksel Koordinatları"
                    aciklama="Düğümün sonsuz ızgara tuvali üzerindeki tam X ve Y koordinatları."
                    boyut="kucuk"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800 text-slate-300 flex justify-between">
                    <span className="text-slate-500">X:</span>
                    <span>{ilk_secili.konum_x}px</span>
                  </div>
                  <div className="bg-slate-950 p-1.5 rounded border border-slate-800 text-slate-300 flex justify-between">
                    <span className="text-slate-500">Y:</span>
                    <span>{ilk_secili.konum_y}px</span>
                  </div>
                </div>
              </div>

              {/* Düğüm Özellikleri (Node Properties) */}
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 space-y-2.5">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Settings2 className="w-3 h-3 text-cyan-400" />
                    <span>Düğüm Parametreleri</span>
                  </div>
                  <BilgiKutusu
                    baslik="Dinamik Parametreler"
                    aciklama="Seçili düğüm türüne göre özel derleme ayarlarını ve parametreleri yapılandırın."
                    boyut="kucuk"
                  />
                </div>

                {/* Dinamik Özellik Form Alanları */}
                {ilk_secili.tip_kodu === 'mantik_karsilastir' && (
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Karşılaştırma Operatörü:</label>
                    <select
                      value={ilk_secili.ozellikler?.operator || '>'}
                      onChange={(e) => on_dugum_ozellik_degis(ilk_secili.id, 'operator', e.target.value)}
                      className="w-full p-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="==">== (Eşit)</option>
                      <option value="!=">!= (Eşit Değil)</option>
                      <option value=">">&gt; (Büyük)</option>
                      <option value="<">&lt; (Küçük)</option>
                      <option value=">=">&gt;= (Büyük Eşit)</option>
                      <option value="<=">&lt;= (Küçük Eşit)</option>
                    </select>
                  </div>
                )}

                {(ilk_secili.tip_kodu === 'degisken_getir' || ilk_secili.tip_kodu === 'degisken_ata' || ilk_secili.tip_kodu === 'degisken_degistir') && (
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Hedef Değişken Adı:</label>
                    <input
                      type="text"
                      value={ilk_secili.ozellikler?.degisken_adi || ''}
                      onChange={(e) => on_dugum_ozellik_degis(ilk_secili.id, 'degisken_adi', e.target.value)}
                      className="w-full p-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
                      placeholder="örn: puan"
                    />
                  </div>
                )}

                {ilk_secili.tip_kodu === 'fonksiyon_cagrisi' && (
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Çağrılacak Fonksiyon Adı:</label>
                    <input
                      type="text"
                      value={ilk_secili.ozellikler?.fonksiyon_adi || ''}
                      onChange={(e) => on_dugum_ozellik_degis(ilk_secili.id, 'fonksiyon_adi', e.target.value)}
                      className="w-full p-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
                      placeholder="fonksiyon_adi"
                    />
                  </div>
                )}

                {ilk_secili.tip_kodu === 'sistem_log' && (
                  <div>
                    <label className="block text-[10px] text-slate-400 mb-1">Günlük Seviyesi:</label>
                    <select
                      value={ilk_secili.ozellikler?.seviye || 'gunluk'}
                      onChange={(e) => on_dugum_ozellik_degis(ilk_secili.id, 'seviye', e.target.value)}
                      className="w-full p-1.5 bg-slate-950 border border-slate-800 rounded text-slate-200 font-mono text-xs focus:outline-none focus:border-cyan-500"
                    >
                      <option value="gunluk">Standart Log (console.log)</option>
                      <option value="uyari">Uyarı (console.warn)</option>
                      <option value="hata">Hata (console.error)</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Girdiler ve Varsayılan Değerler */}
              <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 space-y-2">
                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                  <span>Girdi Portları ({ilk_secili.girdiler?.length || 0})</span>
                  <BilgiKutusu
                    baslik="Girdi Değerleri"
                    aciklama="Eğer bir port bir kabloya bağlı değilse, burada girilen sabit varsayılan değer kullanılır."
                    boyut="kucuk"
                  />
                </div>
                <div className="space-y-1.5">
                  {(ilk_secili.girdiler || []).map(g => (
                    <div key={g.id} className="p-1.5 bg-slate-950 rounded border border-slate-800/80 space-y-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-300 font-mono font-medium">{g.etiket}</span>
                        <span className="text-[10px] text-cyan-400 font-mono bg-slate-900 px-1 py-0.2 rounded">
                          {g.tip}
                        </span>
                      </div>
                      {g.tip !== 'akis' && (
                        <input
                          type={g.tip === 'sayi' ? 'number' : 'text'}
                          value={g.varsayilan_deger !== undefined ? String(g.varsayilan_deger) : ''}
                          onChange={(e) => {
                            const v = g.tip === 'sayi' ? Number(e.target.value) : e.target.value;
                            on_port_varsayilan_degis(ilk_secili.id, g.id, v);
                          }}
                          placeholder="Varsayılan Değer"
                          className="w-full bg-slate-900 border border-slate-800 rounded px-1.5 py-0.5 text-[11px] font-mono text-cyan-300 focus:outline-none focus:border-cyan-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* SEKME 2: PROJE GEZGİNİ (PROJECT EXPLORER) */}
      {aktif_sekme === 'gezgin' && (
        <div className="flex-1 overflow-y-auto p-3 text-xs space-y-3">
          {/* Proje Meta Bilgileri */}
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
            <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 flex items-center justify-between">
              <span>Proje Bilgileri</span>
              <BilgiKutusu
                baslik="Proje Manifestosu"
                aciklama="Aktif projenin adı, derleme hedef dili ve geliştirici imzasını görüntüler."
                boyut="kucuk"
              />
            </div>
            <div className="space-y-1.5 text-slate-300">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Adı:</span>
                <span className="font-semibold text-white">{proje.ayarlar.proje_adi}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Sürüm:</span>
                <span className="font-mono text-cyan-400">{proje.ayarlar.surum}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Hedef Dil:</span>
                <span className="font-mono uppercase text-emerald-400">{proje.ayarlar.hedef_dil}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Giriş Dosyası:</span>
                <span className="font-mono text-amber-300">{proje.ayarlar.giris_noktasi}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Geliştirici:</span>
                <span className="text-cyan-300 font-medium">Developed By K7~</span>
              </div>
            </div>
          </div>

          {/* Dosya Ağacı */}
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 space-y-2">
            <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
              Çalışma Alanı Dosyaları
            </div>
            <div className="space-y-1 font-mono text-[11px]">
              <div className="p-1.5 bg-slate-950 rounded border border-cyan-900/60 flex items-center justify-between text-cyan-300">
                <span className="flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-cyan-400" />
                  {proje.ayarlar.giris_noktasi}
                </span>
                <span className="text-[10px] text-slate-500">Üretilen</span>
              </div>
              <div className="p-1.5 bg-slate-950 rounded border border-slate-800 flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <FileJson className="w-3.5 h-3.5 text-amber-400" />
                  project.nodeforge
                </span>
                <span className="text-[10px] text-slate-500">Grafik Verisi</span>
              </div>
              <div className="p-1.5 bg-slate-950 rounded border border-slate-800 flex items-center justify-between text-slate-300">
                <span className="flex items-center gap-1.5">
                  <FileCode className="w-3.5 h-3.5 text-emerald-400" />
                  package.json
                </span>
                <span className="text-[10px] text-slate-500">Yapılandırma</span>
              </div>
            </div>
          </div>

          {/* İstatistikler */}
          <div className="p-3 bg-slate-900/60 rounded-lg border border-slate-800/80 space-y-2">
            <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400">
              Grafik İstatistikleri
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <div className="text-lg font-bold text-cyan-400 font-mono">{proje.dugumler?.length || 0}</div>
                <div className="text-[10px] text-slate-500">Toplam Düğüm</div>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <div className="text-lg font-bold text-purple-400 font-mono">{proje.baglantilar?.length || 0}</div>
                <div className="text-[10px] text-slate-500">Bağlantı Sayısı</div>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <div className="text-lg font-bold text-amber-400 font-mono">{proje.degiskenler?.length || 0}</div>
                <div className="text-[10px] text-slate-500">Değişken Sayısı</div>
              </div>
              <div className="p-2 bg-slate-950 rounded border border-slate-800">
                <div className="text-lg font-bold text-emerald-400 font-mono">{proje.fonksiyonlar?.length || 0}</div>
                <div className="text-[10px] text-slate-500">Fonksiyon Sayısı</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};
