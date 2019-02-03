import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  readonly BASE_URL = "/auth";
  readonly TOKEN_KEY = "token";
  readonly USER_KEY = "user";

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  private _user: User = null;

  constructor(private http: HttpClient, private router: Router) { }

  get user(): User {
    if (!this._user) {
      var currentUser:User = null;
      const userJson = localStorage.getItem(this.USER_KEY);
      if (userJson) {
        this._user = JSON.parse(userJson);
      }
    }
    return this._user;
  }

  get userid() {
    return this.user ? this.user.id : -1;
  }

  get username() {
    return this.user ? this.user.username : null;
  }

  get roles(): string[] {
    return this.user ? this.user.roles : [];
  }

  get token() {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  get isAuthenticated(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  isInRole(role: string) {
    var normalizedRole = !!role ? role.trim().toLocaleUpperCase() : "";
    return (this.roles.find(r => r.toLocaleUpperCase().trim().localeCompare(normalizedRole) == 0) != null);
  }

  register(user) {
    // TODO: here is where we will register new users
  }

  updateProfile(user) {
    user.id = this.userid;
    user.username = this.username;
    console.log(`Auth Service: Update user profile:`, user);
    return this.http.post(`/api/users/${user.id}`, user)
      .pipe(
        map(res => {
          console.log(res);
          this._user = <User>res;
          localStorage.setItem(this.USER_KEY, JSON.stringify(this._user));
          return this._user;
        })
      );
  }

  login(loginData) {
    console.log(`Auth Service: Login user:`, loginData);
    return this.http.post(`${this.BASE_URL}/login`, loginData)
      .pipe(
        map(res => {
          console.log(res);
          if (!res['token'] || !res['username'])
            return {
              succeeded: false,
              message: 'incorrect username or password'
            };
  
          let user:User = res['user'];
          localStorage.setItem(this.TOKEN_KEY, res['token']);
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));

          this._user = user;
          
          return {
            succeeded: true,
            message: 'login successful'
          };
        })
      );
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/']);
  }

}
