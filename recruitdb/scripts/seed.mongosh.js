// Chạy bằng: mongosh "$MONGO_URI/$DB_NAME" scripts/seed.mongosh.js
// Script không xóa document; chỉ tạo collection nếu thiếu và tạo index idempotent.
const database = db.getName();
const names = ['users', 'job_postings', 'candidates', 'applications', 'interviews'];
for (const name of names) {
  if (!db.getCollectionNames().includes(name)) db.createCollection(name);
}
db.users.createIndex({ email: 1 }, { unique: true, name: 'uq_users_email' });
db.users.createIndex({ role: 1, status: 1 }, { name: 'idx_users_role_status' });
db.job_postings.createIndex({ code: 1 }, { unique: true, name: 'uq_job_code' });
db.job_postings.createIndex({ status: 1, department: 1 }, { name: 'idx_job_status_department' });
db.job_postings.createIndex({ skills: 1 }, { name: 'idx_job_skills' });
db.candidates.createIndex({ email: 1 }, { unique: true, name: 'uq_candidate_email' });
db.candidates.createIndex({ skills: 1 }, { name: 'idx_candidate_skills' });
db.candidates.createIndex({ city: 1, yearsExperience: 1 }, { name: 'idx_candidate_city_experience' });
db.applications.createIndex({ candidateId: 1, jobId: 1 }, { unique: true, name: 'uq_application_candidate_job' });
db.applications.createIndex({ jobId: 1, status: 1 }, { name: 'idx_application_job_status' });
db.applications.createIndex({ assignedRecruiterId: 1, stage: 1 }, { name: 'idx_application_recruiter_stage' });
db.interviews.createIndex({ applicationId: 1, round: 1 }, { unique: true, name: 'uq_interview_application_round' });
db.interviews.createIndex({ scheduledAt: 1, status: 1 }, { name: 'idx_interview_schedule_status' });
print(`Schema/index setup complete for ${database}. Next: bash scripts/import.sh`);
