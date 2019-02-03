import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../shared/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'lm-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  errorMessage: string = null;
  redirectUrl: string = null;

  loginData = {
    username: "",
    password: ""
  }

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 

  }

  ngOnInit() {
    console.log(this.activatedRoute.snapshot.params);
    this.redirectUrl = this.activatedRoute.snapshot.queryParams['redirectUrl']
  }

  login() {
    this.errorMessage = null;
    this.authenticationService.login(this.loginData)
      .pipe(take(1))
      .subscribe(result => {
      if (result.succeeded) {
        if (!!this.redirectUrl) {
          let url = this.redirectUrl;
          this.router.navigateByUrl(url);
        } else {
          this.router.navigate(['/']);
        }
      } else {
        this.errorMessage = result.message;
      }
    },
    res => {
      if (!!res.error && !!res.error.message) {
        this.errorMessage = res.error.message;
      } else {
        this.errorMessage = "Unknown Server Error";
      }
    });
  }
}
