export interface SignUpModel {
  fullName?: string;
  email?: string;
  password?: string;
  phone?: string;
}

export interface ActivateUserModel {
  email?: string;
  varifyCode?: number;
}

export interface LoginModel {
  email?: string;
  password?: string;
}

export interface ForgetPasswordModel {
  email?: string;
}

export interface ResetPasswordModel {}

export interface NewPasswordModel {
  email?: string;
  newPassword?: string;
  confirmPassword?: string;
}
