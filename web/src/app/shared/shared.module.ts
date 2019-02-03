import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActionCellRendererComponent } from './action-cell-renderer.component';

@NgModule({
  declarations: [ActionCellRendererComponent],
  imports: [
    CommonModule
  ],
  exports: [ActionCellRendererComponent]
})
export class SharedModule { }
