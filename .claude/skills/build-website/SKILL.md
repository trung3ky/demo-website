Tạo landing page cho quán/cơ sở kinh doanh từ Google Maps link, với visual identity riêng biệt.

Arguments: `$ARGUMENTS` — gồm `<google-maps-link> [tên-slug]`
- `google-maps-link`: URL Google Maps (dạng `maps.app.goo.gl/...` hoặc `google.com/maps/...`)
- `tên-slug` (tuỳ chọn): tên thư mục route. Nếu không có thì tự suy ra từ tên quán.

---

## Bước 1 — Lấy tên quán và Facebook page từ Google Maps

**WebFetch** URL Google Maps (follow redirect nếu là short link).

Mục tiêu: chỉ cần lấy được **tên quán** và **Facebook page** (nếu có trong listing). Google Maps thường không render đủ text — dùng kết quả để bước tiếp theo.

Nếu không lấy được gì từ WebFetch → **WebSearch**: `"<tên quán>" Đà Nẵng` hoặc địa danh tương ứng.

---

## Bước 2 — Thu thập thông tin từ Facebook chính chủ (NGUỒN ƯU TIÊN CAO NHẤT)

**WebSearch**: `"<tên quán>" site:facebook.com` hoặc `"<tên quán>" facebook`

Tìm Facebook page chính thức (thường có dạng `facebook.com/<tenquan>`).

**WebFetch** Facebook page đó, trích xuất:
- **Tất cả địa chỉ chi nhánh** (thường trong phần About, hoặc các bài post ghim)
- **Số điện thoại** chính thức
- **Giờ mở cửa**
- **Mô tả quán** (About section)
- **Tên slug Facebook** (để link đến)
- **Logo / brand vibe** qua mô tả ảnh bìa, ảnh đại diện
- **Link Google Maps** nếu được đăng trong About hoặc post

**WebFetch** thêm các bài post gần đây nếu cần tìm thông tin chi nhánh mới.

> Ưu tiên thông tin từ Facebook chính chủ hơn bất kỳ nguồn nào khác. Nếu Facebook nói "3 chi nhánh" → phải có đủ 3 chi nhánh trên website.

---

## Bước 3 — Lấy Google Maps embed URL cho từng chi nhánh

Đây là bước quan trọng — **không bao giờ tự bịa hoặc tự tính toán pb URL**.

### Chiến lược lấy embed URL (theo thứ tự ưu tiên):

**① Từ link Maps trực tiếp có `pb=`:**
Nếu URL gốc hoặc URL sau redirect chứa `?pb=` hoặc `/place/.../@lat,lng,...` → extract place ID và coordinates từ URL đó.

Format embed chuẩn khi có đủ dữ liệu:
```
https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d<d>!2d<viewport_lng>!3d<viewport_lat>!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s<place_id_encoded>!2s<name_encoded>!5e0!3m2!1svi!2svn!4v<timestamp>!5m2!1svi!2svn
```
- `<d>` = ~900 cho zoom 17 (street level), ~3500 cho zoom 15 (khu vực)
- `<viewport_lng>` và `<viewport_lat>` = lấy từ `@lat,lng` trong URL Maps (đây là viewport center, không phải business location)
- `<place_id_encoded>` = place ID dạng `0x...:0x...`, encode `:` thành `%3A`
- `<timestamp>` = bất kỳ số 13 chữ số nào

**② Từ short link `maps.app.goo.gl/...`:**
**WebFetch** short link → lấy redirect URL → extract `@lat,lng,zoom` và `!1s<placeId>` từ URL.

**③ Từ site thứ ba (movemap.net, foody.vn, khamphadanang.vn, mia.vn):**
**WebSearch**: `"<tên chi nhánh>" movemap.net` hoặc `"<địa chỉ>" google maps link`
**WebFetch** kết quả → thường có Google Maps short link hoặc coordinates.

**④ Không tìm được → đặt placeholder và hướng dẫn rõ:**
```
embed: 'YOUR_EMBED_URL_HERE',
```
Báo lại với user: "Vào Google Maps → tìm `<tên chi nhánh>` → bấm **Chia sẻ** → tab **Nhúng bản đồ** → copy đoạn `src="..."` trong thẻ `<iframe>`."

**Không bao giờ bịa tọa độ hay tự điền số ngẫu nhiên vào pb URL.**

---

## Bước 4 — Tìm branding thực tế

