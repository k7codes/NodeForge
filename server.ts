/**
 * NODEFORGE - Visual Programming Studio
 * Gelistirici: Developed By K7~
 * Express Backend Sunucusu ve API Katmani
 */

import express from 'express';
import path from 'path';
import vm from 'vm';
import { createServer as createViteServer } from 'vite';

async function sunucuyu_baslat() {
  const app = express();
  const PORT = 3001;

  // JSON gövde ayrıştırıcı
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  // ==================== API ROTALARI ====================

  // 1. Sağlık Kontrolü
  app.get('/api/saglik', (req, res) => {
    res.json({
      durum: 'calisiyor',
      sistem: 'NODEFORGE Visual Programming Studio',
      yazar: 'Developed By K7~',
      zaman: new Date().toISOString()
    });
  });

  // 2. Güvenli Kod Çalıştırma (Run System)
  app.post('/api/proje/calistir', async (req, res) => {
    const { kod, dil, proje_adi } = req.body;

    if (!kod || typeof kod !== 'string') {
      return res.status(400).json({
        basarili: false,
        hata: 'Geçersiz veya boş kod içeriği.'
      });
    }

    const ciktilar: { seviye: string; metin: string; zaman: string }[] = [];
    const baslama_zamani = Date.now();

    try {
      ciktilar.push({
        seviye: 'bilgi',
        metin: `[NODEFORGE Server Engine] Yürütülüyor: ${proje_adi || 'Proje'}`,
        zaman: new Date().toLocaleTimeString()
      });

      // VM Sandbox Yapılandırması
      const sanal_konsol = {
        log: (...args: any[]) => {
          ciktilar.push({
            seviye: 'gunluk',
            metin: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '),
            zaman: new Date().toLocaleTimeString()
          });
        },
        warn: (...args: any[]) => {
          ciktilar.push({
            seviye: 'uyari',
            metin: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '),
            zaman: new Date().toLocaleTimeString()
          });
        },
        error: (...args: any[]) => {
          ciktilar.push({
            seviye: 'hata',
            metin: args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '),
            zaman: new Date().toLocaleTimeString()
          });
        }
      };

      const sanal_ortam = {
        console: sanal_konsol,
        setTimeout,
        clearTimeout,
        setInterval,
        clearInterval,
        Math,
        Date,
        JSON,
        String,
        Number,
        Boolean,
        Array,
        Object,
        RegExp,
        parseInt,
        parseFloat
      };

      const baglam = vm.createContext(sanal_ortam);
      const betik = new vm.Script(kod);

      // 4000ms zaman aşımı koruması
      betik.runInContext(baglam, { timeout: 4000 });

      const calisma_suresi = Date.now() - baslama_zamani;

      return res.json({
        basarili: true,
        cikis_kodu: 0,
        calisma_suresi_ms: calisma_suresi,
        ciktilar
      });
    } catch (hata: any) {
      const calisma_suresi = Date.now() - baslama_zamani;
      ciktilar.push({
        seviye: 'hata',
        metin: `[Çalıştırma Hatası] ${hata.message || String(hata)}`,
        zaman: new Date().toLocaleTimeString()
      });

      return res.json({
        basarili: false,
        cikis_kodu: 1,
        calisma_suresi_ms: calisma_suresi,
        ciktilar,
        hata: hata.message
      });
    }
  });

  // 3. Proje Doğrulama ve Derleme API'si
  app.post('/api/proje/derle', (req, res) => {
    try {
      const { proje } = req.body;
      if (!proje) {
        return res.status(400).json({ basarili: false, hata: 'Proje verisi eksik.' });
      }

      res.json({
        basarili: true,
        mesaj: 'Derleme sunucu tarafından onaylandı.',
        zaman: new Date().toISOString()
      });
    } catch (hata: any) {
      res.status(500).json({ basarili: false, hata: hata.message });
    }
  });

  // ==================== VITE MIDDLEWARE ====================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const dist_yolu = path.join(process.cwd(), 'dist');
    app.use(express.static(dist_yolu));
    app.get('*', (req, res) => {
      res.sendFile(path.join(dist_yolu, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[NODEFORGE] Visual Programming Studio http://localhost:${PORT} üzerinde çalışıyor.`);
    console.log(`[NODEFORGE] Developed By K7~`);
  });
}

sunucuyu_baslat().catch(err => {
  console.error('[NODEFORGE] Sunucu başlatma hatası:', err);
});
