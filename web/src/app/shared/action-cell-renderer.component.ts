import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lm-action-cell-renderer',
  template: `
  <div class="text-center">
    <a class="action-link" (click)="onClick()">{{params.value}}</a>
  </div>`,
  styles: [`
    .action-link {
      cursor: pointer;
      color: blue;
      text-decoration: underline;
    }
  `]
})
export class ActionCellRendererComponent implements OnInit {

  params;

  constructor() { }

  ngOnInit() {
  }

  agInit(params): void {
    this.params = params;
    if (!params.action) {
        throw new Error('Missing action parameter for ActionCellRendererComponent');
    }
  }

  onClick(): void {
    this.params.action(this.params);
  }
}
