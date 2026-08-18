/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Grafik Tuvali (Infinite Visual Node Graph Canvas - High FPS & Turbo Dragging Engine)
 */

import React, { useState, useRef, useEffect, useCallback, memo } from 'react';
import { 
  dugum_tanimi, 
  baglanti_tanimi, 
  veri_tipi, 
  port_tanimi 
} from '../tipler/grafik_tipleri';
import { dugum_sablonu, dugum_katalogu } from '../tanimlar/dugum_katalogu';
import { BilgiKutusu } from './bilgi_kutusu';
import { 
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
  Plus as MathPlus, 
  Minus, 
  X, 
  Divide, 
  FileText, 
  Scissors, 
  Zap, 
  Terminal, 
  Code, 
  FolderOpen,
  Trash2,
  Copy,
  Plus,
  Gauge,
  Sparkles
} from 'lucide-react';

interface grafik_tuvali_ozellikleri {
  dugumler: dugum_tanimi[];
  baglantilar: baglanti_tanimi[];
  kaydirma_x: number;
  kaydirma_y: number;
  olcek: number;
  izgara_goster: boolean;
  hizalama_aktif: boolean;
  calisiyor_mu: boolean;
  on_dugum_sec: (dugum_id: string, coklu?: boolean) => void;
  on_secimleri_temizle: () => void;
  on_dugum_tasi: (dugum_id: string, x: number, y: number) => void;
  on_dugum_ekle: (sablon: dugum_sablonu, x: number, y: number) => void;
  on_dugum_sil: (dugum_id: string) => void;
  on_dugum_cogalt: (dugum_id: string) => void;
  on_baglanti_olustur: (k_dugum: string, k_port: string, h_dugum: string, h_port: string, tip: veri_tipi) => boolean;
  on_baglanti_sil: (baglanti_id: string) => void;
  on_gorunum_guncelle: (kaydirma_x: number, kaydirma_y: number, olcek: number) => void;
  on_port_varsayilan_degis: (dugum_id: string, port_id: string, deger: any) => void;
  on_dugum_ozellik_degis: (dugum_id: string, ozellik_adi: string, deger: any) => void;
  on_kopyala: () => void;
  on_yapistir: (x: number, y: number) => void;
}

const PORT_RENKLERI: Record<veri_tipi, string> = {
  akis: '#38bdf8',
  metin: '#ec4899',
  sayi: '#06b6d4',
  mantiksal: '#ef4444',
  dizi: '#f59e0b',
  nesne: '#10b981',
  herhangi: '#a855f7'
};

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

// Yüksek Performanslı Memoize Edilmiş Düğüm Bileşeni (High FPS Sub-Component)
interface DugumBileseniProps {
  dugum: dugum_tanimi;
  baglantilar: baglanti_tanimi[];
  secili: boolean;
  on_dugum_sec: (id: string, coklu?: boolean) => void;
  on_dugum_cogalt: (id: string) => void;
  on_dugum_sil: (id: string) => void;
  on_dugum_ozellik_degis: (id: string, key: string, val: any) => void;
  on_port_varsayilan_degis: (d_id: string, p_id: string, val: any) => void;
  on_surukleme_basla: (e: React.MouseEvent, dugum: dugum_tanimi) => void;
  on_baglanti_cek_basla: (dugum_id: string, port_id: string, tip: veri_tipi, yon: 'girdi' | 'cikti') => void;
  on_baglanti_birak: (dugum_id: string, port_id: string, tip: veri_tipi, yon: 'girdi' | 'cikti') => void;
  on_context_menu: (e: React.MouseEvent, id: string) => void;
}

