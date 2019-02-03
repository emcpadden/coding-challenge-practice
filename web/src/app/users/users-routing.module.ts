import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { AuthGuard } from '../shared/auth.guard';
import { RoleGuard } from '../shared/role.guard';

const routes: Routes = [
  {
    path: "",
    component: UserListComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      expectedRole: 'USER'
    }
  },
  {
    path: ":id",
    component: UserDetailComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { 
      expectedRole: 'USER'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
