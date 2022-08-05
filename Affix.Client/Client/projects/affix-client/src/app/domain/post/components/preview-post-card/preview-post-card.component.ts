import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { PostModel } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'app-preview-post-card',
  templateUrl: './preview-post-card.component.html',
  styleUrls: ['./preview-post-card.component.scss']
})
export class PreviewPostCardComponent {


  @Input()
  public postCardPreview: PostModel;

  constructor(private postService: PostService, private location: Location) {
    this.postService.getPostPreview().subscribe(
      (data) => {
        this.postCardPreview = data;
      },
      (error) => {
        console.log(error);
      }
    );

  }

  public navigateBack() {
    this.location.back();
  }
}
