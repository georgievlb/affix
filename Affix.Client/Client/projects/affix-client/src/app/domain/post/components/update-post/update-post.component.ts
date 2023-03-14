import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PostModel } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-update-post',
  templateUrl: './update-post.component.html',
  styleUrls: ['./update-post.component.scss']
})
export class UpdatePostComponent {

  constructor (private router: Router, private postService: PostService) {
    // Determine if the user is editing an existing or a draft post depending on the URL.
    if(this.router.url.includes('edit')) {
      this.postService.getAllPosts()
      .subscribe((p : { item1: PostModel[], item2: number }) => {
        this.posts = [...p.item1];
      });
    } else {
      this.postService.getDraftPosts()
      .subscribe((p: PostModel[]) => {
        this.posts = p;
      });
    }
  }

  public posts: PostModel[];

  public navigateBack() {
    this.router.navigate(['/admin']);
  }

  editPost(post: PostModel) {
    post.imageSrc = `${environment.bucketName}.s3.amazonaws.com/${post.imageId}`
    this.postService.setEditPost(post);
    this.router.navigate([`/admin/post/edit/${post.moniker}`]);
  }
}
