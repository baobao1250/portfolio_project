'use server';

import { db } from "@/lib/db";
import { profiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

// 1. Định nghĩa Zod Schema cho TẤT CẢ các trường cần sửa
const editProfileSchema = z.object({
  fullName: z.string().min(2, "Tên phải có ít nhất 2 ký tự").max(50, "Tên quá dài"),
  jobTitle: z.string().min(2, "Chức danh phải có ít nhất 2 ký tự").max(100, "Chức danh quá dài"),
  bio: z.string().max(500, "Tiểu sử tối đa 500 ký tự").optional(), // optional() nghĩa là cho phép bỏ trống
});

export async function editProfile(idProfile: number, formData: FormData) {
  // 2. Lấy toàn bộ dữ liệu từ Form
  const rawData = {
    fullName: formData.get("fullName"),
    jobTitle: formData.get("jobTitle"),
    bio: formData.get("bio"),
  };

  // 3. Kiểm duyệt qua Zod
  const validatedData = editProfileSchema.safeParse(rawData);

  // 4. Bắt lỗi và trả về cho Frontend
  if (!validatedData.success) {
    // Sử dụng cú pháp Zod v4 mà bạn vừa fix ban nãy
    const flattenedErrors = z.flattenError(validatedData.error);
    return { 
      success: false, 
      errors: flattenedErrors.fieldErrors 
    };
  }

  // 5. Nếu dữ liệu hợp lệ -> Cập nhật Database
  const { fullName, jobTitle, bio } = validatedData.data;

  try {
    await db.update(profiles)
      .set({ 
        fullName, 
        jobTitle, 
        bio: bio || "" // Tránh lỗi null
      })
      .where(eq(profiles.id, idProfile));

    // Làm mới Cache
    revalidatePath("/home");
    revalidateTag('profile', 'default'); // Hoặc ('profile', 'default') tuỳ version của bạn

    return { success: true };
  } catch (error) {
    return { success: false, message: "Lỗi hệ thống khi lưu Database" };
  }
}