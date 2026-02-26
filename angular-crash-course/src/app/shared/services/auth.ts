import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  // Mặc định là chưa đăng nhập
  isLoggedIn = signal<boolean>(false); 

  login() { this.isLoggedIn.set(true); }
  logout() { this.isLoggedIn.set(false); }
}