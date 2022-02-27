import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  loginForm!: FormGroup;
  token: any = localStorage.getItem('token');
  isLogin!: boolean;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    if (this.token) {
      this.isLogin = true;
    }
  }

  loginModal() {
    const loginModal = document.getElementById('login-modal');
    loginModal?.classList.toggle('show');
  }

  logout() {
    if (this.token) {
      localStorage.removeItem('token');
      this.isLogin = false;
      location.reload();
    }
  }
}
