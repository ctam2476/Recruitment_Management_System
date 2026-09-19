export const jobsData = [
  {
    id: "J01",
    title: "Senior Frontend Developer",
    department: "Engineering",
    type: "Full-time",
    workModel: "Hybrid",
    salary: "$1,500 - $2,500",
    deadline: "2026-10-15",
    status: "Open",
    skills: ["React", "TailwindCSS", "TypeScript"],
    description: "Looking for an experienced Frontend Developer to lead our UI team."
  },
  {
    id: "J02",
    title: "Backend Node.js Engineer",
    department: "Engineering",
    type: "Full-time",
    workModel: "Remote",
    salary: "$1,200 - $2,000",
    deadline: "2026-10-10",
    status: "Open",
    skills: ["Node.js", "MongoDB", "Express"],
    description: "Join our backend team to build scalable APIs."
  },
  {
    id: "J03",
    title: "UI/UX Designer",
    department: "Design",
    type: "Full-time",
    workModel: "On-site",
    salary: "$1,000 - $1,500",
    deadline: "2026-09-30",
    status: "Closed",
    skills: ["Figma", "UI Design", "Prototyping"],
    description: "Design intuitive interfaces for our upcoming products."
  },
  {
    id: "J04",
    title: "HR Specialist",
    department: "Human Resources",
    type: "Full-time",
    workModel: "On-site",
    salary: "$800 - $1,200",
    deadline: "2026-11-01",
    status: "Open",
    skills: ["Recruitment", "Communication", "Management"],
    description: "Manage end-to-end recruitment process."
  }
];

export const candidatesData = [
  {
    id: "C01",
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0901234567",
    jobId: "J01",
    jobTitle: "Senior Frontend Developer",
    skills: ["React", "JavaScript", "CSS"],
    experience: "4 years",
    status: "New", // New, Interviewing, Hired, Rejected
    appliedDate: "2026-09-10",
    cvLink: "#"
  },
  {
    id: "C02",
    name: "Trần Thị B",
    email: "tranthib@gmail.com",
    phone: "0912345678",
    jobId: "J02",
    jobTitle: "Backend Node.js Engineer",
    skills: ["Node.js", "MongoDB", "AWS"],
    experience: "3 years",
    status: "Interviewing",
    appliedDate: "2026-09-12",
    cvLink: "#"
  },
  {
    id: "C03",
    name: "Lê Văn C",
    email: "levanc@gmail.com",
    phone: "0923456789",
    jobId: "J01",
    jobTitle: "Senior Frontend Developer",
    skills: ["React", "Vue", "Tailwind"],
    experience: "5 years",
    status: "Hired",
    appliedDate: "2026-09-01",
    cvLink: "#"
  },
  {
    id: "C04",
    name: "Phạm Thị D",
    email: "phamthid@gmail.com",
    phone: "0934567890",
    jobId: "J04",
    jobTitle: "HR Specialist",
    skills: ["Sourcing", "Interviewing"],
    experience: "2 years",
    status: "Rejected",
    appliedDate: "2026-09-15",
    cvLink: "#"
  },
  {
    id: "C05",
    name: "Hoàng Văn E",
    email: "hoangvane@gmail.com",
    phone: "0945678901",
    jobId: "J02",
    jobTitle: "Backend Node.js Engineer",
    skills: ["Node.js", "Python", "SQL"],
    experience: "1 year",
    status: "New",
    appliedDate: "2026-09-18",
    cvLink: "#"
  }
];

export const interviewsData = [
  {
    id: "I01",
    candidateId: "C02",
    candidateName: "Trần Thị B",
    jobTitle: "Backend Node.js Engineer",
    interviewer: "Admin User",
    date: "2026-09-22T09:00",
    format: "Online", // Online, Offline
    location: "Google Meet Link",
    status: "Scheduled" // Scheduled, Completed, Cancelled
  },
  {
    id: "I02",
    candidateId: "C03",
    candidateName: "Lê Văn C",
    jobTitle: "Senior Frontend Developer",
    interviewer: "Tech Lead",
    date: "2026-09-15T14:00",
    format: "Offline",
    location: "Meeting Room A",
    status: "Completed"
  },
  {
    id: "I03",
    candidateId: "C05",
    candidateName: "Hoàng Văn E",
    jobTitle: "Backend Node.js Engineer",
    interviewer: "Admin User",
    date: "2026-09-25T10:00",
    format: "Online",
    location: "Zoom Link",
    status: "Scheduled"
  }
];

export const usersData = [
  {
    id: "U01",
    name: "Nguyễn Admin",
    email: "admin@company.com",
    role: "Admin",
    isActive: true
  },
  {
    id: "U02",
    name: "Trần HR",
    email: "hr@company.com",
    role: "HR Specialist",
    isActive: true
  },
  {
    id: "U03",
    name: "Lê Interviewer",
    email: "interviewer@company.com",
    role: "Interviewer",
    isActive: false
  }
];
