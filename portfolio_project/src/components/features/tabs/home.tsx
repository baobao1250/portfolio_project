import { db } from "@/lib/db"; // Kết nối DB

export default async function HomeTab() {
  const profileData = await db.query.profiles.findFirst({
    with: {
      projects: true, 
    }
  });

  if (!profileData) return <div>Chưa có dữ liệu Profile</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
        <h2 className="text-2xl font-bold text-gray-800">{profileData.fullName}</h2>
        <p className="text-blue-600 font-medium">{profileData.jobTitle}</p>
        <p className="mt-4 text-gray-600 leading-relaxed">{profileData.bio}</p>
      </div>

      <h3 className="text-xl font-bold mt-8">Dự án tiêu biểu</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {profileData.projects.map((proj) => (
          <div key={proj.id} className="p-4 border rounded-lg hover:shadow-md transition">
            <h4 className="font-bold">{proj.name}</h4>
            <p className="text-sm text-gray-500 mt-1">{proj.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}