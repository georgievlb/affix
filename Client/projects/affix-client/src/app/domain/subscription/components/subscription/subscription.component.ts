import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubscriptionDialogComponent } from '../subscription-dialog/subscription-dialog.component';
import { SubscriptionThankyouDialogComponent } from '../subscription-thankyou-dialog/subscription-thankyou-dialog.component';

@Component({
    selector: 'app-subscription',
    templateUrl: './subscription.component.html'
})
export class SubscriptionComponent implements OnDestroy {
    constructor(public dialog: MatDialog) { }

    openDialog() {
        this.dialog
            .open(SubscriptionDialogComponent)
            .afterClosed()
            .subscribe((isSubscribeClicked: boolean) => {
                if(isSubscribeClicked) {
                    this.dialog.open(SubscriptionThankyouDialogComponent);
                }
            });
    }

    ngOnDestroy() {
        this.dialog.closeAll();
        this.dialog.ngOnDestroy();
    }
}
