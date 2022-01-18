import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-subscription-thankyou-dialog',
  templateUrl: './subscription-thankyou-dialog.component.html'
})
export class SubscriptionThankyouDialogComponent {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(SubscriptionThankyouDialogComponent);
  }
}
