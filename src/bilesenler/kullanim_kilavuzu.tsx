/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Detayli Kullanim Kilavuzu ve Dokumantasyon Modali
 */

import React, { useState } from 'react';
import { 
  X, 
  BookOpen, 
  Code2, 
  Layers, 
  Cpu, 
  FolderTree, 
  Play, 
  Search, 
  CheckCircle2, 
  FileCode, 
  Terminal,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  HelpCircle,
  Settings,
  Workflow
} from 'lucide-react';
import { DIL_KATALOGU } from '../tanimlar/dil_katalogu';

interface kullanim_kilavuzu_ozellikleri {
  acik: boolean;
  on_kapat: () => void;
}

export const KullanimKilavuzu: React.FC<kullanim_kilavuzu_ozellikleri> = ({
  acik,
  on_kapat
}) => {
  const [aktif_bolum, set_aktif_bolum] = useState<'giris' | 'diller' | 'derleme' | 'dosya_gezgini' | 'dugumler' | 'kisayollar'>('giris');
  const [arama_metni, set_arama_metni] = useState('');

  if (!acik) return null;

  const bolumler = [
    { id: 'giris', baslik: 'Giriş ve Mimari', ikon: <BookOpen className="w-4 h-4" /> },
    { id: 'derleme', baslik: 'Derleme & Kodlar Nerede?', ikon: <Code2 className="w-4 h-4 text-cyan-400" /> },
    { id: 'diller', baslik: 'Desteklenen Diller (C++, C#, ...)', ikon: <Cpu className="w-4 h-4 text-purple-400" /> },
    { id: 'dosya_gezgini', baslik: 'Dosya Gezgini & Çoklu Dosya', ikon: <FolderTree className="w-4 h-4 text-yellow-400" /> },
    { id: 'dugumler', baslik: 'Düğüm Sistemi & Akışlar', ikon: <Workflow className="w-4 h-4 text-emerald-400" /> },
    { id: 'kisayollar', baslik: 'Hızlı İpuçları & Kısayollar', ikon: <Zap className="w-4 h-4 text-amber-400" /> }
  ];

  return (
    <div className="fixed inset-0 bg-slate-950/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        
        {/* Modal Başlık Çubuğu */}
        <div className="h-14 bg-slate-950 border-b border-slate-800 px-6 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-700/60 flex items-center justify-center text-cyan-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white tracking-wide flex items-center gap-2">
                <span>NODEFORGE Kullanım Kılavuzu</span>
                <span className="text-[10px] bg-cyan-950 text-cyan-400 px-2 py-0.5 rounded-full border border-cyan-800 font-mono">
                  v2.5 Full IDE
                </span>
              </h2>
              <p className="text-xs text-slate-400">Görsel programlama, çoklu dosya yönetimi ve kod derleme rehberi</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-[11px] font-mono text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              Developed By <span className="text-cyan-300 font-semibold">K7~</span>
            </div>
            <button
              onClick={on_kapat}
              className="p-1.5 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Gövdesi (Sol Navigasyon + Sağ İçerik) */}
        <div className="flex-1 flex min-h-0">
          
          {/* Sol Navigasyon Menüsü */}
          <div className="w-64 bg-slate-950/70 border-r border-slate-800/80 p-3 flex flex-col gap-1 overflow-y-auto flex-shrink-0">
            <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider px-3 py-1 mb-1">
              Konu Başlıkları
            </div>
            {bolumler.map((b) => {
              const secili = aktif_bolum === b.id;
              return (
                <button
                  key={b.id}
                  onClick={() => set_aktif_bolum(b.id as any)}
                  className={`w-full px-3 py-2.5 rounded-lg text-xs font-medium flex items-center justify-between transition-all ${
                    secili
                      ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    {b.ikon}
                    <span>{b.baslik}</span>
                  </div>
                  {secili && <ChevronRight className="w-3.5 h-3.5 text-cyan-400" />}
                </button>
              );
            })}

            <div className="mt-auto p-3 bg-slate-900/80 rounded-lg border border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5 text-cyan-300 font-medium mb-1">
                <Sparkles className="w-3.5 h-3.5" /> Hızlı Başlangıç
              </div>
              Düğüm eklemek için tuval üzerinde sağ tıklayın veya klavyeden <kbd className="bg-slate-950 px-1 rounded text-slate-200 font-mono">Boşluk</kbd> tuşuna basın.
            </div>
          </div>

          {/* Sağ İçerik Alanı */}
          <div className="flex-1 bg-slate-900/40 p-6 overflow-y-auto select-text">
            
            {/* BÖLÜM 1: GİRİŞ VE MİMARİ */}
            {aktif_bolum === 'giris' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">NodeForge Nedir?</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <strong className="text-cyan-400">NODEFORGE</strong>, Unreal Engine Blueprints ve modern web IDE'lerinin gücünü birleştiren 
                    tam özellikli bir Görsel Programlama Ortamıdır. Düğümleri birbirine bağlayarak mantık kurabilir, 
                    tek bir tıkla projenizi <strong>7 farklı programlama diline</strong> (TypeScript, Python, C++, C#, JavaScript, Rust, Go) dönüştürebilir 
                    ve dahili JavaScript/Python motoruyla tarayıcı içinde doğrudan çalıştırabilirsiniz.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold text-sm mb-2">
                      <Workflow className="w-4 h-4" /> Görsel Akış Grafikleri
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Beyaz yürütme pinleri (Execution Flow) programın sırasını belirler; renkli veri pinleri ise sayıları, metinleri, dizileri ve nesneleri taşır.
                    </p>
                  </div>

                  <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-purple-400 font-semibold text-sm mb-2">
                      <Code2 className="w-4 h-4" /> Otomatik AST ve Kod Derleyici
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Oluşturduğunuz mantık grafiği, seçtiğiniz hedef dilin standart sözdizimine (sınıflar, fonksiyonlar, importlar, tip tanımları) birebir çevrilir.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* BÖLÜM 2: DERLEME & KODLAR NEREDE OLUYOR */}
            {aktif_bolum === 'derleme' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Derlenen Kodlar Nerede ve Nasıl Görülür?</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Üst araç çubuğundaki <strong>"Doğrula & Derle"</strong> (veya klavyeden <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-cyan-300 font-mono">Ctrl + B</kbd>) butonuna bastığınızda:
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-lg flex items-start gap-3">
                    <div className="w-7 h-7 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">Alt Panel → "Kaynak Kod" Sekmesi</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Derleme tamamlandığında alt panel otomatik olarak açılır ve <strong>"Kaynak Kod"</strong> sekmesine odaklanır. 
                        Burada üretilen ana kaynak kod satır satır ve renklendirilmiş olarak listelenir.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-lg flex items-start gap-3">
                    <div className="w-7 h-7 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">Çoklu Dosya Paketi (Multi-File Bundle)</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        Üretilen kod yalnızca tek bir dosya ile sınırlı değildir. Üstteki dosya seçiciden <code>src/main.*</code>, <code>package.json</code>, <code>CMakeLists.txt</code> (C++ için) veya <code>.csproj</code> (C# için) dosyaları arasında tek tıkla geçiş yapabilirsiniz.
                      </p>
                    </div>
                  </div>

                  <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-lg flex items-start gap-3">
                    <div className="w-7 h-7 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 flex items-center justify-center font-bold text-xs flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-slate-200">Dışa Aktarma (.nodeforge / JSON)</h4>
                      <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                        <strong>Dosya → Dışa Aktar</strong> menüsünden projenizin tüm düğümlerini, değişkenlerini, kod dosyalarını ve yapılandırmasını indirebilir; başka bilgisayarlarda veya tarayıcılarda <strong>İçe Aktar</strong> ile açabilirsiniz.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-950/40 border border-emerald-800/60 p-4 rounded-lg flex items-center gap-3 text-emerald-300 text-xs">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-400" />
                  <span>
                    <strong>İpucu:</strong> <kbd className="bg-emerald-900/80 px-1.5 py-0.5 rounded font-mono">F5</kbd> tuşuna basarak grafiği simülasyon ortamında çalıştırabilir ve <strong>Konsol</strong> sekmesinde çıktıları canlı olarak izleyebilirsiniz.
                  </span>
                </div>
              </div>
            )}

            {/* BÖLÜM 3: DESTEKLENEN DİLLER (C++, C#, VB.) */}
            {aktif_bolum === 'diller' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Desteklenen Diller & C++ / C# Desteği</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    <strong>Evet, C++ ve C# dahil tam 7 dilde kod üretimi ve derleme desteklenmektedir!</strong> 
                    Üst sağdaki dil seçicisinden veya <em>Ayarlar → Dil Değiştir</em> penceresinden hedef dili anında değiştirebilirsiniz.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {DIL_KATALOGU.map((dil) => (
                    <div key={dil.kod} className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-lg flex items-start gap-3">
                      <span className="text-2xl">{dil.ikon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-sm text-slate-100">{dil.ad}</span>
                          <span className="text-[10px] bg-slate-900 text-cyan-400 font-mono px-1.5 py-0.5 rounded border border-slate-800">
                            {dil.uzanti}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-1 leading-normal">{dil.aciklama}</p>
                        <div className="text-[10px] text-slate-500 font-mono mt-1.5 flex items-center justify-between">
                          <span>Çıktı: <span className="text-cyan-300">src/main.{dil.uzanti}</span></span>
                          <span className="text-slate-400">{dil.surum}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* BÖLÜM 4: DOSYA GEZGİNİ & ÇOKLU DOSYA */}
            {aktif_bolum === 'dosya_gezgini' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Çoklu Dosya Gezgini ve Düzenleme</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    NodeForge artık sadece tek bir grafik tuvali değil, VS Code tarzı tam bir çoklu dosya projesidir.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-cyan-300 flex items-center gap-2 mb-2">
                      <FolderTree className="w-4 h-4" /> Sol Panel: Dosyalar Sekmesi
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Sol paneldeki <strong>"Dosyalar"</strong> sekmesine tıklayarak projenizdeki tüm dosyaları hiyerarşik olarak görebilirsiniz.
                      Üstteki <strong>+ Yeni Dosya</strong> butonuyla yeni grafikler (<code>.graph</code>), TypeScript/Python/C++/C# kaynak kodları veya yapılandırma dosyaları oluşturabilirsiniz.
                    </p>
                  </div>

                  <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-purple-300 flex items-center gap-2 mb-2">
                      <FileCode className="w-4 h-4" /> Dahili Kod ve Metin Editörü
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Sol panelden veya üst sekme çubuğundan bir metin/kod dosyasına (örn. <code>utils.ts</code>, <code>README.md</code>, <code>config.json</code>) tıkladığınızda, 
                      tuval otomatik olarak tam ekran bir kod editörüne dönüşür. Kodlarınızı yazıp <kbd className="bg-slate-800 px-1 py-0.5 rounded text-slate-200 font-mono">Ctrl + S</kbd> veya 
                      <strong>"Kaydet"</strong> butonuna basarak saklayabilirsiniz.
                    </p>
                  </div>

                  <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg">
                    <h4 className="text-sm font-semibold text-amber-300 flex items-center gap-2 mb-2">
                      <Layers className="w-4 h-4" /> Sekme Çubuğu Yönetimi
                    </h4>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      Açık dosyalar arasında hızlıca geçiş yapabilir, istemediğiniz sekmeleri <code>✕</code> butonuyla kapatabilirsiniz.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* BÖLÜM 5: DÜĞÜM SİSTEMİ & AKIŞLAR */}
            {aktif_bolum === 'dugumler' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Düğüm Anatomisi ve Bağlantı Kuralları</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Düğümler girdi ve çıktı portlarından oluşur. Port renkleri veri tipini temsil eder:
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="bg-slate-950 border border-slate-800 p-2.5 rounded flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-white border border-slate-400"></span>
                    <span className="text-white">Akış (Exec)</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-2.5 rounded flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-cyan-400"></span>
                    <span className="text-cyan-300">Sayı (Number)</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-2.5 rounded flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-purple-400"></span>
                    <span className="text-purple-300">Metin (String)</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-2.5 rounded flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-400"></span>
                    <span className="text-red-300">Mantıksal (Boolean)</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-2.5 rounded flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-yellow-400"></span>
                    <span className="text-yellow-300">Dizi (Array)</span>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-2.5 rounded flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                    <span className="text-emerald-300">Herhangi (Any)</span>
                  </div>
                </div>

                <div className="bg-slate-950/70 border border-slate-800 p-4 rounded-lg space-y-2 text-xs text-slate-300">
                  <div className="font-semibold text-slate-100 mb-1">Bağlantı Nasıl Yapılır?</div>
                  <p>1. Bir çıkış portunun üzerine gelin, fareye basılı tutarak sürükleyin.</p>
                  <p>2. Uyumlu bir giriş portunun üzerine bırakın.</p>
                  <p>3. Bir bağlantıyı silmek için bağlantı çizgisinin üzerine tıklayıp sağ panelden veya <kbd className="bg-slate-800 px-1 rounded">Delete</kbd> tuşuyla silebilirsiniz.</p>
                </div>
              </div>
            )}

            {/* BÖLÜM 6: KISAYOLLAR & İPUÇLARI */}
            {aktif_bolum === 'kisayollar' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Klavye Kısayolları ve İpuçları</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Hızlı ve verimli geliştirme yapmak için aşağıdaki kısayolları kullanabilirsiniz:
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs">
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded flex items-center justify-between">
                    <span className="text-slate-300">Projeyi Çalıştır</span>
                    <kbd className="bg-slate-800 text-emerald-400 px-2 py-0.5 rounded border border-slate-700 font-bold">F5</kbd>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded flex items-center justify-between">
                    <span className="text-slate-300">Doğrula ve Derle</span>
                    <kbd className="bg-slate-800 text-cyan-400 px-2 py-0.5 rounded border border-slate-700 font-bold">Ctrl + B</kbd>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded flex items-center justify-between">
                    <span className="text-slate-300">Projeyi Kaydet</span>
                    <kbd className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700 font-bold">Ctrl + S</kbd>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded flex items-center justify-between">
                    <span className="text-slate-300">Hızlı Düğüm Arama</span>
                    <kbd className="bg-slate-800 text-purple-400 px-2 py-0.5 rounded border border-slate-700 font-bold">Boşluk (Space)</kbd>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded flex items-center justify-between">
                    <span className="text-slate-300">Kopyala / Yapıştır</span>
                    <kbd className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700 font-bold">Ctrl+C / Ctrl+V</kbd>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded flex items-center justify-between">
                    <span className="text-slate-300">Geri Al / Yinele</span>
                    <kbd className="bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700 font-bold">Ctrl+Z / Ctrl+Y</kbd>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded flex items-center justify-between">
                    <span className="text-slate-300">Seçili Düğümleri Sil</span>
                    <kbd className="bg-slate-800 text-red-400 px-2 py-0.5 rounded border border-slate-700 font-bold">Delete</kbd>
                  </div>
                  <div className="bg-slate-950 border border-slate-800 p-3 rounded flex items-center justify-between">
                    <span className="text-slate-300">Tuvalde Gezinme</span>
                    <span className="text-slate-400 text-[11px] font-sans">Orta Tuş / Boşluk + Sol Tık</span>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Modal Alt Kapanış */}
        <div className="h-12 bg-slate-950 border-t border-slate-800 px-6 flex items-center justify-between flex-shrink-0">
          <div className="text-xs text-slate-400">
            Daha fazla yardım veya şablon için üst menüdeki <strong>"Şablonlar"</strong> seçeneğini kullanabilirsiniz.
          </div>
          <button
            onClick={on_kapat}
            className="px-4 py-1.5 bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/60 rounded-lg text-xs font-semibold transition-colors"
          >
            Anladım, Kapat
          </button>
        </div>

      </div>
    </div>
  );
};
