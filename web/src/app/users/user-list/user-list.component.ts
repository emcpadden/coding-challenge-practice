import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { MatSnackBar } from '@angular/material';
import { User } from '../../shared/user.model';
import { take } from 'rxjs/operators';

interface UserListData {
  users: User[];
}

@Component({
  selector: "lm-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.scss"]
})
export class UserListComponent implements OnInit {

  data: UserListData = {
    users: []
  };

  constructor(
    private router: Router,
    private userService: UserService, 
    private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.userService.getUsers()
    .pipe(take(1))
    .subscribe((users: User[]) => {
      this.data.users = users;
    },
    e => {
      console.log("Error");
      this.snackBar.open(`Unable to get list of users.  Error: ${e.error.message}`, 'close', {
        duration: 2000,
      });
    });
  }

  viewDetail(id: number) {
    this.router.navigateByUrl(`/users/${id}`);
  }
}
