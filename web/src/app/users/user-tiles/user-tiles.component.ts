import { EventEmitter, Input, Component, OnInit, Output } from '@angular/core';
import { User } from '../../shared/user.model';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs'

@Component({
  selector: 'lm-user-tiles',
  templateUrl: './user-tiles.component.html',
  styleUrls: ['./user-tiles.component.scss']
})
export class UserTilesComponent implements OnInit {

  private showDetailSubject = new Subject<number>();

  @Input() users: User[];
//  @Output('viewDetail') showDetail = new EventEmitter();
  @Output('viewDetail') showDetail: Observable<number> = this.showDetailSubject.asObservable();

  constructor() { 
  }

  ngOnInit() {
  }

  viewDetail(id: number) {
    console.log(`View Detail: ${id}`);
    //this.showDetail.emit(id);
    this.showDetailSubject.next(id);
  }
}