**① Tìm logo và màu brand qua WebSearch:**
`"<tên quán>" logo` / `"<tên quán>" facebook cover`

**② Quan sát ảnh không gian** (từ Google Maps photos, Facebook, blog):
Xác định vibe: cổ điển, tươi mới, hiện đại, rustic, local, trendy?

**③ Nếu không tìm được branding rõ ràng** → tự xây palette từ vibe quan sát được.

Ba default cần tránh (trừ khi brand thực sự dùng):
1. Nền kem `#F4F1EA` + serif + terracotta
2. Nền gần đen + acid-green
3. Layout broadsheet với hairline rules

---

## Bước 5 — Design Planning

Tạo token system cho quán này:

**Màu sắc** — 4–6 hex có tên ngắn gọn (CSS custom property):
- `--primary`, `--accent`, `--bg`, `--text`, v.v.
- Lấy từ logo nếu có; không dùng Tailwind generic làm primary

**Typography** — 2 roles, từ Google Fonts, không dùng Inter/Roboto/Arial:
- Display face (title, logo)
- Body face (nội dung)

**Layout concept** — ASCII wireframe 3-5 dòng

**Signature element** — 1 điều độc đáo liên quan đến vibe

Xác nhận với user (tóm tắt ngắn: tên, slug, palette, fonts, signature) trước khi code.

---

## Bước 6 — Tạo files

### `src/app/[slug]/layout.tsx`
SEO metadata (title, description, keywords, openGraph) dùng thông tin thực tế từ Facebook/Maps.

### `src/app/[slug]/page.tsx`

`"use client"` — React + Tailwind thuần. Sections theo thứ tự:

1. **Navbar** — logo text với font display, nav links, CTA gọi điện
2. **Hero** — theo layout concept, thể hiện signature element
3. **About** — 3 điểm nổi bật thực tế của quán
4. **Menu** — thông tin thực tế nếu có; mock phù hợp loại hình nếu không
5. **Gallery** — 6-8 ảnh Unsplash theo vibe của quán, lightbox
6. **Reviews** — 4 reviews mock thực tế, form đánh giá
7. **Location** — Google Maps iframe embed; nhiều chi nhánh → tab switcher với tab cho từng chi nhánh; địa chỉ/SĐT/giờ mở cửa thực tế
8. **Footer** — tên, tất cả địa chỉ chi nhánh, SĐT, Facebook link

**Yêu cầu kỹ thuật:**
- CSS custom properties trong `:root` cho toàn bộ palette — không hardcode Tailwind color generic
- Google Fonts: import qua `<style dangerouslySetInnerHTML>` trong component
- `<img>` thường, không dùng `next/image`
- SVG icons inline
- Unsplash: `https://images.unsplash.com/photo-<ID>?auto=format&fit=crop&q=80&w=800`
- Responsive mobile-first

**Xử lý embed URL:**
```tsx
// Nếu chi nhánh chưa có embed URL thật, hiển thị placeholder thay vì iframe broken
{branch.embed === 'YOUR_EMBED_URL_HERE' ? (
  <div className="...">
    <p>{branch.address}</p>
    <p>Cần cập nhật embed URL Google Maps</p>
  </div>
) : (
  <iframe src={branch.embed} width="100%" height="100%" style={{ border: 0 }}
    loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade"
    title={`Bản đồ ${branch.label}`} />
)}
```

### `src/app/[slug]/icon.svg`
Favicon 32×32 dùng màu từ palette, chữ tắt tên quán.

---

## Bước 7 — Báo cáo

Sau khi tạo files xong:

1. Liệt kê 3 files đã tạo
2. URL xem: `/<slug>`
3. Danh sách những gì là mock (menu items, gallery photos, reviews)
4. **Danh sách embed URL nào còn placeholder** và hướng dẫn cụ thể cách lấy từng cái

---

## Lưu ý tổng quát

- **Facebook chính chủ > Google Maps > blog/review sites** về độ chính xác thông tin
- Địa chỉ, SĐT, giờ mở cửa, số chi nhánh — **phải khớp với Facebook chính thức**
- Embed URL — **phải từ nguồn thật**, không tự tính toán
- Slug: lowercase, gạch ngang, không dấu tiếng Việt. VD: `quan-ca-phe-abc`
- Copy là design material: viết từ góc nhìn người dùng, không sáo rỗng
