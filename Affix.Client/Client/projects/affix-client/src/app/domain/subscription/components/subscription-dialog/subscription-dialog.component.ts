import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-subscription.dialog',
  templateUrl: './subscription-dialog.component.html',
  styleUrls: ['./subscription-dialog.component.scss']
})
export class SubscriptionDialogComponent {

  constructor (private subscriptionService : SubscriptionService) { }

  public email = '';
  public emailFormControl = new FormControl('', [Validators.required, Validators.email]);

  onInputChanged(event: any) {
    this.email = event.target.value;
  }

  createSubscription() {
    this.subscriptionService.putSubscription(this.email).subscribe(
      error => {
        console.log(error);
      }
    );
  }

 }
