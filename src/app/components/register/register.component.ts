import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthentcationService } from 'src/app/core/service/authentcation.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  varifyForm!: FormGroup;
  showPass: boolean = false;
  showSignUp: boolean = true;
  showVarify: boolean = false;
  inputType: string = 'password';
  emailFromRes: string = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthentcationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      fullName: [''],
      email: ['', Validators.email],
      password: [''],
      phone: [''],
    });

    this.varifyForm = this.fb.group({
      varifyCode: [''],
    });
  }

  get fullNameInput() {
    return this.registerForm.get('fullName');
  }
  get emailInput() {
    return this.registerForm.get('email');
  }
  get passwordInput() {
    return this.registerForm.get('password');
  }
  get phoneInput() {
    return this.registerForm.get('phone');
  }
  get varifyCodeInput() {
    return this.varifyForm.get('varifyCode');
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

  registerSubmit(form: FormGroup) {
    console.log(form);
    if (form.valid) {
      this.auth
        .signUp({
          fullName: this.fullNameInput?.value,
          email: this.emailInput?.value,
          password: this.passwordInput?.value,
          phone: this.phoneInput?.value,
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            this.emailFromRes = res.email;
          },
          (err: any) => {
            console.log(err);
          },
          () => {
            console.log('Done');
            this.showSignUp = false;
            this.showVarify = true;
          }
        );
    }
  }

  varifyCode(form: FormGroup) {
    console.log(form);
    if (form.valid) {
      this.auth
        .varify({
          email: this.emailFromRes,
          varifyCode: this.varifyCodeInput?.value,
        })
        .subscribe(
          (res: any) => {
            console.log(res);
          },
          () => {},
          () => {
            this.toastr.success('', 'لقد تم التأكيد بنجاح', {
              positionClass: 'toast-bottom-right',
            });
            this.registerFormModal();
            this.showSignUp = true;
            this.showVarify = false;
          }
        );
    }
  }
}
