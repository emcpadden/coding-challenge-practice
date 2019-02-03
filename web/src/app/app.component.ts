import { Component } from '@angular/core';
import { AuthenticationService } from './shared/authentication.service';

@Component({
  selector: 'lm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private authenticationService: AuthenticationService) {
  }

  get isLoggedIn(): boolean {
    return this.authenticationService.isAuthenticated;
  }

  get username(): string {
    return this.authenticationService.username;
  }

  logout() {
    return this.authenticationService.logout();
  }

}
