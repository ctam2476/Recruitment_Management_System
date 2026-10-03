# RecruitDB – Quản lý tuyển dụng nhân viên

Ứng dụng minh họa cho đồ án CSDL NoSQL, tập trung vào phạm vi **thành viên 1**: Mingo, schema MongoDB, dữ liệu mẫu và script vận hành.

## Chạy nhanh

```bash
npm run check
npm run dev
```

Mở `http://localhost:3000`. Ứng dụng không cần cài package ngoài Node.js 20+.

## Chạy MongoDB để thực hành Mingo

Có thể dùng MongoDB local hoặc MongoDB Atlas. Không commit URI có mật khẩu vào GitHub.

```bash
export MONGO_URI='mongodb://127.0.0.1:27017'
export DB_NAME='hr_recruitment'
node scripts/check-json.mjs
mongosh "$MONGO_URI/$DB_NAME" scripts/seed.mongosh.js
bash scripts/import.sh
```

Nếu dùng Atlas, thay URI bằng connection string của cluster và cho IP của máy vào Network Access. Sau đó trong Mingo chọn **New Connection**, dán cùng URI, mở database `hr_recruitment`.

## Cấu trúc dữ liệu

| Collection | Vai trò | Reference chính |
|---|---|---|
| `users` | recruiter, interviewer, hiring manager | được tham chiếu bởi job/interview/application |
| `job_postings` | tin tuyển dụng | `createdBy` → `users._id` |
| `candidates` | hồ sơ ứng viên | `candidateId` của application → `_id` |
| `applications` | hồ sơ ứng tuyển | `jobId`, `candidateId`, `assignedRecruiterId` |
| `interviews` | các vòng phỏng vấn | `applicationId`, `interviewerIds` |

Chi tiết ở [`docs/SCHEMA.md`](docs/SCHEMA.md). Dữ liệu mẫu tĩnh nằm trong `data/` và được ứng dụng nạp ở browser.

## Script vận hành

```bash
export MONGO_URI='mongodb://127.0.0.1:27017'
export DB_NAME='hr_recruitment'

# Seed bằng mongosh
mongosh "$MONGO_URI/$DB_NAME" scripts/seed.mongosh.js

# Backup BSON đầy đủ (không dùng để commit lên GitHub)
bash scripts/backup.sh

# Restore một backup đã tạo
bash scripts/restore.sh backups/hr_recruitment-YYYYMMDD-HHMMSS

# Import các JSON array trong data/
bash scripts/import.sh

# Export JSON Extended từ database
bash scripts/export.sh exports/latest
```

> `mongodump/mongorestore` là backup dạng BSON; `mongoimport/mongoexport` phù hợp trao đổi JSON/CSV. Không coi CSV là backup bảo toàn kiểu dữ liệu.

## Demo Mingo

Làm theo [`docs/MINGO-DEMO-CHECKLIST.md`](docs/MINGO-DEMO-CHECKLIST.md), đặc biệt các phần: filter theo trạng thái, mở reference, Schema Analyzer, Aggregation Builder và backup/restore.

## GitHub và gửi nhóm trưởng

Xem [`docs/GITHUB-EMAIL-HANDOFF.md`](docs/GITHUB-EMAIL-HANDOFF.md) để:
1. tạo branch `feature/member-1-mingo-schema`;
2. push code lên repository nhóm;
3. mời cộng tác viên bằng **Settings → Collaborators**;
4. gửi email chứa link repository, commit và phần đã hoàn thành.

## Nguồn tham khảo

- [Mingo – The Fastest MongoDB GUI](https://mingo.io/)
- [MongoDB Backup and Restore Tools](https://www.mongodb.com/docs/manual/tutorial/backup-and-restore-tools/)
- [MongoDB Import and Export](https://www.mongodb.com/docs/compass/import-export/)
