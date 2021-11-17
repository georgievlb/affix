import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as marked from 'marked';
import { HttpHeaders } from '@angular/common/http';
import { AuthorizeService } from "../../../../api-authorization/authorize.service";
import { environment } from "../../../../environments/environment";
import { PostService } from '../services/post.service';
import { Subscription } from 'rxjs';
import { PostModel } from '../models/post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  private readonly subscription: Subscription = new Subscription();

  constructor(private httpClient: HttpClient, private authorizeService: AuthorizeService, private router: Router,
    private postService: PostService) {
      this.subscription.add(this.postService.getPostPreview().subscribe((postPreview: PostModel)  => {
        this.postPreview = postPreview;
      }));
    }

  public postModel: PostModel = new PostModel('', new Date(), '', '', '', false, '', '', '', 0, '', '');
  public postPreview: PostModel;
  public fileName = '';

  createPost(isDraft: boolean = false): void {
    this.postModel.isDraft = isDraft;
    this.postService.createPost(this.postModel)
    .subscribe((data: any) => this.router.navigate([`/posts/${data.moniker}`]));
  }

  onValueChanged(event: any) {
    this.postModel.content = this.compileMarkdown(event.target.value);
  }

  private compileMarkdown(value: string): string {
    return marked.parser(marked.lexer(value));
  }

  validateInput(input: string): boolean {
    return !!input;
  }

  validatePost(): boolean {
    const postFields = [this.postModel.title, this.postModel.summary, this.postModel.header, this.postModel.content];
    return postFields.every(p => !!p);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const upload$ = this.postService.putImage(file);
      upload$.subscribe(imageId => {
        this.postModel.imageId = imageId.toString();
        this.postModel.imageSrc = `https://${environment.bucketName}.s3.amazonaws.com/${this.postModel.imageId}`;
      });
    }
  }

  previewPostCard(postCardMoniker: string): void {
    this.postPreview = new PostModel(
      this.postModel.title,
      this.postModel.date,
      this.postModel.moniker,
      this.postModel.imageId,
      this.postModel.imageAltText,
      this.postModel.isDraft,
      this.postModel.header,
      this.postModel.summary,
      this.postModel.imageSrc,
      this.postModel.index,
      this.postModel.content,
      this.postModel.rawContent
      );
    this.postService.setPostPreview(this.postPreview);
    this.router.navigate([`/admin/post/preview/${postCardMoniker}`]);
  }

  previewPostDetails(postCardMoniker: string): void {
    this.postPreview = new PostModel(
      this.postModel.title,
      this.postModel.date,
      this.postModel.moniker,
      this.postModel.imageId,
      this.postModel.imageAltText,
      this.postModel.isDraft,
      this.postModel.header,
      this.postModel.summary,
      this.postModel.imageSrc,
      this.postModel.index,
      this.postModel.content,
      this.postModel.rawContent
      );
    this.postService.setPostPreview(this.postPreview);
    this.router.navigate([`/admin/post/preview/details/${postCardMoniker}`]);
  }

  saveDraft(): void {
    this.createPost(true);
  }

  cancel() {
    this.router.navigate(['/admin']);
  }

  ngOnInit(): void {
    if(this.postPreview) {
      this.postModel = new PostModel(
        this.postPreview.title,
        this.postPreview.date,
        this.postPreview.moniker,
        this.postPreview.imageId,
        this.postPreview.imageAltText,
        this.postPreview.isDraft,
        this.postPreview.header,
        this.postPreview.summary,
        this.postPreview.imageSrc,
        this.postPreview.index,
        this.postPreview.content,
        this.postPreview.rawContent
        );
    }
  }
}
