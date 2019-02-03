import { Input, Output, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Observable } from 'rxjs'
import { User } from '../../shared/user.model';
import { ActionCellRendererComponent } from '../../shared/action-cell-renderer.component';

@Component({
  selector: 'lm-user-grid',
  templateUrl: './user-grid.component.html',
  styleUrls: ['./user-grid.component.scss']
})
export class UserGridComponent implements OnInit {

  private showDetailSubject = new Subject<number>();

  @Input() users: User[];
  @Output('viewDetail') showDetail: Observable<number> = this.showDetailSubject.asObservable();

  columnDefs = [
    {headerName: 'Username', field: 'username',
      cellRendererFramework: ActionCellRendererComponent,
      cellRendererParams: {
        icon: 'fa-download',
        action: this.viewDetail.bind(this)
      } 
    },
    {headerName: 'First', field: 'firstName' },
    {headerName: 'Last', field: 'lastName'},
    {headerName: 'Email', field: 'email', cellRenderer: this.specialCellRender}
  ];

  constructor() { }

  specialCellRender(params) {
    return '<span style="color: red">' + params['value'] + '</span>';  
  }

  ngOnInit() {
  }

  viewDetail(params) {
    console.log(`View Detail: ${params.data.id}`);
    this.showDetailSubject.next(params.data.id);
  }

}