const DugumKarti = memo<DugumBileseniProps>(({
  dugum,
  baglantilar,
  secili,
  on_dugum_sec,
  on_dugum_cogalt,
  on_dugum_sil,
  on_dugum_ozellik_degis,
  on_port_varsayilan_degis,
  on_surukleme_basla,
  on_baglanti_cek_basla,
  on_baglanti_birak,
  on_context_menu
}) => {
  const IkonBileseni = ikon_haritasi[dugum.ikon_adi] || Zap;
  const sablon_bilgisi = dugum_katalogu.find(s => s.tip_kodu === dugum.tip_kodu);

  return (
    <div
      id={`dugum-${dugum.id}`}
      style={{
        transform: `translate3d(${dugum.konum_x}px, ${dugum.konum_y}px, 0)`,
        width: dugum.genislik || 230,
        willChange: 'transform'
      }}
      onContextMenu={(e) => {
        e.stopPropagation();
        on_context_menu(e, dugum.id);
      }}
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('button') || target.closest('input') || target.closest('select')) {
          return;
        }
        e.stopPropagation();
        on_dugum_sec(dugum.id, e.shiftKey || e.ctrlKey);
      }}
      className={`absolute pointer-events-auto rounded-lg bg-slate-900/95 backdrop-blur-md border shadow-2xl transition-[box-shadow,border-color] duration-100 ${
        secili 
          ? 'border-cyan-400 ring-2 ring-cyan-500/40 shadow-cyan-950/90 shadow-2xl z-30' 
          : 'border-slate-800 hover:border-slate-700 shadow-black/80 z-20'
      }`}
    >
      {/* Düğüm Başlığı (Blueprint Header) */}
      <div
        onMouseDown={(e) => {
          if (e.button === 0) {
            const target = e.target as HTMLElement;
            if (target.closest('button') || target.closest('input') || target.closest('select')) {
              return;
            }
            e.stopPropagation();
            on_surukleme_basla(e, dugum);
          }
        }}
        className="h-9 px-2 rounded-t-lg flex items-center justify-between cursor-grab active:cursor-grabbing border-b border-slate-800/80 select-none"
        style={{
          background: `linear-gradient(to right, ${dugum.renk}33, rgba(15, 23, 42, 0.95))`
        }}
      >
        <div className="flex items-center gap-1.5 overflow-hidden flex-1 min-w-0">
          <div 
            className="w-5 h-5 rounded flex items-center justify-center text-white flex-shrink-0 shadow-sm"
            style={{ backgroundColor: dugum.renk }}
          >
            <IkonBileseni className="w-3 h-3" />
          </div>
          <div className="truncate flex-1">
            <div className="text-xs font-semibold text-white truncate tracking-wide flex items-center gap-1">
              <span>{dugum.baslik}</span>
            </div>
            {dugum.alt_baslik && (
              <div className="text-[9px] text-slate-400 truncate -mt-0.5">
                {dugum.alt_baslik}
              </div>
            )}
          </div>

          {/* Düğüm 'i' Bilgi Kutusu */}
          <BilgiKutusu
            baslik={dugum.baslik}
            aciklama={sablon_bilgisi?.aciklama || dugum.alt_baslik || 'Bu düğüm grafik akışında belirli bir mantığı yürütür.'}
            ipucu={`Kategori: ${dugum.kategori.toUpperCase()}`}
            boyut="kucuk"
            portlar={[
              ...(dugum.girdiler || []).map(g => ({ ad: g.etiket, tip: g.tip, aciklama: 'Girdi Portu' })),
              ...(dugum.ciktilar || []).map(c => ({ ad: c.etiket, tip: c.tip, aciklama: 'Çıktı Portu' }))
            ]}
          />
        </div>

        {/* Aksiyon Butonları */}
        <div 
          className="flex items-center gap-0.5 flex-shrink-0 ml-1.5 z-10" 
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              on_dugum_cogalt(dugum.id);
            }}
            title="Çoğalt (Duplicate)"
            className="p-1 text-slate-400 hover:text-cyan-300 rounded hover:bg-slate-800 transition-colors"
          >
            <Copy className="w-3.5 h-3.5 pointer-events-none" />
          </button>
          <button
            type="button"
            onPointerDown={(e) => e.stopPropagation()}
            onMouseDown={(e) => e.stopPropagation()}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              on_dugum_sil(dugum.id);
            }}
            title="Düğümü Sil (Delete)"
            className="p-1 text-slate-400 hover:text-red-400 rounded hover:bg-red-950/70 hover:border-red-800/50 border border-transparent transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5 pointer-events-none" />
          </button>
        </div>
      </div>

      {/* Düğüm Gövdesi: Portlar & Inline Parametreler */}
      <div className="p-2 space-y-1.5 text-xs">
        {/* Karşılaştırma Düğümü Özel Operatör Seçici */}
        {dugum.tip_kodu === 'mantik_karsilastir' && (
          <div className="px-1.5 py-1 bg-slate-950/70 rounded flex items-center justify-between text-[11px] mb-1 border border-slate-800">
            <span className="text-slate-400 font-mono flex items-center gap-1">
              <span>Op:</span>
              <BilgiKutusu 
                baslik="Karşılaştırma Operatörü"
                aciklama="Sol (A) ve Sağ (B) portlarındaki değerlerin matematiksel/mantıksal kıyaslama kuralı."
                boyut="kucuk"
              />
            </span>
            <select
              value={dugum.ozellikler?.operator || '>'}
              onChange={(e) => on_dugum_ozellik_degis(dugum.id, 'operator', e.target.value)}
              className="bg-slate-900 border border-slate-700 text-cyan-300 rounded px-1.5 py-0.5 text-xs font-mono font-bold focus:outline-none"
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

        {/* Değişken Düğümleri İçin Değişken İsmi Seçici */}
        {(dugum.tip_kodu === 'degisken_getir' || dugum.tip_kodu === 'degisken_ata' || dugum.tip_kodu === 'degisken_degistir') && (
          <div className="px-1.5 py-1 bg-slate-950/70 rounded flex items-center justify-between text-[11px] mb-1 border border-slate-800">
            <span className="text-slate-400 font-mono flex items-center gap-1">
              <span>Değişken:</span>
              <BilgiKutusu 
                baslik="Hedef Değişken"
                aciklama="Okunacak veya üzerine yeni değer yazılacak projedeki hedef değişken ismi."
                boyut="kucuk"
              />
            </span>
            <input
              type="text"
              value={dugum.ozellikler?.degisken_adi || ''}
              onChange={(e) => on_dugum_ozellik_degis(dugum.id, 'degisken_adi', e.target.value)}
              placeholder="değişken"
              className="bg-slate-900 border border-slate-700 text-cyan-300 rounded px-1.5 py-0.5 text-xs font-mono font-semibold w-24 focus:outline-none"
            />
          </div>
        )}

        {/* Port Satırları */}
        <div className="grid grid-cols-2 gap-2">
          {/* Sol Sütun: Girdiler */}
          <div className="space-y-2">
            {(dugum.girdiler || []).map(girdi => {
              const bagli_mi = (baglantilar || []).some(b => b.hedef_port_id === girdi.id);
              const port_rengi = PORT_RENKLERI[girdi.tip];
              const akis_mi = girdi.tip === 'akis';

              return (
                <div key={girdi.id} className="flex items-center gap-1.5 relative group">
                  {/* Port Noktası / Soketi */}
                  <div
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      if (e.button === 0) {
                        on_baglanti_cek_basla(dugum.id, girdi.id, girdi.tip, 'girdi');
                      }
                    }}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      on_baglanti_birak(dugum.id, girdi.id, girdi.tip, 'girdi');
                    }}
                    className={`w-3.5 h-3.5 -ml-4 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-125 border ${
                      akis_mi 
                        ? 'rounded-none rotate-45 border-white bg-slate-900' 
                        : 'border-slate-700 bg-slate-900'
                    }`}
                    style={{
                      borderColor: port_rengi,
                      backgroundColor: bagli_mi ? port_rengi : 'transparent'
                    }}
                    title={`${girdi.etiket} (${girdi.tip}) - Bağlamak için sürükleyin`}
                  >
                    {akis_mi && <span className="w-1.5 h-1.5 bg-white block" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] text-slate-300 font-mono flex items-center gap-1 truncate" title={girdi.etiket}>
                      <span className="truncate">{girdi.etiket}</span>
                      <span className="text-[8px] text-slate-500 font-mono">[{girdi.tip.substring(0, 3)}]</span>
                    </span>
                    {/* Bağlı değilse inline değer alanı */}
                    {!bagli_mi && !akis_mi && (
                      <input
                        type={girdi.tip === 'sayi' ? 'number' : 'text'}
                        value={girdi.varsayilan_deger !== undefined ? String(girdi.varsayilan_deger) : ''}
                        onChange={(e) => {
                          const val = girdi.tip === 'sayi' ? Number(e.target.value) : e.target.value;
                          on_port_varsayilan_degis(dugum.id, girdi.id, val);
                        }}
                        className="w-full bg-slate-950 border border-slate-800 rounded px-1 py-0.5 text-[10px] font-mono text-cyan-200 focus:outline-none focus:border-cyan-500 mt-0.5"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Sağ Sütun: Çıktılar */}
          <div className="space-y-2 text-right">
            {(dugum.ciktilar || []).map(cikti => {
              const bagli_mi = (baglantilar || []).some(b => b.kaynak_port_id === cikti.id);
              const port_rengi = PORT_RENKLERI[cikti.tip];
              const akis_mi = cikti.tip === 'akis';

              return (
                <div key={cikti.id} className="flex items-center justify-end gap-1.5 relative group">
                  <div className="flex-1 min-w-0">
                    <span className="text-[11px] text-slate-300 font-mono flex items-center justify-end gap-1 truncate" title={cikti.etiket}>
                      <span className="text-[8px] text-slate-500 font-mono">[{cikti.tip.substring(0, 3)}]</span>
                      <span className="truncate">{cikti.etiket}</span>
                    </span>
                  </div>

                  {/* Çıktı Port Noktası */}
                  <div
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      if (e.button === 0) {
                        on_baglanti_cek_basla(dugum.id, cikti.id, cikti.tip, 'cikti');
                      }
                    }}
                    onMouseUp={(e) => {
                      e.stopPropagation();
                      on_baglanti_birak(dugum.id, cikti.id, cikti.tip, 'cikti');
                    }}
                    className={`w-3.5 h-3.5 -mr-4 rounded-full flex items-center justify-center cursor-pointer transition-transform hover:scale-125 border ${
                      akis_mi 
                        ? 'rounded-none rotate-45 border-white bg-slate-900' 
                        : 'border-slate-700 bg-slate-900'
                    }`}
                    style={{
                      borderColor: port_rengi,
                      backgroundColor: bagli_mi ? port_rengi : 'transparent'
                    }}
                    title={`${cikti.etiket} (${cikti.tip}) - Bağlamak için sürükleyin`}
                  >
                    {akis_mi && <span className="w-1.5 h-1.5 bg-white block" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
});

export const GrafikTuvali: React.FC<grafik_tuvali_ozellikleri> = ({
  dugumler,
  baglantilar,
  kaydirma_x,
  kaydirma_y,
  olcek,
  izgara_goster,
  hizalama_aktif,
  calisiyor_mu,
  on_dugum_sec,
  on_secimleri_temizle,
  on_dugum_tasi,
  on_dugum_ekle,
  on_dugum_sil,
  on_dugum_cogalt,
  on_baglanti_olustur,
  on_baglanti_sil,
  on_gorunum_guncelle,
  on_port_varsayilan_degis,
  on_dugum_ozellik_degis,
  on_kopyala,
  on_yapistir
}) => {
  const container_ref = useRef<HTMLDivElement>(null);

  // Canlı FPS Ölçüm State'i
  const [canli_fps, set_canli_fps] = useState(60);
  const [fps_sayaci_goster, set_fps_sayaci_goster] = useState(true);
  const kare_sayaci = useRef(0);
  const son_fps_zamani = useRef(performance.now());

  useEffect(() => {
    let animasyon_id: number;
    const fps_hesapla = () => {
      kare_sayaci.current++;
      const simdi = performance.now();
      if (simdi - son_fps_zamani.current >= 500) {
        const fps = Math.round((kare_sayaci.current * 1000) / (simdi - son_fps_zamani.current));
        set_canli_fps(Math.min(fps, 60));
        kare_sayaci.current = 0;
        son_fps_zamani.current = simdi;
      }
      animasyon_id = requestAnimationFrame(fps_hesapla);
    };
    animasyon_id = requestAnimationFrame(fps_hesapla);
    return () => cancelAnimationFrame(animasyon_id);
  }, []);

  // Sürükleme / Pan State
  const [kaydiriliyor, set_kaydiriliyor] = useState(false);
  const [kaydirma_baslangic, set_kaydirma_baslangic] = useState({ x: 0, y: 0 });

  // Ultra Hızlı Node Dragging (RAF Throttled Ref)
  const [tasinan_dugum_id, set_tasinan_dugum_id] = useState<string | null>(null);
  const tasima_ofset_ref = useRef({ x: 0, y: 0 });
  const raf_id_ref = useRef<number | null>(null);

  // Yeni Bağlantı Çekme State
  const [baglanti_cekiliyor, set_baglanti_cekiliyor] = useState<{
    kaynak_dugum_id: string;
    kaynak_port_id: string;
    port_tipi: veri_tipi;
    yon: 'girdi' | 'cikti';
    fare_x: number;
    fare_y: number;
  } | null>(null);

  // Kutu Seçimi (Box Selection)
  const [kutu_secimi, set_kutu_secimi] = useState<{
    basla_x: number;
    basla_y: number;
    su_an_x: number;
    su_an_y: number;
  } | null>(null);

  // Context Menu & Quick Add Menu
  const [context_menu, set_context_menu] = useState<{
    x: number;
    y: number;
    canvas_x: number;
    canvas_y: number;
    dugum_id?: string;
  } | null>(null);

  const [hizli_arama, set_hizli_arama] = useState<{
    x: number;
    y: number;
    canvas_x: number;
    canvas_y: number;
    arama: string;
  } | null>(null);

  const [secili_kablo_id, set_secili_kablo_id] = useState<string | null>(null);

  // Ekran koordinatını Canvas koordinatına çevir
  const ekrandan_canvasa = useCallback((ekran_x: number, ekran_y: number) => {
    if (!container_ref.current) return { x: 0, y: 0 };
    const rect = container_ref.current.getBoundingClientRect();
    const x = (ekran_x - rect.left - kaydirma_x) / olcek;
    const y = (ekran_y - rect.top - kaydirma_y) / olcek;
    return { x, y };
  }, [kaydirma_x, kaydirma_y, olcek]);

  // Fare Tekerleği ile Zoom (Cursor odaklı zoom)
  const fare_tekerlegi = (e: React.WheelEvent) => {
    e.preventDefault();
    if (!container_ref.current) return;
    const rect = container_ref.current.getBoundingClientRect();
    const fare_ekran_x = e.clientX - rect.left;
    const fare_ekran_y = e.clientY - rect.top;

    const zoom_faktor = e.deltaY < 0 ? 1.1 : 0.9;
    const yeni_olcek = Math.min(Math.max(olcek * zoom_faktor, 0.25), 2.5);

    const yeni_kaydirma_x = fare_ekran_x - (fare_ekran_x - kaydirma_x) * (yeni_olcek / olcek);
    const yeni_kaydirma_y = fare_ekran_y - (fare_ekran_y - kaydirma_y) * (yeni_olcek / olcek);

    on_gorunum_guncelle(yeni_kaydirma_x, yeni_kaydirma_y, yeni_olcek);
  };

  // Canvas Üzerinde Fareye Basma
  const canvas_fare_basildi = (e: React.MouseEvent) => {
    if (context_menu) set_context_menu(null);
    if (hizli_arama) set_hizli_arama(null);

    // Pan başlat
    if (e.button === 1 || (e.button === 0 && e.altKey)) {
      set_kaydiriliyor(true);
      set_kaydirma_baslangic({ x: e.clientX - kaydirma_x, y: e.clientY - kaydirma_y });
      return;
    }

    if (e.button === 0 && (e.target === container_ref.current || (e.target as HTMLElement).tagName === 'svg')) {
      if (!e.shiftKey && !e.ctrlKey) {
        on_secimleri_temizle();
      }
      set_secili_kablo_id(null);

      const c = ekrandan_canvasa(e.clientX, e.clientY);
      set_kutu_secimi({ basla_x: c.x, basla_y: c.y, su_an_x: c.x, su_an_y: c.y });
    }
  };

  // High FPS Canvas Fare Hareketi (RAF Destekli)
  const canvas_fare_hareketi = (e: React.MouseEvent) => {
    // 1. Canvas kaydırma
    if (kaydiriliyor) {
      on_gorunum_guncelle(
        e.clientX - kaydirma_baslangic.x,
        e.clientY - kaydirma_baslangic.y,
        olcek
      );
      return;
    }

    // 2. Ultra Akıcı Düğüm Taşıma (Hardware Accelerated High-FPS Dragging)
    if (tasinan_dugum_id) {
      const clientX = e.clientX;
      const clientY = e.clientY;

      if (raf_id_ref.current) {
        cancelAnimationFrame(raf_id_ref.current);
      }

      raf_id_ref.current = requestAnimationFrame(() => {
        const c = ekrandan_canvasa(clientX, clientY);
        let hedef_x = c.x - tasima_ofset_ref.current.x;
        let hedef_y = c.y - tasima_ofset_ref.current.y;

        if (hizalama_aktif) {
          hedef_x = Math.round(hedef_x / 10) * 10;
          hedef_y = Math.round(hedef_y / 10) * 10;
        }

        on_dugum_tasi(tasinan_dugum_id, hedef_x, hedef_y);
      });
      return;
    }

    // 3. Bağlantı çekme
    if (baglanti_cekiliyor) {
      const c = ekrandan_canvasa(e.clientX, e.clientY);
      set_baglanti_cekiliyor({
        ...baglanti_cekiliyor,
        fare_x: c.x,
        fare_y: c.y
      });
      return;
    }

    // 4. Kutu seçimi güncelleme
    if (kutu_secimi) {
      const c = ekrandan_canvasa(e.clientX, e.clientY);
      set_kutu_secimi({ ...kutu_secimi, su_an_x: c.x, su_an_y: c.y });
    }
  };

  // Fare Bırakma
  const canvas_fare_birakildi = () => {
    if (raf_id_ref.current) {
      cancelAnimationFrame(raf_id_ref.current);
      raf_id_ref.current = null;
    }
    set_kaydiriliyor(false);
    set_tasinan_dugum_id(null);
    set_baglanti_cekiliyor(null);

    // Kutu seçimini tamamla
    if (kutu_secimi) {
      const min_x = Math.min(kutu_secimi.basla_x, kutu_secimi.su_an_x);
      const max_x = Math.max(kutu_secimi.basla_x, kutu_secimi.su_an_x);
      const min_y = Math.min(kutu_secimi.basla_y, kutu_secimi.su_an_y);
      const max_y = Math.max(kutu_secimi.basla_y, kutu_secimi.su_an_y);

      dugumler.forEach(d => {
        if (d.konum_x >= min_x && d.konum_x <= max_x && d.konum_y >= min_y && d.konum_y <= max_y) {
          on_dugum_sec(d.id, true);
        }
      });
      set_kutu_secimi(null);
    }
  };

  // Sürükleme Başlatma Callback'i
  const dugum_surukleme_basla = useCallback((e: React.MouseEvent, dugum: dugum_tanimi) => {
    on_dugum_sec(dugum.id, e.shiftKey || e.ctrlKey);
    set_tasinan_dugum_id(dugum.id);
    const c = ekrandan_canvasa(e.clientX, e.clientY);
    tasima_ofset_ref.current = { x: c.x - dugum.konum_x, y: c.y - dugum.konum_y };
  }, [ekrandan_canvasa, on_dugum_sec]);

  // Bağlantı Çekme Başlatma
  const baglanti_cek_baslat = useCallback((dugum_id: string, port_id: string, tip: veri_tipi, yon: 'girdi' | 'cikti') => {
    const dugum = dugumler.find(d => d.id === dugum_id);
    if (!dugum) return;
    set_baglanti_cekiliyor({
      kaynak_dugum_id: dugum_id,
      kaynak_port_id: port_id,
      port_tipi: tip,
      yon,
      fare_x: dugum.konum_x,
      fare_y: dugum.konum_y
    });
  }, [dugumler]);

  // Bağlantı Bırakma
  const baglanti_birak = useCallback((hedef_dugum_id: string, hedef_port_id: string, tip: veri_tipi, yon: 'girdi' | 'cikti') => {
    if (!baglanti_cekiliyor) return;

    if (baglanti_cekiliyor.yon === 'cikti' && yon === 'girdi') {
      on_baglanti_olustur(
        baglanti_cekiliyor.kaynak_dugum_id,
        baglanti_cekiliyor.kaynak_port_id,
        hedef_dugum_id,
        hedef_port_id,
        tip
      );
    } else if (baglanti_cekiliyor.yon === 'girdi' && yon === 'cikti') {
      on_baglanti_olustur(
        hedef_dugum_id,
        hedef_port_id,
        baglanti_cekiliyor.kaynak_dugum_id,
        baglanti_cekiliyor.kaynak_port_id,
        tip
      );
    }
    set_baglanti_cekiliyor(null);
  }, [baglanti_cekiliyor, on_baglanti_olustur]);

  // Sağ Tık Menüsü
  const canvas_sag_tik = (e: React.MouseEvent, dugum_id?: string) => {
    e.preventDefault();
    const c = ekrandan_canvasa(e.clientX, e.clientY);
    set_context_menu({
      x: e.clientX,
      y: e.clientY,
      canvas_x: c.x,
      canvas_y: c.y,
      dugum_id
    });
  };

  // Klavye Kısayolları Listener
  useEffect(() => {
    function klavye_kontrol(e: KeyboardEvent) {
      if ((e.target as HTMLElement).tagName === 'INPUT' || (e.target as HTMLElement).tagName === 'TEXTAREA') {
        return;
      }

      if (e.code === 'Space' && !e.ctrlKey) {
        e.preventDefault();
        if (container_ref.current) {
          set_hizli_arama({
            x: window.innerWidth / 2 - 160,
            y: window.innerHeight / 2 - 200,
            canvas_x: (-kaydirma_x + 300) / olcek,
            canvas_y: (-kaydirma_y + 200) / olcek,
            arama: ''
          });
        }
      }

      if (e.key === 'Delete' || e.key === 'Backspace') {
        if (secili_kablo_id) {
          on_baglanti_sil(secili_kablo_id);
          set_secili_kablo_id(null);
        } else {
          const secili_dugumler = dugumler.filter(d => d.secili);
          secili_dugumler.forEach(d => on_dugum_sil(d.id));
        }
      }
    }

    window.addEventListener('keydown', klavye_kontrol);
    return () => window.removeEventListener('keydown', klavye_kontrol);
  }, [kaydirma_x, kaydirma_y, olcek, secili_kablo_id, on_baglanti_sil, dugumler, on_dugum_sil]);

  // Port Koordinatını Hesapla
  const port_koordinati_bul = useCallback((dugum_id: string, port_id: string, yon: 'girdi' | 'cikti') => {
    const dugum = dugumler.find(d => d.id === dugum_id);
    if (!dugum) return { x: 0, y: 0 };

    const genislik = dugum.genislik || 230;
    const baslik_yuksekligi = 36;
    const port_yuksekligi = 26;

    if (yon === 'girdi') {
      const idx = dugum.girdiler.findIndex(p => p.id === port_id);
      return {
        x: dugum.konum_x,
        y: dugum.konum_y + baslik_yuksekligi + 16 + (idx * port_yuksekligi)
      };
    } else {
      const idx = dugum.ciktilar.findIndex(p => p.id === port_id);
      return {
        x: dugum.konum_x + genislik,
        y: dugum.konum_y + baslik_yuksekligi + 16 + (idx * port_yuksekligi)
      };
    }
  }, [dugumler]);

  // Bezier Eğrisi Yolu
  const bezier_yolu_olustur = (x1: number, y1: number, x2: number, y2: number) => {
    const dx = Math.abs(x2 - x1) * 0.55;
    const p1x = x1 + Math.max(dx, 40);
    const p1y = y1;
    const p2x = x2 - Math.max(dx, 40);
    const p2y = y2;
    return `M ${x1} ${y1} C ${p1x} ${p1y}, ${p2x} ${p2y}, ${x2} ${y2}`;
  };

  return (
    <div
      ref={container_ref}
      onWheel={fare_tekerlegi}
      onMouseDown={canvas_fare_basildi}
      onMouseMove={canvas_fare_hareketi}
      onMouseUp={canvas_fare_birakildi}
      onContextMenu={(e) => canvas_sag_tik(e)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        const veri = e.dataTransfer.getData('application/nodeforge-sablon');
        if (veri) {
          const sablon: dugum_sablonu = JSON.parse(veri);
          const c = ekrandan_canvasa(e.clientX, e.clientY);
          on_dugum_ekle(sablon, c.x, c.y);
        }
      }}
      className="flex-1 h-[calc(100vh-84px)] relative overflow-hidden bg-slate-950 select-none cursor-crosshair"
      style={{
        backgroundImage: izgara_goster 
          ? `radial-gradient(circle, rgba(56, 189, 248, 0.12) 1px, transparent 1px), linear-gradient(to right, rgba(30, 41, 59, 0.25) 1px, transparent 1px), linear-gradient(to bottom, rgba(30, 41, 59, 0.25) 1px, transparent 1px)`
          : 'none',
        backgroundSize: `${24 * olcek}px ${24 * olcek}px, ${120 * olcek}px ${120 * olcek}px, ${120 * olcek}px ${120 * olcek}px`,
        backgroundPosition: `${kaydirma_x}px ${kaydirma_y}px`
      }}
    >
      {/* 1. SVG Bağlantı Kabloları Katmanı */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
        <defs>
          <linearGradient id="akis-glow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
          <filter id="kablo-parlama" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <g transform={`translate(${kaydirma_x}, ${kaydirma_y}) scale(${olcek})`}>
          {/* Mevcut Bağlantılar */}
          {baglantilar.map(b => {
            const k = port_koordinati_bul(b.kaynak_dugum_id, b.kaynak_port_id, 'cikti');
            const h = port_koordinati_bul(b.hedef_dugum_id, b.hedef_port_id, 'girdi');
            const yol = bezier_yolu_olustur(k.x, k.y, h.x, h.y);
            const secili_mi = secili_kablo_id === b.id;
            const renk = PORT_RENKLERI[b.tip] || '#38bdf8';
            const akis_mi = b.tip === 'akis';

            return (
              <g key={b.id} className="pointer-events-auto cursor-pointer group">
                <path
                  d={yol}
                  fill="none"
                  stroke="transparent"
                  strokeWidth={16}
                  onClick={(e) => {
                    e.stopPropagation();
                    set_secili_kablo_id(b.id);
                  }}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    on_baglanti_sil(b.id);
                  }}
                />

                <path
                  d={yol}
                  fill="none"
                  stroke={secili_mi ? '#f43f5e' : renk}
                  strokeWidth={akis_mi ? 4 : 3}
                  strokeOpacity={secili_mi ? 0.9 : 0.4}
                  className="transition-all"
                />

                <path
                  d={yol}
                  fill="none"
                  stroke={secili_mi ? '#ff0055' : (akis_mi ? '#ffffff' : renk)}
                  strokeWidth={akis_mi ? 3 : 2}
                  strokeDasharray={calisiyor_mu && akis_mi ? '8 4' : 'none'}
                  className={calisiyor_mu && akis_mi ? 'animate-[dash_1s_linear_infinite]' : ''}
                />

                {calisiyor_mu && akis_mi && (
                  <circle r="4" fill="#38bdf8" filter="url(#kablo-parlama)">
                    <animateMotion path={yol} dur="1.2s" repeatCount="indefinite" />
                  </circle>
                )}
              </g>
            );
          })}

          {/* Sürüklenen Geçici Kablo */}
          {baglanti_cekiliyor && (
            (() => {
              const k = baglanti_cekiliyor.yon === 'cikti'
                ? port_koordinati_bul(baglanti_cekiliyor.kaynak_dugum_id, baglanti_cekiliyor.kaynak_port_id, 'cikti')
                : { x: baglanti_cekiliyor.fare_x, y: baglanti_cekiliyor.fare_y };
              const h = baglanti_cekiliyor.yon === 'cikti'
                ? { x: baglanti_cekiliyor.fare_x, y: baglanti_cekiliyor.fare_y }
                : port_koordinati_bul(baglanti_cekiliyor.kaynak_dugum_id, baglanti_cekiliyor.kaynak_port_id, 'girdi');

              const yol = bezier_yolu_olustur(k.x, k.y, h.x, h.y);
              const renk = PORT_RENKLERI[baglanti_cekiliyor.port_tipi] || '#38bdf8';

              return (
                <path
                  d={yol}
                  fill="none"
                  stroke={renk}
                  strokeWidth={3}
                  strokeDasharray="4 4"
                  className="animate-pulse"
                />
              );
            })()
          )}

          {/* Kutu Seçim Dikdörtgeni */}
          {kutu_secimi && (
            <rect
              x={Math.min(kutu_secimi.basla_x, kutu_secimi.su_an_x)}
              y={Math.min(kutu_secimi.basla_y, kutu_secimi.su_an_y)}
              width={Math.abs(kutu_secimi.su_an_x - kutu_secimi.basla_x)}
              height={Math.abs(kutu_secimi.su_an_y - kutu_secimi.basla_y)}
              fill="rgba(6, 182, 212, 0.08)"
              stroke="#06b6d4"
              strokeWidth={1}
              strokeDasharray="4 2"
            />
          )}
        </g>
      </svg>

      {/* 2. Düğümler (Nodes) Katmanı */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          transform: `translate3d(${kaydirma_x}px, ${kaydirma_y}px, 0) scale(${olcek})`,
          transformOrigin: '0 0'
        }}
      >
        {dugumler.map(dugum => (
          <DugumKarti
            key={dugum.id}
            dugum={dugum}
            baglantilar={baglantilar}
            secili={!!dugum.secili}
            on_dugum_sec={on_dugum_sec}
            on_dugum_cogalt={on_dugum_cogalt}
            on_dugum_sil={on_dugum_sil}
            on_dugum_ozellik_degis={on_dugum_ozellik_degis}
            on_port_varsayilan_degis={on_port_varsayilan_degis}
            on_surukleme_basla={dugum_surukleme_basla}
            on_baglanti_cek_basla={baglanti_cek_baslat}
            on_baglanti_birak={baglanti_birak}
            on_context_menu={canvas_sag_tik}
          />
        ))}
      </div>

      {/* Canlı FPS Göstergesi & Performans Monitörü */}
      {fps_sayaci_goster && (
        <div className="absolute bottom-3 right-3 z-40 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg px-2.5 py-1.5 flex items-center gap-2 shadow-lg text-[11px] font-mono pointer-events-auto">
          <Gauge className={`w-3.5 h-3.5 ${canli_fps >= 50 ? 'text-emerald-400' : (canli_fps >= 30 ? 'text-amber-400' : 'text-red-400')}`} />
          <div className="flex items-center gap-1">
            <span className="text-slate-400">FPS:</span>
            <span className={`font-bold ${canli_fps >= 50 ? 'text-emerald-400' : 'text-amber-400'}`}>{canli_fps}</span>
          </div>
          <div className="h-3 w-px bg-slate-800" />
          <span className="text-slate-500 text-[10px]">GPU Accel: 60Hz</span>
        </div>
      )}

      {/* 3. Sağ Tık Bağlam Menüsü (Context Menu) */}
      {context_menu && (
        <div
          style={{ left: context_menu.x, top: context_menu.y }}
          className="fixed w-56 bg-slate-900/95 border border-slate-700 rounded-lg shadow-2xl py-1 z-50 text-xs text-slate-300 animate-in fade-in zoom-in-95 duration-100 backdrop-blur-md select-none"
        >
          {context_menu.dugum_id ? (
            <>
              <button
                onClick={() => {
                  on_dugum_cogalt(context_menu.dugum_id!);
                  set_context_menu(null);
                }}
                className="w-full px-3 py-1.5 text-left hover:bg-slate-800 flex items-center gap-2 text-cyan-300"
              >
                <Copy className="w-3.5 h-3.5" /> Düğümü Çoğalt (Ctrl+D)
              </button>
              <button
                onClick={() => {
                  on_kopyala();
                  set_context_menu(null);
                }}
                className="w-full px-3 py-1.5 text-left hover:bg-slate-800 flex items-center gap-2"
              >
                <Copy className="w-3.5 h-3.5" /> Kopyala (Ctrl+C)
              </button>
              <div className="h-px bg-slate-800 my-1" />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  on_dugum_sil(context_menu.dugum_id!);
                  set_context_menu(null);
                }}
                className="w-full px-3 py-1.5 text-left hover:bg-red-950/60 flex items-center gap-2 text-red-400 font-medium"
              >
                <Trash2 className="w-3.5 h-3.5" /> Düğümü Sil (Delete)
              </button>
            </>
          ) : (
            <>
              <div className="px-3 py-1 text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                Düğüm Ekle
              </div>
              <button
                onClick={() => {
                  set_hizli_arama({
                    x: context_menu.x,
                    y: context_menu.y,
                    canvas_x: context_menu.canvas_x,
                    canvas_y: context_menu.canvas_y,
                    arama: ''
                  });
                  set_context_menu(null);
                }}
                className="w-full px-3 py-1.5 text-left hover:bg-cyan-950/70 hover:text-cyan-300 flex items-center gap-2 text-cyan-400 font-medium"
              >
                <Plus className="w-3.5 h-3.5" /> Düğüm Ara & Ekle...
              </button>
              <div className="h-px bg-slate-800 my-1" />
              <button
                onClick={() => {
                  on_yapistir(context_menu.canvas_x, context_menu.canvas_y);
                  set_context_menu(null);
                }}
                className="w-full px-3 py-1.5 text-left hover:bg-slate-800 flex items-center gap-2"
              >
                Yapıştır (Ctrl+V)
              </button>
              <button
                onClick={() => {
                  on_secimleri_temizle();
                  set_context_menu(null);
                }}
                className="w-full px-3 py-1.5 text-left hover:bg-slate-800 flex items-center gap-2"
              >
                Seçimi Temizle
              </button>
            </>
          )}
        </div>
      )}

      {/* 4. Hızlı Düğüm Arama ve Ekleme Penceresi (Space / Tab Search) */}
      {hizli_arama && (
        <div
          style={{ left: Math.min(hizli_arama.x, window.innerWidth - 340), top: Math.min(hizli_arama.y, window.innerHeight - 380) }}
          className="fixed w-80 max-h-96 bg-slate-900/95 border border-cyan-700/60 rounded-xl shadow-2xl flex flex-col z-50 text-xs backdrop-blur-md overflow-hidden animate-in fade-in zoom-in-95 duration-100"
        >
          <div className="p-2.5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
            <input
              type="text"
              autoFocus
              placeholder="Düğüm ara (örn: Branch, Karşılaştır, For, Log)..."
              value={hizli_arama.arama}
              onChange={(e) => set_hizli_arama({ ...hizli_arama, arama: e.target.value })}
              onKeyDown={(e) => {
                if (e.key === 'Escape') set_hizli_arama(null);
                if (e.key === 'Enter') {
                  const ilk = dugum_katalogu.find(d => 
                    d.baslik.toLowerCase().includes(hizli_arama.arama.toLowerCase())
                  );
                  if (ilk) {
                    on_dugum_ekle(ilk, hizli_arama.canvas_x, hizli_arama.canvas_y);
                    set_hizli_arama(null);
                  }
                }
              }}
              className="w-full px-3 py-1.5 bg-slate-900 border border-slate-700 rounded text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="flex-1 overflow-y-auto p-1.5 space-y-1 max-h-72">
            {dugum_katalogu
              .filter(d => 
                d.baslik.toLowerCase().includes(hizli_arama.arama.toLowerCase()) ||
                d.kategori.toLowerCase().includes(hizli_arama.arama.toLowerCase()) ||
                d.aciklama.toLowerCase().includes(hizli_arama.arama.toLowerCase())
              )
              .map(sablon => {
                const Ikon = ikon_haritasi[sablon.ikon_adi] || Zap;
                return (
                  <div
                    key={sablon.tip_kodu}
                    onClick={() => {
                      on_dugum_ekle(sablon, hizli_arama.canvas_x, hizli_arama.canvas_y);
                      set_hizli_arama(null);
                    }}
                    className="p-2 rounded bg-slate-950/60 hover:bg-cyan-950/60 border border-slate-800/80 hover:border-cyan-700 cursor-pointer flex items-center justify-between transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-5 h-5 rounded flex items-center justify-center text-white flex-shrink-0"
                        style={{ backgroundColor: sablon.renk }}
                      >
                        <Ikon className="w-3 h-3" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-slate-200">{sablon.baslik}</div>
                        <div className="text-[10px] text-slate-400">{sablon.aciklama}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
};
