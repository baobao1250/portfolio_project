import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from "@/db/schema"; // <--- Quan trọng: Import file schema bạn đã tạo

// 1. Lấy đường dẫn kết nối từ file .env
const sql = neon(process.env.DATABASE_URL!);

// 2. Khởi tạo Drizzle với schema
// (Việc truyền schema vào đây giúp bạn gõ db.query... nó tự gợi ý tên bảng)
export const db = drizzle(sql, { schema });