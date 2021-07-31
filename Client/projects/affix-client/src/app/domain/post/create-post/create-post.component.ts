import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import * as marked from 'marked';
import { HttpHeaders } from '@angular/common/http';
import { AuthorizeService } from "../../../../api-authorization/authorize.service";

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

  createPost():void {
    this.authorizeService.getAccessToken()
      .subscribe(token => {
        const headers = new HttpHeaders()
          .set('Authorization', `Bearer ${token}`)

        const body =
          {
            title : this.title,
            content : this.parsedString,
            summary: this.summary,
            header: this.header
          };

        this.httpClient.put('https://localhost:5001/posts', body, { 'headers': headers })
          .subscribe((data: any) => this.router.navigate([`/posts/${data.id}`]));
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
    const postFields = [ this.title, this.summary, this.header, this.parsedString ];
    return postFields.every(p => !!p);
  }

  ngOnInit(): void {
  }
}
