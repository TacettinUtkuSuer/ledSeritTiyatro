# LED Tiyatro — WLED / ESP32 Tiyatro Işık Masası

Tiyatro sahnelerindeki çok kanallı LED şeritleri (WLED yüklü ESP32) yöneten, **tek dosyalık** (`index.html`), internetsiz çalışan bir ışık kontrol masası.

## Kullanım

| Yöntem | Nasıl |
|---|---|
| **Yerel dosya** | `index.html` dosyasını PC/telefon/tablette çift tıklayarak açın (`file://`). Hiçbir harici kaynak gerekmez. |
| **GitHub Pages (PWA)** | Depoyu Pages ile yayınlayın, bir kez internetliyken açın; Service Worker sayesinde sonra internetsiz de aynı adresten açılır, “Ana ekrana ekle” ile uygulama gibi kurulur. |
| **ESP32 üzerinden** | Ayarlar → “Uygulamayı ESP32’ye yükle”; sonra `http://4.3.2.1/tiyatro.htm`. Aynı kaynaktan çalıştığı için CORS/HTTPS kısıtı yoktur. |

> GitHub Pages **https** olduğundan bazı tarayıcılar yerel `http://` cihaza erişimi (Mixed Content) engeller. Bu durumda dosya olarak açın veya uygulamayı ESP32’ye yükleyin (Ayarlar ekranında ayrıntılı çözümler var).

## Dosyalar
- `index.html` — uygulamanın tamamı (HTML + CSS + JS, satır içi SVG ikonlar, sistem fontları).
- `sw.js`, `manifest.webmanifest`, `icon.svg` — yalnızca GitHub Pages/PWA çevrimdışı önbelleği için (tarayıcılar Service Worker’ı satır içi kabul etmez). `file://` kullanımında gerekmez.

## Özellikler (özet)
- **Bağlantı:** AP modu (4.3.2.1) / Ortak ağ (IP veya `wled.local`) tek tuşla; WebSocket → HTTP JSON → no-cors HTTP API → köprü penceresi yedek zinciri; canlı durum göstergesi; Demo/simülasyon modu.
- **Şeritler:** 10’a kadar farklı GPIO/LED sayısı, isim, ters yön, LED tipi/renk sırası; segment başlangıç/bitişleri otomatik hesaplanıp tek tuşla WLED’e gönderilir; donanım (pin) yazma; **açılışta Blackout** (boot preset + `def.on=false`); cihazdan okuma; şerit tanımlama (yakıp söndürme).
- **Oyunlar (projeler):** her oyunun kendi şeritleri ve sahne akışı; tek dokunuşla geçiş, kopyalama, dışa aktarma.
- **Sahne kartları:** isim, reji notu, 0–30 sn geçiş, alt adımlar (aynı karta her basışta sıradaki adım), otomatik geçiş zamanlayıcısı, kopyalama, sürükle-bırak sıralama, şerit başına WLED efekti / tiyatro efekti / özel efekt; tüm şeritler tek JSON mesajıyla senkron gönderilir.
- **Efektler:** WLED’in 100+ efekti ve paletleri (bağlanınca cihazdan güncellenir) + canlı LED önizleme; dahili tiyatro efektleri (Amber tungsten geçişi, renkli sweep/crossfade, şimşek/fırtına, ateş, deniz, vals, tango, hip-hop, disko); blok/zaman çizelgeli **özel efekt oluşturucu**; WLED `presets.json`, WLED paletleri, xLights `.xpalette`, LedFX gradyanları, GIMP `.gpl` içe aktarma.
- **Canlı:** sabit BLACKOUT / SONRAKİ / Master Dimmer, düzenleme kilidi, Wake Lock, kırmızı gece modu, klavye ve sunum kumandası (Boşluk/PgDn/PgUp/B/↑↓/1–9) desteği.
- **Veri:** her değişiklik otomatik olarak LocalStorage + IndexedDB’ye kaydedilir; tüm arşiv / tek oyun / efektler JSON olarak dışa-içe aktarılır.

Özel ve tiyatro efektleri tarayıcıda hesaplanır ve WebSocket üzerinden (JSON `i` piksel dizisi ya da deneysel DDP-over-WebSocket) akıtılır; tarayıcılar UDP gönderemez.
