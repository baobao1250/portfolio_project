import { db } from "@/lib/db";
import { unstable_cache } from "next/cache";

const getProfileDataQuery = async () => {
    return await db.query.profiles.findFirst({
        with: { projects: true } // Nhớ import bảng projects vào schema nếu chưa có
    });
};

export const getProfileData = unstable_cache(
    getProfileDataQuery,
    ['profile-data'], // Key cache
    {
        revalidate: 3600, 
        tags: ['profile'] 
    }
);