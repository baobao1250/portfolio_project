import { 
  pgTable, 
  serial, 
  text, 
  timestamp, 
  boolean, 
  integer, 
  jsonb, 
  pgEnum, 
  date,
  primaryKey 
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const roleEnum = pgEnum("role", ["admin", "user"]);
export const skillTypeEnum = pgEnum("skill_type", ["language", "tool", "framework", "soft_skill", "database"]);

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  email: text("email").unique().notNull(),
  passwordHash: text("password_hash").notNull(), // Mật khẩu đã mã hóa
  role: roleEnum("role").default("user"),
  isActive: boolean("is_active").default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const profiles = pgTable("profiles", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id, { onDelete: "cascade" }).unique(), // 1 User chỉ có 1 Profile
  fullName: text("full_name").notNull(),
  jobTitle: text("job_title"), // Ví dụ: Senior Frontend Developer
  bio: text("bio"),
  avatarUrl: text("avatar_url"),
  phone: text("phone"),
  address: text("address"),
  // Lưu link MXH dạng JSON cho gọn: { "github": "...", "linkedin": "..." }
  socialLinks: jsonb("social_links"), 
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Bảng SKILLS: Gộp chung Language, Tool, Skill
export const skills = pgTable("skills", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // React, Docker, English...
  type: skillTypeEnum("type").notNull(), // Phân loại
  proficiency: integer("proficiency").default(0), // 0 - 100%
  iconUrl: text("icon_url"), // Logo công nghệ
  description: text("description"),
});

// Bảng COMPANIES: Lịch sử làm việc
export const companies = pgTable("companies", {
  id: serial("id").primaryKey(),
  profileId: integer("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  position: text("position").notNull(), // Chức vụ tại công ty đó
  logoUrl: text("logo_url"),
  startDate: date("start_date"),
  endDate: date("end_date"), // Nếu null nghĩa là "Present" (đang làm)
  description: text("description"), // Mô tả công việc chính
  location: text("location"),
});

// Bảng PROJECTS: Dự án đã làm
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  // Nếu dự án thuộc công ty thì điền ID, nếu Freelance thì null
  companyId: integer("company_id").references(() => companies.id, { onDelete: "set null" }), 
  // Dự án này thuộc về Profile nào (quan trọng nếu là dự án cá nhân không thuộc cty)
  profileId: integer("profile_id").references(() => profiles.id, { onDelete: "cascade" }),
  
  name: text("name").notNull(),
  description: text("description"),
  roleInProject: text("role_in_project"), // Role cụ thể trong dự án này
  demoUrl: text("demo_url"),
  repoUrl: text("repo_url"), // Link Github
  startDate: date("start_date"),
  endDate: date("end_date"),
});

export const projectSkills = pgTable("project_skills", {
  projectId: integer("project_id").references(() => projects.id, { onDelete: "cascade" }).notNull(),
  skillId: integer("skill_id").references(() => skills.id, { onDelete: "cascade" }).notNull(),
}, (t) => ({
  pk: primaryKey({ columns: [t.projectId, t.skillId] }), // Khóa chính kép
}));

export const usersRelations = relations(users, ({ one }) => ({
  profile: one(profiles, {
    fields: [users.id],
    references: [profiles.userId],
  }),
}));

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, {
    fields: [profiles.userId],
    references: [users.id],
  }),
  companies: many(companies),
  projects: many(projects),
}));

export const companiesRelations = relations(companies, ({ one, many }) => ({
  profile: one(profiles, {
    fields: [companies.profileId],
    references: [profiles.id],
  }),
  projects: many(projects),
}));

export const projectsRelations = relations(projects, ({ one, many }) => ({
  company: one(companies, {
    fields: [projects.companyId],
    references: [companies.id],
  }),
  profile: one(profiles, {
    fields: [projects.profileId],
    references: [profiles.id],
  }),
  skills: many(projectSkills), // Link tới bảng trung gian
}));

export const skillsRelations = relations(skills, ({ many }) => ({
  projects: many(projectSkills),
}));

export const projectSkillsRelations = relations(projectSkills, ({ one }) => ({
  project: one(projects, {
    fields: [projectSkills.projectId],
    references: [projects.id],
  }),
  skill: one(skills, {
    fields: [projectSkills.skillId],
    references: [skills.id],
  }),
}));