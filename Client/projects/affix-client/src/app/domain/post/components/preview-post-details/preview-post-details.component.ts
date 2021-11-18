import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-preview-post-details',
  templateUrl: './preview-post-details.component.html',
  styleUrls: ['./preview-post-details.component.scss']
})
export class PreviewPostDetailsComponent {

  @Input()
  public postDetailsPreview: PostModel;

  constructor(private postService: PostService, private router: Router) {
    this.postService.getPostPreview().subscribe(
      (data) => {
        this.postDetailsPreview = data;
      },
      (error) => {
        console.log(error);
      }
    );

  }

  public navigateBack() {
    this.router.navigate(['/admin/post/create']);
  }

}
