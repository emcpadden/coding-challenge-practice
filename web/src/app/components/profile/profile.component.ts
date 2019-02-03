import { Component, OnInit } from "@angular/core";
import { AuthenticationService } from "src/app/shared/authentication.service";
import { User } from "src/app/shared/user.model";
import { FormBuilder, Validators, FormGroup, FormControl } from "@angular/forms";
import { MatSnackBar } from '@angular/material';
import { take } from 'rxjs/operators';

interface ProfileData {
  originalProfile: User;
  profile: User;
}

@Component({
  selector: "lm-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"]
})
export class ProfileComponent implements OnInit {
  data: ProfileData = {
    originalProfile: null,
    profile: null
  };

  profileForm:FormGroup = null;
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private snackBar: MatSnackBar
    ) {}

  ngOnInit() {
    this.data.profile = Object.assign({}, this.authenticationService.user);
    this.data.originalProfile = Object.assign({}, this.data.profile);
    this.buildForm(this.data.profile);
  }

  field(name) {
    var names = name.split(".");
    if (names.length == 1) {
      return this.profileForm.get(name);
    } else if (names.length == 2) {
      return this.profileForm.get(names[0]).get(names[1]);
    }
  }

  hasError(name, error, alwaysCheck) {
    let hasError = false;
    let errors = this.field(name).errors;
    if (!!errors) {
      if (!!error) {
        hasError = errors.error != null;
      } else {
        hasError = true;
      }
    }
    if (!alwaysCheck) {
      return hasError && (this.field(name).touched || this.field(name).dirty);
    } else {
      return hasError;
    }
  }

  save(user) {
    console.warn(user);
    this.authenticationService.updateProfile(user)
      .pipe(take(1))
      .subscribe(result => {
        this.data.profile = Object.assign({}, result);
        this.data.originalProfile = Object.assign({}, this.data.profile);    
        this.snackBar.open(`User profile successfully updated.`, 'close', {
          duration: 2000,
        });
      },
      e => {
        console.log("Error");
        this.snackBar.open(`Unable update user profile.  Error: ${e.error.message}`, 'close', {
          duration: 2000,
        });
      });

  }

  reset() {
    this.data.profile = Object.assign({}, this.data.originalProfile);
    this.buildForm(this.data.profile);
  }

  private buildForm(user) {
    this.profileForm = this.fb.group({
      firstName: [this.data.profile.firstName, Validators.required],
      lastName: [this.data.profile.lastName, Validators.required],
      email:[this.data.profile.email, [Validators.required,Validators.email]],
      birthday:[this.data.profile.birthday, Validators.required],
      address: this.fb.group({
        street: [this.data.profile.address.street, Validators.required],
        city: [this.data.profile.address.city, Validators.required],
        state: [this.data.profile.address.state, Validators.required],
        zip: [this.data.profile.address.zip, Validators.required]
      }),
      about:[this.data.profile.about, Validators.maxLength(50)]
    });
  }
}
