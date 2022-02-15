import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  showPass: boolean = false;
  inputType: string = 'password';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: [''],
      email: ['', Validators.email],
      password: [''],
      terms: [''],
    });
  }

  registerFormModal() {
    const loginModal = document.getElementById('register-modal');
    loginModal?.classList.toggle('show');
  }

  goToLogin() {
    this.registerFormModal();
    const loginModal = document.getElementById('login-modal');
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

  register(form: FormGroup) {
    console.log(form);
  }
}
