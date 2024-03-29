import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signin-callback',
  templateUrl: './signin-callback.component.html',
  styleUrls: ['./signin-callback.component.scss']
})
export class SigninCallbackComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.authService.finishLogin()
    .then(_ => {
      this.router.navigate(['/home'], { replaceUrl: true });
    })
  }

}
