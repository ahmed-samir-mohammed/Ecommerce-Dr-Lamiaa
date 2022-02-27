import {
  LoginModel,
  ForgetPasswordModel,
  ResetPasswordModel,
  NewPasswordModel,
} from './../model/authentcation';
import { environment as env } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { catchError, Observable, throwError, map } from 'rxjs';
import { SignUpModel, ActivateUserModel } from '../model/authentcation';

@Injectable({
  providedIn: 'root',
})
export class AuthentcationService {
  constructor(private http: HttpClient) {}

  signUp(body: SignUpModel): Observable<SignUpModel> {
    return this.http.post<SignUpModel>(`${env.ROOT_API}/auth/signUp`, body);
  }

  varify(body: ActivateUserModel): Observable<ActivateUserModel> {
    return this.http.post<ActivateUserModel>(
      `${env.ROOT_API}/auth/activateUser`,
      body
    );
  }

  login(body: LoginModel) {
    return this.http.post<LoginModel>(`${env.ROOT_API}/auth/usersLogin`, body);
  }

  forgetPassword(body: ForgetPasswordModel): Observable<ForgetPasswordModel> {
    return this.http.post<ForgetPasswordModel>(
      `${env.ROOT_API}/auth/forgetPassword`,
      body
    );
  }

  // resetPassword(body: ResetPasswordModel): Observable<ResetPasswordModel> {
  //   return this.http.post<ResetPasswordModel>(
  //     `${env.ROOT_API}/auth/forgetPassword`,
  //     body
  //   );
  // }

  newPassword(body: NewPasswordModel): Observable<NewPasswordModel> {
    return this.http.post<NewPasswordModel>(
      `${env.ROOT_API}/auth/changePassword`,
      body
    );
  }
}
