import { defineConfig } from "drizzle-kit";
import * as dotenv from "dotenv";

// Đọc biến môi trường từ file .env (hoặc .env.local)
dotenv.config({ path: ".env.local" }); 

export default defineConfig({
  // Đường dẫn đến file chứa định nghĩa bảng (Schema)
  schema: "./src/db/schema.ts",
  
  // Đường dẫn thư mục chứa file migration (Drizzle tự tạo)
  out: "./drizzle",
  
  // Loại database đang dùng
  dialect: "postgresql",
  
  // Thông tin kết nối
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});