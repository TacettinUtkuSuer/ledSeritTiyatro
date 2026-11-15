# LED Tiyatro — WLED / ESP32 Tiyatro Işık Masası (v2)

Tiyatro sahnesindeki çok kanallı LED şeritleri (WLED 0.15+/16.x yüklü ESP32) yöneten, **tek dosyalık** (`index.html`) kontrol masası.

## Kurulum (bir kez)
1. ESP32’ye WLED kurun (install.wled.me), `4.3.2.1` üzerinden salonun ağına bağlayın. Modemde ESP32’ye **sabit IP** (DHCP rezervasyonu) verin.
2. `index.html` dosyasını WLED’in dosya yöneticisinden (`http://IP/edit`) **`tiyatro.htm`** adıyla yükleyin.
3. `http://IP/tiyatro.htm` adresini açın → **Kontrol** sekmesi → “Tümünü Düzelt” + “Akış testi” + “Fail-safe testi”.

## Nasıl çalışır
- **Sadece kartlar:** Işığı yalnızca bir karta dokunmak açar. Otomatik ileri geçiş yoktur; bir kartın içinde zamanlı adımlar (ör. gök gürültüsü → şimşek → yağmur) olabilir, son adımda kalır.
- **Fail-safe:** Tüm sahneler tarayıcıda hesaplanıp DDP-over-WebSocket ile akıtılır. Bağlantı ya da bilgisayar giderse ışıklar ayarlanan süre (varsayılan 5 sn) son görüntüde kalır, sonra WLED kendiliğinden söndürür. Kısa kopmalar sahneyi etkilemez. Söndükten sonra uygulama asla kendiliğinden yakmaz.
- **Açılış:** ESP32 elektrik gidip gelince hep kapalı başlar (Kontrol sekmesi ayarlar).
- **Birden fazla ekran:** Her ekrandan kart tetiklenebilir; son dokunan ekran yayın yapar, diğerleri anında durur ve aynı durumu gösterir. Master dimmer ve blackout tüm ekranlarda senkron.
- **Veriler ESP32’de:** Oyunlar, kartlar, şeritler, efektler ESP32’de A/B yuvalı dosyalarda (`/tiyatro-a.json`, `/tiyatro-b.json`) saklanır; IP değişse veya başka cihazdan açılsa da aynı veriler gelir.
- **Düzenleme modu:** Aynı anda tek ekran düzenler (kilit). Değişiklikler 3 sn içinde otomatik taslağa (`/tiyatro-draft.json`) yazılır; “Kaydet” ile kalıcı olur. Çakışan kayıtlar tespit edilir. Canlı oyun sırasında ESP32’ye dosya yazılmaz.
- **Eski yedekler:** v1 JSON dosyaları içe aktarılabilir (alt adımlar otomatik dönüştürülür).

## Dosyalar
- `index.html` — uygulamanın tamamı.
- `sw.js`, `manifest.webmanifest`, `icon.svg` — yalnızca GitHub Pages’ten demo/önizleme için (çevrimdışı önbellek).
