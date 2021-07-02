import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PostDetails } from '../models/post-details.model';

@Component({
  selector: 'app-view-post-details',
  templateUrl: './view-post-details.component.html',
  styleUrls: ['./view-post-details.component.scss']
})
export class ViewPostDetailsComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private httpClient: HttpClient
  ) {
    this.route.params.subscribe(params => {
      this.post.id = params['id'];
    });
  }

  public post: PostDetails = new PostDetails('', '', '');

  ngOnInit() {
    this.httpClient.get(`https://localhost:5001/posts/${this.post.id}`)
    .subscribe((data: any) => this.post = data);
  }

}
