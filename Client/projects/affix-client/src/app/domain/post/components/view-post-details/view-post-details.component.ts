import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location} from '@angular/common';
import { PostModel } from '../../models/post.model';
import { PostService } from '../../services/post.service'
import { environment } from "../../../../../environments/environment";
import * as marked from 'marked';

@Component({
  selector: 'app-view-post-details',
  templateUrl: './view-post-details.component.html',
  styleUrls: ['./view-post-details.component.scss']
})
export class ViewPostDetailsComponent implements OnInit {

  public postUrl = '';
  public tags: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private location: Location
  ) {
    this.route.params.subscribe(params => {
      this.post.moniker = params['moniker'];
    });
    this.postUrl = `https://${environment.apiUrl}:${environment.port}/posts?moniker=${this.post.moniker}`;
  }

  @Input()
  public post: PostModel = new PostModel('', new Date(),'', '', '', false, '', '', '', 0, '', '', '', '');

  public goToTop (): void {
    window.scrollTo(0, 0);
  }

  public navigateBack() {
    this.location.back();
  }

  ngOnInit() {
    if (!this.post.content) {
     this.postService.getPost(this.post.moniker)
      .subscribe((data: any) => {
        this.post = data;
        this.post.parsedContent = marked.parser(marked.lexer(this.post.content));
        this.tags = data.category.tags;
      });
    }
    else {
      this.tags = this.post.tags.split(',');
    }

  }

}
