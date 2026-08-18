/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Desteklenen Diller ve Detayli Meta Bilgileri
 */

import { dil_detayi, dil_secenegi } from '../tipler/grafik_tipleri';

export const DIL_KATALOGU_HARITASI: Record<dil_secenegi, dil_detayi> = {
  typescript: {
    id: 'typescript',
    kod: 'typescript',
    ad: 'TypeScript',
    surum: '5.4+ (ESNext)',
    uzanti: 'ts',
    ikon: 'FileCode',
    renk: '#3178c6',
    aciklama: 'Statik tip güvenliği, modern JavaScript özellikleri ve gelişmiş tip denetimi ile üretim kalitesinde kod üretimi.',
    kullanim_alani: 'Web Arka Uç, Sunucu Uygulamaları, Modern Ön Yüz',
    calisma_zamani: 'Node.js / Bun / Deno / Web Tarayıcısı',
    ozellikler: [
      'Statik tip denetimi ve otomatik arayüz tanımları',
      'ESNext modül ve async/await entegrasyonu',
      'Sıfır çalışma zamanı ek yükü'
    ]
  },
  javascript: {
    id: 'javascript',
    kod: 'javascript',
    ad: 'JavaScript',
    surum: 'ES2024 / Node.js 20+',
    uzanti: 'js',
    ikon: 'Code',
    renk: '#f7df1e',
    aciklama: 'Dinamik, platform bağımsız ve doğrudan tarayıcı veya Node.js üzerinde çalışan saf ES modül kodu.',
    kullanim_alani: 'Tarayıcı Betikleri, Hızlı Prototipleme, Node.js Servisleri',
    calisma_zamani: 'V8 Engine, Node.js, Web Tarayıcıları',
    ozellikler: [
      'Derleme adımı olmadan anında çalıştırma',
      'Geniş ekosistem ve NPM uyumluluğu',
      'Yüksek dinamik esneklik'
    ]
  },
  python: {
    id: 'python',
    kod: 'python',
    ad: 'Python 3',
    surum: 'Python 3.12+',
    uzanti: 'py',
    ikon: 'Terminal',
    renk: '#3776ab',
    aciklama: 'Okunabilir, temiz girintilemeli (PEP 8 uyumlu) ve güçlü standart kütüphaneye sahip Python kaynak kodu.',
    kullanim_alani: 'Yapay Zeka, Veri Bilimi, Otomasyon, Backend',
    calisma_zamani: 'CPython 3.x, PyPy',
    ozellikler: [
      'Temiz ve anlaşılır sözdizimi',
      'Zengin kütüphane desteği',
      'Otomatik tip ipuçları (type hints)'
    ]
  },
  csharp: {
    id: 'csharp',
    kod: 'csharp',
    ad: 'C# / Unity',
    surum: '.NET 8.0 / C# 12',
    uzanti: 'cs',
    ikon: 'Cpu',
    renk: '#68217a',
    aciklama: 'Nesne yönelimli, yüksek performanslı ve Unity Blueprint uyumlu kurumsal C# kod yapısı.',
    kullanim_alani: 'Unity Oyun Geliştirme, Masaüstü (.NET), Enterprise Web (ASP.NET Core)',
    calisma_zamani: '.NET Runtime (CLR), Unity Mono / IL2CPP',
    ozellikler: [
      'Sınıf ve metot yapısında temiz hiyerarşi',
      'Strongly Typed (Güçlü Tip) garantisi',
      'Unity MonoBehaviour ve .NET CLI ile tam uyum'
    ]
  },
  cpp: {
    id: 'cpp',
    kod: 'cpp',
    ad: 'C++ 20',
    surum: 'ISO C++20 Standard',
    uzanti: 'cpp',
    ikon: 'Zap',
    renk: '#00599c',
    aciklama: 'Maksimum çalışma hızı, doğrudan bellek kontrolü ve Unreal Engine C++ standartlarına uygun kod çıktısı.',
    kullanim_alani: 'Unreal Engine Oyun Motoru, Gömülü Sistemler, Yüksek Performanslı Hesaplama',
    calisma_zamani: 'GCC / Clang / MSVC Native Binary',
    ozellikler: [
      'Maksimum donanımsal yürütme performansı',
      'Unreal Engine UCLASS ve BlueprintCallable uyumlu yapı',
      'Sıfır ek yük ve doğrudan derleme'
    ]
  },
  go: {
    id: 'go',
    kod: 'go',
    ad: 'Golang',
    surum: 'Go 1.22+',
    uzanti: 'go',
    ikon: 'Layers',
    renk: '#00add8',
    aciklama: 'Yüksek eşzamanlılık (concurrency), hafif goroutine yapısı ve ultra hızlı derleme süreleri.',
    kullanim_alani: 'Mikroservisler, Bulut Bilişim, Ağ Araçları, Yüksek Trafikli API',
    calisma_zamani: 'Go Native Runtime',
    ozellikler: [
      'Basit ve yalın dil sözdizimi',
      'Dahili goroutine ve kanal desteği',
      'Tek bir bağımsız ikiliye (binary) derlenme'
    ]
  },
  rust: {
    id: 'rust',
    kod: 'rust',
    ad: 'Rust',
    surum: 'Rust 2024 Edition',
    uzanti: 'rs',
    ikon: 'ShieldCheck',
    renk: '#dea584',
    aciklama: 'Bellek güvenliği (Memory Safety), çöp toplayıcısız (No GC) sıfır maliyetli soyutlamalar.',
    kullanim_alani: 'Sistem Programlama, WebAssembly (WASM), Güvenli Ağ Motorları',
    calisma_zamani: 'Rust LLVM Native Binary / WASM',
    ozellikler: [
      'Bellek sızıntılarına karşı derleme zamanı garantisi',
      'Eşzamanlılıkta veri yarışlarını (data race) önleme',
      'C++ seviyesinde ham hız'
    ]
  }
};

export const DIL_KATALOGU = Object.values(DIL_KATALOGU_HARITASI);
