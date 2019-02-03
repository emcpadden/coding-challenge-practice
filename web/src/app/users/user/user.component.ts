import { Component, OnInit, Input } from '@angular/core';
import { User } from '../../shared/user.model';

@Component({
  selector: 'lm-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
