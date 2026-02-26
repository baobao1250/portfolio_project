// Thư mục: src/components/ProfileForm.tsx
'use client';

import { editProfile } from "@/app/actions/profile";
import { useState } from "react";

// Định nghĩa kiểu dữ liệu cho props (TypeScript)
interface ProfileFormProps {
  initialData: {
    id: number; // <--- CÁI ID BẠN CẦN TÌM NẰM Ở ĐÂY NÀY!
    fullName: string| null;
    jobTitle: string| null;
    bio: string | null;
  };
}

export default function ProfileForm({ initialData }: ProfileFormProps) {
  const [isPending, setIsPending] = useState(false);

  const clientAction = async (formData: FormData) => {
    setIsPending(true);

    // 👇 3. Lấy ID từ initialData.id và nhét vào Server Action
    const result = await editProfile(initialData.id, formData);

    if (result.success) {
      alert("Lưu thành công!");
    } else {
      console.log("Lỗi:", result.errors);
    }
    
    setIsPending(false);
  };

  return (
    <form action={clientAction} className="flex flex-col gap-4">
      {/* Dùng initialData để hiển thị chữ cũ lên ô input */}
      <input name="fullName" defaultValue={initialData.fullName || ""} className="border p-2" />
      <input name="jobTitle" defaultValue={initialData.jobTitle || ""} className="border p-2" />
      <textarea name="bio" defaultValue={initialData.bio || ""} className="border p-2" />
      
      <button type="submit" disabled={isPending} className="bg-blue-500 text-white p-2">
        {isPending ? "Đang lưu..." : "Lưu thay đổi"}
      </button>
    </form>
  );
}