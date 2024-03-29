import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private httpClient: HttpClient) { }

  putSubscription(email: string) {
    return this.httpClient.put(`${environment.apiUrl}/subscriptions`, { email: email});
  }

}
