import { db } from "@/lib/db"; // Đường dẫn file db của bạn
import { 
  users, profiles, skills, companies, projects, projectSkills 
} from "@/db/schema";

export async function seed() {
  console.log("🌱 Bắt đầu tạo dữ liệu mẫu...");

  // 1. DATA MẪU: USERS
  const mockUsers = [
    {
      id: 1,
      username: "baongo_dev",
      email: "bao.ngo@example.com",
      passwordHash: "hashed_password_123", // Thực tế dùng bcrypt/argon2
      role: "admin" as const,
      isActive: true,
    },
    {
      id: 2,
      username: "jane_doe",
      email: "jane.designer@example.com",
      passwordHash: "hashed_password_456",
      role: "user" as const,
      isActive: true,
    },
  ];

  // 2. DATA MẪU: PROFILES
  const mockProfiles = [
    {
      id: 1,
      userId: 1,
      fullName: "Ngô Bảo",
      jobTitle: "Senior Fullstack Developer",
      bio: "Đam mê xây dựng các ứng dụng web hiệu năng cao với Next.js và hệ sinh thái TypeScript. Luôn học hỏi và cập nhật công nghệ mới.",
      avatarUrl: "",
      phone: "0987654321",
      address: "Hồ Chí Minh, Việt Nam",
      socialLinks: {
        github: "https://github.com/baongo",
        linkedin: "https://linkedin.com/in/baongo",
        twitter: "https://twitter.com/baongo"
      },
    },
    {
      id: 2,
      userId: 2,
      fullName: "Jane Doe",
      jobTitle: "UI/UX Designer",
      bio: "Sáng tạo trải nghiệm người dùng tối ưu và giao diện hiện đại.",
      avatarUrl: "",
      socialLinks: {
        dribbble: "https://dribbble.com/jane"
      },
    }
  ];

  // 3. DATA MẪU: SKILLS
  const mockSkills = [
    { id: 1, name: "TypeScript", type: "language" as const, proficiency: 90, iconUrl: "https://cdn.iconscout.com/icon/free/png-256/typescript-1174965.png" },
    { id: 2, name: "Next.js", type: "framework" as const, proficiency: 85, iconUrl: "https://cdn.worldvectorlogo.com/logos/nextjs-2.svg" },
    { id: 3, name: "PostgreSQL", type: "database" as const, proficiency: 80, iconUrl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Postgresql_elephant.svg" },
    { id: 4, name: "Docker", type: "tool" as const, proficiency: 75, iconUrl: "https://cdn.iconscout.com/icon/free/png-256/docker-226091.png" },
    { id: 5, name: "Teamwork", type: "soft_skill" as const, proficiency: 95, description: "Kỹ năng làm việc nhóm Agile/Scrum" },
  ];

  // 4. DATA MẪU: COMPANIES (Kinh nghiệm làm việc của Admin)
  const mockCompanies = [
    {
      id: 1,
      profileId: 1,
      name: "TechCorp Vietnam",
      position: "Frontend Developer",
      startDate: "2021-03-01",
      endDate: "2023-01-31", // Đã nghỉ
      description: "Phát triển hệ thống CRM nội bộ bằng React và Redux.",
      location: "Quận 1, TP.HCM"
    },
    {
      id: 2,
      profileId: 1,
      name: "Unicorn Startup",
      position: "Senior Fullstack Engineer",
      startDate: "2023-02-01",
      endDate: null, // Đang làm việc (Present)
      description: "Thiết kế kiến trúc hệ thống với Next.js App Router, quản lý database PostgreSQL.",
      location: "Remote"
    }
  ];

  // 5. DATA MẪU: PROJECTS
  const mockProjects = [
    {
      id: 1,
      companyId: 1, // Thuộc TechCorp
      profileId: 1,
      name: "Hệ thống CRM v2.0",
      description: "Nâng cấp giao diện người dùng và tối ưu hóa tốc độ load trang cho 10.000 users.",
      roleInProject: "Lead Frontend",
      demoUrl: "https://crm.techcorp.example.com",
      startDate: "2022-01-01",
      endDate: "2022-12-31",
    },
    {
      id: 2,
      companyId: null, // Dự án cá nhân (Freelance / Pet project)
      profileId: 1,
      name: "Next.js Portfolio Template",
      description: "Mẫu portfolio cá nhân mã nguồn mở, hỗ trợ SEO và Dark mode.",
      roleInProject: "Creator & Maintainer",
      demoUrl: "https://my-portfolio.com",
      repoUrl: "https://github.com/baongo/portfolio",
      startDate: "2023-05-01",
      endDate: null,
    }
  ];

  // 6. DATA MẪU: PROJECT_SKILLS (Mapping Dự án x Kỹ năng)
  const mockProjectSkills = [
    // Dự án 1 (CRM) dùng: TypeScript (1), Next.js (2)
    { projectId: 1, skillId: 1 },
    { projectId: 1, skillId: 2 },
    
    // Dự án 2 (Portfolio) dùng: TypeScript (1), Next.js (2), PostgreSQL (3), Docker (4)
    { projectId: 2, skillId: 1 },
    { projectId: 2, skillId: 2 },
    { projectId: 2, skillId: 3 },
    { projectId: 2, skillId: 4 },
  ];

  try {
    // THỰC THI INSERT VÀO DATABASE (Tuân thủ thứ tự để không dính lỗi Khóa ngoại - Foreign Key)
    await db.insert(users).values(mockUsers);
    await db.insert(profiles).values(mockProfiles);
    await db.insert(skills).values(mockSkills);
    await db.insert(companies).values(mockCompanies);
    await db.insert(projects).values(mockProjects);
    await db.insert(projectSkills).values(mockProjectSkills);

    console.log("✅ Đã chèn dữ liệu mẫu thành công!");
  } catch (error) {
    console.error("❌ Lỗi khi chèn dữ liệu:", error);
  }
}

seed()
  .then(() => {
    console.log("👋 Hoàn tất!");
    process.exit(0); // Tắt script thành công
  })
  .catch((err) => {
    console.error("🔥 Có lỗi nghiêm trọng:", err);
    process.exit(1); // Tắt script có lỗi
  });