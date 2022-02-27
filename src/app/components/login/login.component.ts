import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthentcationService } from 'src/app/core/service/authentcation.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  forgetForm!: FormGroup;
  resetForm!: FormGroup;
  newPassForm!: FormGroup;
  varifyForm!: FormGroup;
  inputType: string = 'password';
  emailFrom: string = '';
  showPass: boolean = false;
  showForgetPass: boolean = false;
  showResetPass: boolean = false;
  showNewPass: boolean = false;
  showLogin: boolean = true;

  // @Input() isLogin: boolean | undefined;

  constructor(
    private fb: FormBuilder,
    private auth: AuthentcationService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.email],
      password: [''],
    });

    this.forgetForm = this.fb.group({
      email: ['', Validators.email],
    });

    this.newPassForm = this.fb.group({
      email: ['', Validators.email],
      newPassword: [''],
      confirmPassword: [''],
    });

    this.resetForm = this.fb.group({
      varifyCode: [''],
    });
  }

  // Login Form
  get loginEmailInput() {
    return this.loginForm.get('email');
  }
  get loginPasswordInput() {
    return this.loginForm.get('password');
  }

  // Forget Password Form
  get forgetEmailInput() {
    return this.forgetForm.get('email');
  }

  // Reset Password
  get varifyCodeInput() {
    return this.resetForm.get('varifyCode');
  }

  // Reset Password Form
  get newPassEmailInput() {
    return this.resetForm.get('email');
  }
  get NewPasswordInput() {
    return this.resetForm.get('newPassword');
  }
  get ConfirmPasswordlInput() {
    return this.resetForm.get('confirmPassword');
  }

  loginModal() {
    const loginModal = document.getElementById('login-modal');
    loginModal?.classList.toggle('show');
    this.showForgetPass = false;
    this.showResetPass = false;
    this.showNewPass = false;
    this.showLogin = true;
  }

  goToRegister() {
    this.loginModal();
    const registerModal = document.getElementById('register-modal');
    registerModal?.classList.toggle('show');
  }

  switchEye() {
    this.showPass = !this.showPass;
    if (this.showPass) {
      this.inputType = 'text';
    } else {
      this.inputType = 'password';
    }
  }

  openForgetPassword() {
    this.showLogin = false;
    this.showForgetPass = true;
  }

  //#region Submit Forms
  login(form: FormGroup) {
    console.log(form);
    if (form.valid) {
      this.auth
        .login({
          email: this.loginEmailInput?.value,
          password: this.loginPasswordInput?.value,
        })
        .subscribe(
          (res: any) => {
            console.log(res);
            localStorage.setItem('token', res.token);
          },
          (err: any) => {
            console.log(err);
          },
          () => {
            console.log('Done');
            this.loginModal();
            location.reload();
          }
        );
    }
  }

  forgetPassword(form: FormGroup) {
    console.log(form);
    if (form.valid) {
      this.auth
        .forgetPassword({
          email: this.forgetEmailInput?.value,
        })
        .subscribe(
          () => {},
          (err: any) => {
            console.log(err);
          },
          () => {
            this.emailFrom = this.forgetEmailInput?.value;
            console.log('Done', this.emailFrom);
            this.showForgetPass = false;
            this.showResetPass = true;
          }
        );
    }
  }

  resetPassword(form: FormGroup) {
    console.log(form);
    this.showResetPass = false;
    this.showNewPass = true;
    // if (form.valid) {
    //   this.auth
    //     .ResetPassword({
    //       email: this.emailFromRes,
    //       varifyCode: this.varifyCodeInput?.value,
    //     })
    //     .subscribe(
    //       (res: any) => {
    //         console.log(res);
    //       },
    //       () => {},
    //       () => {
    //         this.toastr.success('', 'لقد تم التأكيد بنجاح', {
    //           positionClass: 'toast-bottom-right',
    //         });
    //         this.showResetPass = false;
    //         this.showNewPass = true;
    //       }
    //     );
    // }
  }

  newPassword(form: FormGroup) {
    console.log(form);
    if (form.valid) {
      this.auth
        .newPassword({
          email: this.emailFrom,
          newPassword: this.newPassEmailInput?.value,
          confirmPassword: this.ConfirmPasswordlInput?.value,
        })
        .subscribe(
          (res: any) => {
            console.log(res);
          },
          (err: any) => {
            console.log(err);
          },
          () => {
            console.log('Done');
            this.toastr.success('', 'لقد تم التغير بنجاح', {
              positionClass: 'toast-bottom-right',
            });
            this.loginModal();
          }
        );
    }
  }
  //#endregion
}
