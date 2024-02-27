import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { authResponse } from '../Model/authResponse';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../Model/User';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http: HttpClient = inject(HttpClient);
  user = new Subject<User> ();


  signUp(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http.post<authResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCKhAhlm6fmO-BI26Pj05Ci7V_wvxd_EvA',
      data
    ).pipe(catchError(this.handleError), tap((res) => {
        this.handleCreateUser(res);
    }));
  }
  login(email: string, password: string) {
    const data = { email: email, password: password, returnSecureToken: true };
    return this.http.post <authResponse>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCKhAhlm6fmO-BI26Pj05Ci7V_wvxd_EvA',
      data
    ).pipe(catchError(this.handleError), tap((res) => {
      this.handleCreateUser(res);
  }));
  }
//  -------------------
  private handleCreateUser(res){
    const expiredInTs = new Date().getTime()+ +res.expiresIn*1000;
      const expiredIn = new Date(expiredInTs);
      const user = new User(res.email,res.localId,res.idToken,expiredIn);
      this.user.next(user)
  }


//  ----------error handling----------------------------------------
  private handleError(err: { error: { error: { message: any; }; }; }){
    let errorMessage = 'An unknown error has occured'
    console.log(err);
    if(!err.error || !err.error.error){
        return throwError(() => errorMessage);
    }
    switch (err.error.error.message){
        case 'EMAIL_EXISTS':
            errorMessage ="This email already exists.";
            break;
        case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'This operation is not allowed.';
            break;
        case 'INVALID_LOGIN_CREDENTIALS':
            errorMessage = 'The email ID or Password is not correct.';
            break
    }
    return throwError(() => errorMessage);
}
}
