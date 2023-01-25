import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BaseDialog } from '../base/basedialog';

declare var $: any;
@Component({
  selector: 'app-shopping-complete-dialog',
  templateUrl: './shopping-complete-dialog.component.html',
  styleUrls: ['./shopping-complete-dialog.component.scss'],
})
export class ShoppingCompleteDialogComponent
  extends BaseDialog<ShoppingCompleteDialogComponent>
  implements OnDestroy
{
  _data: ShoppingCompleteState;
  constructor(
    dialogRef: MatDialogRef<ShoppingCompleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ShoppingCompleteState
  ) {
    super(dialogRef);
  }

  show: boolean = true;
  complete() {
    this.show = false;
  }

  ngOnDestroy(): void {
    if (this.show) $('#basketModal').modal('show');
  }
}

export enum ShoppingCompleteState {
  Yes,
  No,
}
