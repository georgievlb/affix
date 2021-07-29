import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as marked from 'marked';
import * as Oidc from 'oidc-client';
import { HttpHeaders } from '@angular/common/http';
import { AuthorizeService } from "../../../../api-authorization/authorize.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private httpClient: HttpClient, private authorizeService: AuthorizeService) { }

  public title: string = '';
  public summary: string = '';
  public header: string = '';
  public parsedString: string = 'Parsed Markdown';

  public config = {
    authority: "https://localhost:5001",
    client_id: "js",
    redirect_uri: "https://localhost:5003/callback.html",
    response_type: "code",
    scope:"openid profile api1",
    post_logout_redirect_uri : "https://localhost:5003/index.html",
  };

  public mgr = new Oidc.UserManager(this.config);

  public userToken: any;


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
          .subscribe(data => console.log(data));
      });
  }

  onValueChanged(event: any) {
    this.parsedString = this.compileMarkdown(event.target.value);
    console.log(this.parsedString);
  }

  private compileMarkdown(value: string): string {
    return marked.parser(marked.lexer(value));
  }

  private setToken(token: any) {
    this.userToken = token;
  }

  ngOnInit(): void {

  }
}
