import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as marked from 'marked';
import { environment } from "../../../../../environments/environment";
import { PostService } from '../../services/post.service';
import { Subscription } from 'rxjs';
import { PostModel } from '../../models/post.model';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit, OnDestroy {

  private readonly subscription: Subscription = new Subscription();

  constructor(private router: Router, private postService: PostService) {
      this.subscription.add(this.postService.getPostPreview().subscribe((postPreview: PostModel)  => {
        this.postPreview = postPreview;
      }));
      this.subscription.add(this.postService.getEditPost().subscribe((editPost: PostModel)  => {
        this.editPost = editPost;
      }));
    }

  public postModel: PostModel = this.postService.getEmptyPostModel();
  public postPreview: PostModel;
  public editPost: PostModel;
  public fileName = '';
  public icons: string[] = ['csharp', 'cloud', 'database', 'productivity', 'git'];


  // TODO: Add a check if moniker is unique.
  createPost(isDraft: boolean = false): void {
    this.postModel.isDraft = isDraft;
    this.postService.putPost(this.postModel)
    .subscribe((data: PostModel) => {
      this.postModel = this.postService.getEmptyPostModel();
      this.router.navigate([`/posts/${data.moniker}`])
    });
  }

    // createPost(isDraft: boolean = false): void {
    //     this.postModel.isDraft = isDraft;
    //
    //     // Check if the moniker is unique
    //     this.postService.checkMoniker(this.postModel.moniker)
    //         .subscribe((isUnique: boolean) => {
    //             if (isUnique) {
    //                 // If the moniker is unique, create the post
    //                 this.postService.putPost(this.postModel)
    //                     .subscribe((data: PostModel) => {
    //                         this.postModel = this.postService.getEmptyPostModel();
    //                         this.router.navigate([`/posts/${data.moniker}`])
    //                     });
    //             } else {
    //                 // If the moniker is not unique, show an error message
    //                 console.error("The moniker is not unique.");
    //             }
    //         });
    // }


    onContentChanged(event: any) {
    this.postModel.parsedContent = this.compileMarkdown(event.target.value);
  }

  validateInput(input: string): boolean {
    return !!input;
  }

  validatePost(): boolean {
    const postFields = [
      this.postModel.title,
      this.postModel.moniker,
      this.postModel.header,
      this.postModel.summary,
      this.postModel.imageId,
      this.postModel.imageAltText,
      this.postModel.content,
      this.postModel.category,
      this.postModel.tags];
    return postFields.every(p => !!p);
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      const upload$ = this.postService.putImage(file);
      upload$.subscribe(imageId => {
        this.postModel.imageId = imageId.toString();
        this.postModel.imageSrc = `${environment.bucketName}.s3.amazonaws.com/${this.postModel.imageId}`;
      });
    }
  }

  previewPostCard(postMoniker: string): void {
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
      this.postModel.parsedContent,
      this.postModel.category,
      this.postModel.tags
      );
    this.postService.setPostPreview(this.postPreview);
    this.router.navigate([`/admin/post/preview/${postMoniker}`]);
  }

  previewPostDetails(postMoniker: string): void {
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
      this.postModel.parsedContent,
      this.postModel.category,
      this.postModel.tags
      );
    this.postService.setPostPreview(this.postPreview);
    this.router.navigate([`/admin/post/preview/details/${postMoniker}`]);
  }

  saveDraft(): void {
    this.createPost(true);
  }

  cancel(): void {
    this.postModel = this.postService.getEmptyPostModel();
    this.postService.setPostPreview(this.postModel);
    this.postService.setEditPost(this.postModel);
    this.router.navigate(['/admin']);
  }

  getPublishButtonName(): string {
    if(this.router.url.includes('/edit')) {
      return 'Publish';
    }
      return 'Create';
  }

  private compileMarkdown(value: string): string {
    return marked.parser(marked.lexer(value));
  }

  ngOnInit(): void {
    if(this.router.url.includes('edit')) {
      this.postModel = new PostModel(
        this.editPost.title,
        this.editPost.date,
        this.editPost.moniker,
        this.editPost.imageId,
        this.editPost.imageAltText,
        this.editPost.isDraft,
        this.editPost.header,
        this.editPost.summary,
        this.editPost.imageSrc,
        this.editPost.index,
        this.editPost.content,
        this.compileMarkdown(this.editPost.content),
        this.editPost.category,
        this.editPost.tags
        );
    } else {
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
        this.compileMarkdown(this.postPreview.content),
        this.postModel.category,
        this.postModel.tags
        );
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
