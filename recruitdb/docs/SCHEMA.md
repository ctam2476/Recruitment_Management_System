# Schema MongoDB – Quản lý tuyển dụng nhân viên

## 1. Quyết định mô hình

Mô hình dùng **5 collections**. Các document có vòng đời riêng được tách ra và nối bằng reference; dữ liệu nhỏ, thường đọc cùng document được embed. Vì đây là dataset giáo dục, `_id` dùng chuỗi có tiền tố (`cand_001`, `job_001`...) để nhìn reference dễ hơn trong Mingo và không mất liên kết khi import/export JSON.

| Collection | Cardinality minh họa | Quyết định chính |
|---|---:|---|
| `users` | 5 | một danh mục người dùng nội bộ, reference từ job/application/interview |
| `job_postings` | 4 | embed `skills`, `salaryRange`; reference `createdBy` |
| `candidates` | 6 | embed kỹ năng và thông tin liên hệ được giả lập |
| `applications` | 6 | collection trung tâm, unique theo `candidateId + jobId` |
| `interviews` | 4 | một application có nhiều round; reference interviewer qua array |

## 2. Field contract

### `users`

| Field | Type | Rule | Ý nghĩa |
|---|---|---|---|
| `_id` | String | required | mã người dùng |
| `fullName`, `email` | String | required | thông tin hiển thị và liên hệ giả lập |
| `role` | Enum | required | `recruiter`, `interviewer`, `hiring_manager` |
| `department` | String | required | phòng ban |
| `status` | Enum | required | `active`, `inactive` |
| `createdAt` | ISO Date string | required | thời điểm tạo |

Index: `email` unique; `role + status`.

### `job_postings`

`code` unique; `skills` là array để tạo multikey index; `salaryRange` được embed vì luôn hiển thị cùng job. `createdBy` tham chiếu `users._id`.

### `candidates`

`skills` được embed; `consentStatus` mô phỏng trạng thái đồng ý lưu hồ sơ. Index `email` unique, `skills` multikey và `city + yearsExperience`.

### `applications`

`candidateId` → `candidates._id`; `jobId` → `job_postings._id`; `assignedRecruiterId` → `users._id`. `stage` mô tả tiến trình: `screening`, `technical`, `interview`, `offer`, `hired`. `status` mô tả trạng thái hồ sơ: `in_progress`, `paused`, `rejected`, `hired`. Unique compound index ngăn một ứng viên gửi trùng một job.

### `interviews`

`applicationId` → `applications._id`; `interviewerIds` → một hoặc nhiều `users._id`. `applicationId + round` unique để một hồ sơ không có hai document cùng vòng.

## 3. Vì sao không gom tất cả vào một document?

Một job có nhiều candidate, một candidate có thể ứng tuyển nhiều job, và một application có nhiều interview round. Nếu embed toàn bộ, document lớn nhanh, cập nhật khó và truy vấn theo collection sẽ kém rõ. Vì vậy ta tách entity có vòng đời/truy cập độc lập; chỉ embed mảng kỹ năng và object lương nhỏ.

## 4. Index cần giải thích

- **Unique index** bảo vệ business rule: email không trùng, job code không trùng, một cặp candidate/job không trùng.
- **Compound index** phục vụ màn hình quản trị: lọc job theo status/department, application theo job/status, interview theo thời gian/status.
- **Multikey index** phục vụ lọc kỹ năng trong array.

## 5. Dataset và quyền truy cập

Dữ liệu trong `data/` là dữ liệu giả lập phục vụ học tập. Khi dùng Atlas, tạo user riêng cho database demo, cấp quyền tối thiểu cần thiết; không sử dụng tài khoản admin trong Mingo hoặc script demo.
