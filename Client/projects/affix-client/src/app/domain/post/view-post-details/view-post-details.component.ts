import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PostModel } from '../models/post.model';
import { environment } from '../../../../environments/environment';

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
      this.post.moniker = params['moniker'];
    });
  }

  public post: PostModel = new PostModel('', new Date(),'', '', '', false, '', '', '', 0, '', '');

  ngOnInit() {
    this.httpClient.get(`https://${environment.apiUrl}:${environment.port}/posts/${this.post.moniker}`)
    .subscribe((data: any) => this.post = data);
  }

}
