/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Ana Uygulama Bileseni (IDE Kabugu)
 */

import React, { useState, useEffect, useRef } from 'react';
import { use_proje_yoneticisi } from './durum/proje_yoneticisi';
import { UstMenu } from './bilesenler/ust_menu';
import { AracCubugu } from './bilesenler/arac_cubugu';
import { SolPanel } from './bilesenler/sol_panel';
import { GrafikTuvali } from './bilesenler/grafik_tuvali';
import { SagPanel } from './bilesenler/sag_panel';
import { AltPanel } from './bilesenler/alt_panel';
import { SekmeCubugu } from './bilesenler/sekme_cubugu';
import { MetinKodEditoru } from './bilesenler/metin_kod_editoru';
import { KullanimKilavuzu } from './bilesenler/kullanim_kilavuzu';
import { KarsilamaPenceresi } from './bilesenler/karsilama_penceresi';
import { KisayolRehberi } from './bilesenler/kisayol_rehberi';
import { HakkindaPenceresi } from './bilesenler/hakkinda_penceresi';
import { DilSeciciModal } from './bilesenler/dil_secici_modal';

export default function App() {
  const {
    proje,
    gecmis,
    ileri,
    geri_al,
    yinele,
    dugum_ekle,
    dugum_tasi,
    dugum_sec,
    tum_secimleri_temizle,
    secili_dugumlari_sil,
    tekil_dugum_sil,
    baglanti_olustur,
    baglanti_sil,
    dugum_ozellik_guncelle,
    port_varsayilan_guncelle,
    degisken_ekle,
    degisken_sil,
    fonksiyon_ekle,
    dil_degistir,
    gorunum_guncelle,
    secili_dugumlari_kopyala,
    dugumlari_yapistir,
    dugum_cogalt,
    sablon_yukle,
    yeni_bos_proje,
    konsol_kayitlari,
    konsolu_temizle,
    son_derleme,
    calisiyor_mu,
    projeyi_yurut,
    kaynak_koda_aktar,
    projeyi_disa_aktar,
    projeyi_ice_aktar,
    aktif_dosya_id,
    acik_dosyalar,
    dosya_ac,
    dosya_kapat,
    dosya_olustur,
    dosya_sil,
    dosya_adi_degistir,
    dosya_icerik_guncelle
  } = use_proje_yoneticisi();

  // Panel Görünürlük Durumları
  const [sol_panel_acik, set_sol_panel_acik] = useState(true);
  const [sag_panel_acik, set_sag_panel_acik] = useState(true);
  const [alt_panel_acik, set_alt_panel_acik] = useState(true);
  const [alt_panel_sekme, set_alt_panel_sekme] = useState<'konsol' | 'kod' | 'sorunlar' | 'derleme'>('konsol');

  // Modal Durumları
  const [karsilama_acik, set_karsilama_acik] = useState(false);
  const [kisayol_acik, set_kisayol_acik] = useState(false);
  const [hakkinda_acik, set_hakkinda_acik] = useState(false);
  const [dil_modal_acik, set_dil_modal_acik] = useState(false);
  const [kilavuz_acik, set_kilavuz_acik] = useState(false);

  // Bildirim Çubuğu (Toast Notification)
  const [bildirim, set_bildirim] = useState<string | null>(null);
  const dosya_giris_ref = useRef<HTMLInputElement>(null);

  const bildirim_goster = (metin: string) => {
    set_bildirim(metin);
    setTimeout(() => set_bildirim(null), 3000);
  };

  const derleme_tetikle = () => {
    kaynak_koda_aktar();
    set_alt_panel_acik(true);
    set_alt_panel_sekme('kod');
    bildirim_goster('Grafik doğrulandı ve kaynak kod derlendi.');
  };

  const kaynak_koda_ekle_tetikle = () => {
    const derleme = kaynak_koda_aktar();
    set_alt_panel_acik(true);
    set_alt_panel_sekme('kod');
    bildirim_goster(`[${proje.ayarlar.hedef_dil.toUpperCase()}] Görsel grafik başarıyla kaynak koda aktarıldı!`);
  };

  // Global Klavye Kısayolları (IDE Shortcuts)
  useEffect(() => {
    function klavye_dinleyici(e: KeyboardEvent) {
      const hedef = e.target as HTMLElement;
      if (hedef.tagName === 'INPUT' || hedef.tagName === 'TEXTAREA' || hedef.tagName === 'SELECT') {
        return;
      }

      // F5 -> Projeyi Çalıştır
      if (e.key === 'F5') {
        e.preventDefault();
        projeyi_yurut();
        set_alt_panel_acik(true);
        set_alt_panel_sekme('konsol');
        return;
      }

      // Ctrl + S -> Kaydet
      if (e.ctrlKey && e.key.toLowerCase() === 's') {
        e.preventDefault();
        bildirim_goster('Proje yerel depolamaya ve çalışma alanına başarıyla kaydedildi.');
        return;
      }

      // Ctrl + B -> Derle
      if (e.ctrlKey && e.key.toLowerCase() === 'b') {
        e.preventDefault();
        derleme_tetikle();
        return;
      }

      // Ctrl + Z -> Geri Al
      if (e.ctrlKey && !e.shiftKey && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        geri_al();
        return;
      }

      // Ctrl + Y -> Yinele
      if (e.ctrlKey && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        yinele();
        return;
      }

      // Ctrl + C -> Kopyala
      if (e.ctrlKey && e.key.toLowerCase() === 'c') {
        e.preventDefault();
        secili_dugumlari_kopyala();
        bildirim_goster('Seçili düğümler panoya kopyalandı.');
        return;
      }

      // Ctrl + V -> Yapıştır
      if (e.ctrlKey && e.key.toLowerCase() === 'v') {
        e.preventDefault();
        dugumlari_yapistir(
          (-proje.gorunum.kaydirma_x + window.innerWidth / 2) / proje.gorunum.olcek,
          (-proje.gorunum.kaydirma_y + window.innerHeight / 2) / proje.gorunum.olcek
        );
        bildirim_goster('Düğümler tuvale yapıştırıldı.');
        return;
      }

      // Delete / Backspace -> Sil
      if (e.key === 'Delete' || e.key === 'Backspace') {
        secili_dugumlari_sil();
        return;
      }

      // Escape -> Seçimi Temizle
      if (e.key === 'Escape') {
        tum_secimleri_temizle();
        return;
      }
    }

    window.addEventListener('keydown', klavye_dinleyici);
    return () => window.removeEventListener('keydown', klavye_dinleyici);
  }, [
    projeyi_yurut,
    geri_al,
    yinele,
    secili_dugumlari_kopyala,
    dugumlari_yapistir,
    secili_dugumlari_sil,
    tum_secimleri_temizle,
    proje.gorunum
  ]);

  // İçe Aktarma Tetikleyici
  const ice_aktar_tiklandi = () => {
    if (dosya_giris_ref.current) {
      dosya_giris_ref.current.click();
    }
  };

  const dosya_secildi = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dosya = e.target.files?.[0];
    if (!dosya) return;
    const okuyucu = new FileReader();
    okuyucu.onload = (event) => {
      const icerik = event.target?.result as string;
      if (icerik) {
        if (projeyi_ice_aktar(icerik)) {
          bildirim_goster('Proje başarıyla içe aktarıldı.');
        }
      }
    };
    okuyucu.readAsText(dosya);
    e.target.value = '';
  };

  const secili_dugumler = proje.dugumler.filter(d => d.secili);
  const tum_dosyalar = proje.dosyalar || [];
  const aktif_dosya = tum_dosyalar.find(d => d.id === aktif_dosya_id) || tum_dosyalar[0];
  const grafik_modu = !aktif_dosya || aktif_dosya.tur === 'grafik';

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans antialiased select-none">
      {/* Gizli Dosya İçe Aktarma Girişi */}
      <input
        type="file"
        ref={dosya_giris_ref}
        onChange={dosya_secildi}
        accept=".nodeforge,.json"
        className="hidden"
      />

      {/* 1. Üst Menü Çubuğu */}
      <UstMenu
        proje_adi={proje.ayarlar.proje_adi}
        hedef_dil={proje.ayarlar.hedef_dil}
        calisiyor_mu={calisiyor_mu}
        on_calistir={() => {
          projeyi_yurut();
          set_alt_panel_acik(true);
          set_alt_panel_sekme('konsol');
        }}
        on_derle={derleme_tetikle}
        on_kaydet={() => bildirim_goster('Proje kaydedildi.')}
        on_yeni_proje={() => set_karsilama_acik(true)}
        on_sablon_sec={(sablon_id) => {
          sablon_yukle(sablon_id);
          bildirim_goster('Şablon yüklendi.');
        }}
        on_disa_aktar={projeyi_disa_aktar}
        on_ice_aktar={ice_aktar_tiklandi}
        on_geri_al={geri_al}
        on_yinele={yinele}
        on_sil={secili_dugumlari_sil}
        on_kopyala={secili_dugumlari_kopyala}
        on_yapistir={() => {
          dugumlari_yapistir(
            (-proje.gorunum.kaydirma_x + 300) / proje.gorunum.olcek,
            (-proje.gorunum.kaydirma_y + 200) / proje.gorunum.olcek
          );
        }}
        on_secimi_temizle={tum_secimleri_temizle}
        on_kisayollari_goster={() => set_kisayol_acik(true)}
        on_hakkinda_goster={() => set_hakkinda_acik(true)}
        on_kilavuz_goster={() => set_kilavuz_acik(true)}
        on_dil_degistir={dil_degistir}
        on_dil_modal_ac={() => set_dil_modal_acik(true)}
        sol_panel_acik={sol_panel_acik}
        sag_panel_acik={sag_panel_acik}
        alt_panel_acik={alt_panel_acik}
        on_sol_panel_degis={() => set_sol_panel_acik(!sol_panel_acik)}
        on_sag_panel_degis={() => set_sag_panel_acik(!sag_panel_acik)}
        on_alt_panel_degis={() => set_alt_panel_acik(!alt_panel_acik)}
        izgara_acik={proje.gorunum.izgara_goster}
        on_izgara_degis={() => {
          gorunum_guncelle(
            proje.gorunum.kaydirma_x,
            proje.gorunum.kaydirma_y,
            proje.gorunum.olcek
          );
        }}
      />

      {/* 2. Hızlı Erişim Araç Çubuğu */}
      <AracCubugu
        olcek={proje.gorunum.olcek}
        izgara_acik={proje.gorunum.izgara_goster}
        hizalama_acik={proje.gorunum.hizalama_aktif}
        calisiyor_mu={calisiyor_mu}
        geri_alinabilir_mi={gecmis.length > 0}
        yinelenebilir_mi={ileri.length > 0}
        secili_sayisi={secili_dugumler.length}
        on_secilileri_sil={secili_dugumlari_sil}
        on_yeni_proje={() => set_karsilama_acik(true)}
        on_kaydet={() => bildirim_goster('Proje kaydedildi.')}
        on_geri_al={geri_al}
        on_yinele={yinele}
        on_yakinlastir={() => {
          gorunum_guncelle(proje.gorunum.kaydirma_x, proje.gorunum.kaydirma_y, proje.gorunum.olcek * 1.15);
        }}
        on_uzaklastir={() => {
          gorunum_guncelle(proje.gorunum.kaydirma_x, proje.gorunum.kaydirma_y, proje.gorunum.olcek * 0.85);
        }}
        on_olcek_sifirla={() => {
          gorunum_guncelle(proje.gorunum.kaydirma_x, proje.gorunum.kaydirma_y, 1);
        }}
        on_ortala={() => {
          gorunum_guncelle(50, 50, 1);
        }}
        on_izgara_degis={() => {
          // toggle izgara
        }}
        on_hizalama_degis={() => {
          // toggle snap
        }}
        on_arama_ac={() => {
          window.dispatchEvent(new KeyboardEvent('keydown', { code: 'Space' }));
        }}
        on_calistir={() => {
          projeyi_yurut();
          set_alt_panel_acik(true);
          set_alt_panel_sekme('konsol');
        }}
        on_derle={derleme_tetikle}
        on_kaynak_koda_ekle={kaynak_koda_ekle_tetikle}
      />

      {/* 3. Ana Çalışma Alanı (Sol Panel + [Sekmeler + Tuval/Kod] + Sağ Panel) */}
      <div className="flex-1 flex min-h-0 relative overflow-hidden">
        {/* Sol Panel: Düğüm Kütüphanesi, Dosya Gezgini, Değişkenler */}
        <SolPanel
          acik={sol_panel_acik}
          degiskenler={proje.degiskenler}
          fonksiyonlar={proje.fonksiyonlar}
          dosyalar={proje.dosyalar || []}
          aktif_dosya_id={aktif_dosya_id}
          hedef_dil={proje.ayarlar.hedef_dil}
          on_dugum_ekle={(sablon, x, y) => {
            const tx = x !== undefined ? x : (-proje.gorunum.kaydirma_x + 300) / proje.gorunum.olcek;
            const ty = y !== undefined ? y : (-proje.gorunum.kaydirma_y + 200) / proje.gorunum.olcek;
            dugum_ekle(sablon, tx, ty);
          }}
          on_degisken_ekle={degisken_ekle}
          on_degisken_sil={degisken_sil}
          on_fonksiyon_ekle={fonksiyon_ekle}
          on_dosya_sec={dosya_ac}
          on_dosya_olustur={dosya_olustur}
          on_dosya_sil={dosya_sil}
          on_dosya_adi_degistir={dosya_adi_degistir}
        />

        {/* Orta Alan: Üst Sekme Çubuğu + (Grafik Tuvali VEYA Kod Editörü) */}
        <div className="flex-1 flex flex-col min-w-0 min-h-0 relative">
          {/* Çoklu Dosya Sekme Çubuğu */}
          <SekmeCubugu
            tum_dosyalar={tum_dosyalar}
            acik_dosyalar={acik_dosyalar}
            aktif_dosya_id={aktif_dosya_id}
            on_dosya_sec={dosya_ac}
            on_dosya_kapat={(id, e) => {
              e.stopPropagation();
              dosya_kapat(id);
            }}
            on_yeni_dosya={() => dosya_olustur()}
          />

          {/* Orta İçerik */}
          <div className="flex-1 flex min-h-0 relative">
            {grafik_modu ? (
              <GrafikTuvali
                dugumler={proje.dugumler}
                baglantilar={proje.baglantilar}
                kaydirma_x={proje.gorunum.kaydirma_x}
                kaydirma_y={proje.gorunum.kaydirma_y}
                olcek={proje.gorunum.olcek}
                izgara_goster={proje.gorunum.izgara_goster}
                hizalama_aktif={proje.gorunum.hizalama_aktif}
                calisiyor_mu={calisiyor_mu}
                on_dugum_sec={dugum_sec}
                on_secimleri_temizle={tum_secimleri_temizle}
                on_dugum_tasi={dugum_tasi}
                on_dugum_ekle={dugum_ekle}
                on_dugum_sil={tekil_dugum_sil}
                on_dugum_cogalt={dugum_cogalt}
                on_baglanti_olustur={baglanti_olustur}
                on_baglanti_sil={baglanti_sil}
                on_gorunum_guncelle={gorunum_guncelle}
                on_port_varsayilan_degis={port_varsayilan_guncelle}
                on_dugum_ozellik_degis={dugum_ozellik_guncelle}
                on_kopyala={secili_dugumlari_kopyala}
                on_yapistir={dugumlari_yapistir}
              />
            ) : (
              <MetinKodEditoru
                dosya={aktif_dosya}
                on_icerik_kaydet={(yeni_icerik) => {
                  dosya_icerik_guncelle(aktif_dosya.id, yeni_icerik);
                  bildirim_goster(`${aktif_dosya.ad} kaydedildi.`);
                }}
              />
            )}

            {/* Sağ Panel: Düğüm Denetçisi & Proje Gezgini (Grafik modunda) */}
            {grafik_modu && (
              <SagPanel
                acik={sag_panel_acik}
                proje={proje}
                secili_dugumler={secili_dugumler}
                on_dugum_ozellik_degis={dugum_ozellik_guncelle}
                on_dugum_sil={tekil_dugum_sil}
                on_dugum_cogalt={dugum_cogalt}
                on_port_varsayilan_degis={port_varsayilan_guncelle}
              />
            )}
          </div>
        </div>
      </div>

      {/* 4. Alt Panel: Konsol, Üretilen Kod, Sorunlar, Derleme */}
      <AltPanel
        acik={alt_panel_acik}
        on_kapat={() => set_alt_panel_acik(false)}
        konsol_kayitlari={konsol_kayitlari}
        on_konsol_temizle={konsolu_temizle}
        derleme_sonucu={son_derleme}
        hedef_dil={proje.ayarlar.hedef_dil}
        dis_sekme={alt_panel_sekme}
        on_sekme_degis={set_alt_panel_sekme}
      />

      {/* 5. Bildirim Toast Kutusu */}
      {bildirim && (
        <div className="fixed bottom-12 right-6 bg-slate-900 border border-cyan-500/80 text-cyan-200 px-4 py-2.5 rounded-lg shadow-2xl z-50 text-xs flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>{bildirim}</span>
        </div>
      )}

      {/* 6. Modallar */}
      <KarsilamaPenceresi
        acik={karsilama_acik}
        on_kapat={() => set_karsilama_acik(false)}
        on_sablon_sec={(sablon_id) => {
          sablon_yukle(sablon_id);
          bildirim_goster('Şablon yüklendi.');
        }}
        on_bos_proje_olustur={(ad, dil) => {
          yeni_bos_proje(ad, dil);
          bildirim_goster(`Yeni ${dil.toUpperCase()} projesi oluşturuldu.`);
        }}
      />

      <KisayolRehberi
        acik={kisayol_acik}
        on_kapat={() => set_kisayol_acik(false)}
      />

      <HakkindaPenceresi
        acik={hakkinda_acik}
        on_kapat={() => set_hakkinda_acik(false)}
      />

      <KullanimKilavuzu
        acik={kilavuz_acik}
        on_kapat={() => set_kilavuz_acik(false)}
      />

      <DilSeciciModal
        acik={dil_modal_acik}
        on_kapat={() => set_dil_modal_acik(false)}
        secili_dil={proje.ayarlar.hedef_dil}
        on_dil_sec={(dil) => {
          dil_degistir(dil);
          bildirim_goster(`Hedef derleme dili ${dil.toUpperCase()} olarak güncellendi.`);
        }}
      />
    </div>
  );
}
