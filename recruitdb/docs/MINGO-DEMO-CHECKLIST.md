# Checklist demo Mingo – 5 đến 7 phút

## Trước buổi demo

1. Chạy `npm run check`.
2. Đảm bảo MongoDB đang chạy và export `MONGO_URI`, `DB_NAME`.
3. Chạy `mongosh "$MONGO_URI/$DB_NAME" scripts/seed.mongosh.js`.
4. Chạy `bash scripts/import.sh`.
5. Mở Mingo và kết nối cùng URI. Kiểm tra có 5 collection và các index.
6. Mở ứng dụng RecruitDB để dùng các trang **Schema**, **Relations** và **Query library** làm slide phụ trợ.

## Kịch bản nói

### 1. Kết nối và overview – 45 giây

Trong Mingo chọn **New Connection**, đặt tên `RecruitDB local`, dán URI. Mở database `hr_recruitment`. Nói: “Ứng dụng tuyển dụng có nhiều entity có vòng đời riêng, nên nhóm tách thành 5 collections thay vì cố ép vào bảng quan hệ.”

### 2. Document view – 60 giây

Mở `candidates`. Chuyển tree/grid view và ghim `fullName`, `currentTitle`, `skills`, `yearsExperience`. Cho thấy một document có nested/array field. Mở `applications`, chỉ ra `candidateId` và `jobId` là reference logic.

### 3. Relations – 60 giây

Mở một application. Click hoặc mở Finder với `candidateId = cand_001`, rồi mở candidate tương ứng. Làm tương tự với `jobId = job_001`. Nói rõ MongoDB không enforce foreign key như SQL; schema convention + index + ứng dụng chịu trách nhiệm giữ tính nhất quán.

### 4. Filter và date shortcut – 60 giây

Trên `applications` lọc:

```js
{ "stage": "technical", "status": "in_progress" }
```

Trên `candidates` lọc `yearsExperience >= 3` và `consentStatus = granted`. Nếu phiên bản Mingo hỗ trợ date shorthand, thử `#last7Days` cho `appliedAt`; nếu không, dùng query ISO Date chuẩn.

### 5. Schema Analyzer – 60 giây

Chạy Schema Analyzer trên `applications`. Chỉ ra các field có type ổn định, `score` có thể nullable và `notes` có thể nullable. Liên hệ với bảng field contract trong trang **Schema & Index** của RecruitDB.

### 6. Aggregation Builder – 60 giây

Tạo pipeline group theo `stage`:

```js
[
  { $group: { _id: "$stage", total: { $sum: 1 } } },
  { $sort: { total: -1 } }
]
```

Nói: “Pipeline này tạo funnel để recruiter biết hồ sơ đang dồn ở bước nào.” Nếu còn thời gian, thêm `$lookup` từ applications sang job_postings.

### 7. Backup/restore – 60 giây

Thoát Mingo hoặc giữ nguyên để quan sát. Chạy:

```bash
bash scripts/backup.sh
```

Chỉ trên database demo: xóa thử một collection/document, refresh Mingo để thấy mất dữ liệu, rồi chạy `bash scripts/restore.sh <đường-dẫn-backup>` và gõ `YES`. Refresh lại để chứng minh dữ liệu phục hồi.

## Câu kết

“Mingo là GUI giúp khám phá và kiểm chứng model nhanh; còn schema convention, index, quyền truy cập và backup script mới là phần bảo đảm hệ thống vận hành được.”

## Fallback nếu Mingo lỗi

Mở trang **Query library** của RecruitDB để trình bày pipeline/query, và dùng MongoDB Compass nếu cần GUI thay thế. Không dán password hoặc URI chứa mật khẩu vào screenshot.
