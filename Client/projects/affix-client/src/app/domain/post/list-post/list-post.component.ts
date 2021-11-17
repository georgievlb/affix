import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from '../models/post.model';
import { PostService } from '../services/post.service';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss']
})
export class ListPostComponent {

  constructor (private router: Router, private postService: PostService) { 
    this.postService.getDraftPosts()
    .subscribe((p: PostModel[]) => {
      this.posts = p;
    });
  }

  public posts: PostModel[];

  public navigateBack() {
    this.router.navigate(['/admin']);
  }

  getHrefLink(moniker: string) {
    return `/admin/post/edit/${moniker}`;
  }
}
