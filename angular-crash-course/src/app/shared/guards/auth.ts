import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth';

// CanActivateFn là kiểu dữ liệu dành cho Guard chạy trước khi vào một Route
export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Lấy giá trị từ Signal
  if (authService.isLoggedIn()) {
    return true; // Cho phép đi qua
  } else {
    // Chưa đăng nhập thì đá về trang chủ (hoặc trang login)
    console.log('Ê đứng lại! Chưa đăng nhập mà đòi vào à?');
    router.navigate(['/']); 
    return false; // Chặn đứng ngay lập tức
  }
};