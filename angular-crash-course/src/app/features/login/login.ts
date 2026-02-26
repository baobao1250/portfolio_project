import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
// 1. Import thêm Router và AuthService
import { Router } from '@angular/router'; 
import { AuthService } from '../../shared/services/auth'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule], 
  templateUrl: './login.html',
})
export class Login {
  private fb = inject(FormBuilder);
  
  // 2. Gọi Router và AuthService ra để dùng
  private router = inject(Router);
  private authService = inject(AuthService);

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      console.log('Call API Login với:', this.loginForm.value);
      
      // 3. Cập nhật Global State: Đánh dấu user ĐÃ ĐĂNG NHẬP
      this.authService.login(); 

      // 4. Chuyển hướng người dùng vào trang tuyệt mật (Bài 3)
      this.router.navigate(['/bai-3']); 
      
    } else {
      // MẸO UX CỰC HAY CỦA ANGULAR: 
      // Nếu user chưa gõ gì mà cố tình bấm nút Submit, ta sẽ ép tất cả các ô input 
      // chuyển sang trạng thái "touched" để hiện đồng loạt lỗi đỏ lên.
      this.loginForm.markAllAsTouched();
    }
  }
}