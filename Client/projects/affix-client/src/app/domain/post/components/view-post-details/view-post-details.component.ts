import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from '../../models/post.model';
import { PostService } from '../../services/post.service'
import { environment } from "../../../../../environments/environment";

@Component({
  selector: 'app-view-post-details',
  templateUrl: './view-post-details.component.html',
  styleUrls: ['./view-post-details.component.scss']
})
export class ViewPostDetailsComponent implements OnInit {

  public postUrl = '';

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {
    this.route.params.subscribe(params => {
      this.post.moniker = params['moniker'];
    });
    this.postUrl = `https://${environment.apiUrl}:${environment.port}/posts?moniker=${this.post.moniker}`;
  }

  @Input()
  public post: PostModel = new PostModel('', new Date(),'', '', '', false, '', '', '', 0, '', '');

  ngOnInit() {
    if (!this.post.content) {
     this.postService.getPost(this.post.moniker)
      .subscribe((data: any) => this.post = data);
    }
  }

}
