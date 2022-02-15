import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  showPass: boolean = false;
  inputType: string = 'password';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: [''],
    });
  }

  loginModal() {
    const loginModal = document.getElementById('login-modal');
    loginModal?.classList.toggle('show');
  }

  goToRegister() {
    this.loginModal();
    const loginModal = document.getElementById('register-modal');
    loginModal?.classList.toggle('show');
  }

  switchEye() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  login(form: FormGroup) {
    console.log(form);
  }
}
