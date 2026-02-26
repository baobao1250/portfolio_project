import { getProfileData } from "@/services/profile.service"; 
import ProfileForm from "@/components/features/ProfileForm"; // Import cái Form của bạn

export default async function EditProfilePage() {
  // 1. Kéo dữ liệu Profile từ DB (Hàm này bạn đã viết ở các bước trước)
  const profile = await getProfileData();

  // Nếu DB trống, báo lỗi luôn, không render Form nữa
  if (!profile) {
    return <div className="p-10 text-center">Chưa có dữ liệu Profile trong DB. Hãy tạo mới!</div>;
  }

  // 2. Chú ý dòng này: Truyền toàn bộ object `profile` (trong đó CÓ CHỨA id) vào Form
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6">Chỉnh sửa Hồ sơ</h1>
      
      {/* Ném dữ liệu sang Client Component */}
      <ProfileForm initialData={profile} /> 
    </div>
  );
}