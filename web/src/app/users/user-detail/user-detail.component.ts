import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../../shared/user.model';
import { take } from 'rxjs/operators';

interface UserDetailData {
  user: User;
}

@Component({
  selector: 'lm-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  private id:number = -1;
  private data: UserDetailData = {
    user: null
  };

  constructor(
    private userService: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute) { 
  }

  ngOnInit() {
    if (!!this.activatedRoute.snapshot.params['id']) {
      this.id = parseInt(this.activatedRoute.snapshot.params['id']);
    } else {
      this.id = -1;
    }
    
    console.log(`User ID: ${this.id}`);

    this.userService.getUser(this.id)
      .pipe(take(1))
      .subscribe((user: User) => {
        this.data.user = user;
      },
      e => {
        console.log("Error");
        this.snackBar.open(`Unable to get user.  Error: ${e.error.message}`, 'close', {
          duration: 2000,
        });
      });
  }
}
