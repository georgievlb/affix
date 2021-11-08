import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as marked from 'marked';
import { HttpHeaders } from '@angular/common/http';
import { AuthorizeService } from "../../../../api-authorization/authorize.service";
import { environment } from "../../../../environments/environment";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private httpClient: HttpClient, private authorizeService: AuthorizeService, private router: Router) { }

  public title: string = '';
  public summary: string = '';
  public header: string = '';
  public parsedString: string = '';
  public fileName = '';
  public imageId = '';
  public moniker = '';
  public imageSrc = '';
  public imageAltText = '';

  createPost(isDraft: boolean = false): void {
    this.authorizeService.getAccessToken()
      .subscribe(token => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${token}`);

        const body =
        {
          title: this.title,
          content: this.parsedString,
          summary: this.summary,
          header: this.header,
          imageId: this.imageId,
          moniker: this.moniker,
          imageAltText: this.imageAltText,
          isDraft: isDraft
        };

        this.httpClient.put(`https://${environment.apiUrl}:${environment.port}/posts`, body, { 'headers': headers })
          .subscribe((data: any) => this.router.navigate([`/posts/${data.moniker}`]));
      });
  }

  onValueChanged(event: any) {
    this.parsedString = this.compileMarkdown(event.target.value);
    console.log(this.parsedString);
  }

  private compileMarkdown(value: string): string {
    return marked.parser(marked.lexer(value));
  }

  validateInput(input: string): boolean {
    return !!input;
  }

  validatePost(): boolean {
    const postFields = [this.title, this.summary, this.header, this.parsedString];
    return postFields.every(p => !!p);
  }

  onFileSelected(event: any) {

    this.authorizeService.getAccessToken()
    .subscribe(token => {
      const headers = new HttpHeaders()
        .set('Authorization', `Bearer ${token}`);
        
        const file: File = event.target.files[0];
        
        if (file) {
          this.fileName = file.name;
          const formData = new FormData();
          formData.append("image", file);
          const upload$ = this.httpClient.put(`https://${environment.apiUrl}:${environment.port}/posts/image`, formData, { 'headers': headers });
          
          upload$.subscribe(imageId => {
            this.imageId = imageId.toString();
            this.imageSrc = `https://${environment.bucketName}.s3.amazonaws.com/${this.imageId}`;
          });
        }
      });
  }

  previewPostCard(): void {

  }

  previewPostDetails(): void {

  }

  saveDraft(): void {
    this.createPost(true);
  }

  cancel() {
    this.router.navigate(['/admin']);
  }

  ngOnInit(): void {
  }
}
