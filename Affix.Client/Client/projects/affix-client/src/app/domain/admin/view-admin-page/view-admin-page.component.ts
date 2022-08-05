import { Component, OnInit } from '@angular/core';
import { User } from 'oidc-client';
import { PostService } from '../../post/services/post.service';

@Component({
  selector: 'app-view-admin-page',
  templateUrl: './view-admin-page.component.html',
  styleUrls: ['./view-admin-page.component.scss']
})
export class ViewAdminPageComponent implements OnInit {

  constructor(private postService: PostService) { }
  public token: string | null = '';
  public user : User | null;

  callApi() {
    this.postService.getData().subscribe(data => console.log(data));
  }

  printUser() {
    console.log(this.user);
  }

  printToken() {
    console.log(this.token);
  }

  ngOnInit(): void {
  }

}
