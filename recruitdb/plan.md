# Kế hoạch RecruitDB – Minh họa CSDL NoSQL tuyển dụng

## Mục tiêu
Tạo một ứng dụng web minh họa bằng tiếng Việt để thành viên 1 có thể trình bày: cách thiết kế document database cho bài toán tuyển dụng, cách quan sát dữ liệu bằng Mingo, và cách vận hành dữ liệu bằng backup/restore/import/export. Ứng dụng là lớp minh họa độc lập; nhóm trưởng và thành viên 2 có thể nối API MongoDB thật ở giai đoạn sau.

## Phạm vi sản phẩm
- Dashboard tổng quan với số liệu và biểu đồ cơ bản.
- Trình duyệt 5 collection: `users`, `job_postings`, `candidates`, `applications`, `interviews`.
- Trang schema có field, kiểu, bắt buộc/không bắt buộc, index và document mẫu.
- Trang quan hệ giải thích reference giữa các collection.
- Hướng dẫn thao tác Mingo: kết nối, xem document, filter, aggregation, Schema Analyzer, Relations.
- Thư viện query và aggregation có thể sao chép.
- Trang script backup/restore/import/export.
- Trang so sánh Mingo với MongoDB Compass, Studio 3T và NoSQLBooster.

## Kiến trúc
- **Frontend**: HTML/CSS/JavaScript thuần, không phụ thuộc npm; dễ chạy trong lớp và dễ bàn giao cho các thành viên.
- **Dev server**: Node.js `server.mjs` dùng `node:http`, phục vụ thư mục `public/` và `data/`.
- **Dữ liệu minh họa**: JSON tĩnh trong `data/`, không chứa thông tin cá nhân thật.
- **MongoDB thật**: scripts trong `scripts/` nhận `MONGO_URI` và `DB_NAME`; Mingo kết nối trực tiếp tới cùng URI.
- **Triển khai**: serve SPA/static frontend từ container Node. Chưa bật database managed vì đề tài cần MongoDB riêng để thao tác trong Mingo.

## Cấu trúc chính
```text
public/              giao diện và mã frontend
public/data/         dữ liệu JSON dùng cho preview (copy từ data/)
data/                dataset mẫu cho mongoimport và ứng dụng
scripts/              backup, restore, import, export, seed, kiểm tra JSON
docs/                 hướng dẫn thành viên 1, schema, demo, GitHub/email
server.mjs           static server với route fallback cho SPA
Dockerfile            chạy preview/production bằng Node
```

## Kiểm tra và bàn giao
- `node scripts/check-json.mjs` kiểm tra toàn bộ JSON.
- `node server.mjs` rồi truy cập `http://localhost:3000`.
- Mở Mingo, kết nối tới MongoDB, chạy `scripts/seed.mongosh.js`, rồi làm demo theo `docs/MINGO-DEMO-CHECKLIST.md`.
- Gửi cho trưởng nhóm đường dẫn GitHub sau khi push branch `feature/member-1-mingo-schema` và gửi email theo mẫu trong `docs/GITHUB-EMAIL-HANDOFF.md`.
