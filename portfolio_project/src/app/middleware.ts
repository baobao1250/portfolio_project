import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
//   const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');
//   const userRole = request.cookies.get('role')?.value; // Ví dụ lấy role từ cookie

//   if (isAdminRoute && userRole !== 'admin') {
//     // Thay vì redirect URL đổi sang /403, ta dùng rewrite để giữ nguyên URL
//     // nhưng hiển thị nội dung của trang 403
//     return NextResponse.rewrite(new URL('/403', request.url));
//   }

  return NextResponse.next();
}