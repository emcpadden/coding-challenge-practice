import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserComponent } from './user/user.component';
import { AddressComponent } from './address/address.component';
import { UserTilesComponent } from './user-tiles/user-tiles.component';
import { UserGridComponent } from './user-grid/user-grid.component';
import { ActionCellRendererComponent } from '../shared/action-cell-renderer.component';

// Material
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';


// third party
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [UserListComponent, UserDetailComponent, UserComponent, AddressComponent, UserTilesComponent, UserGridComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    UsersRoutingModule,

    SharedModule,

    // Material
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
    MatTabsModule,

    //third party
    AgGridModule.withComponents([])
  ],
  entryComponents: [ActionCellRendererComponent]
})
export class UsersModule { }
