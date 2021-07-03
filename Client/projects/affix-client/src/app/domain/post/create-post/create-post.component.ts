import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as marked from 'marked';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  public title: string = '';
  public summary: string = '';
  public parsedString: string = 'Parsed Markdown';


  createPost():void {
    const body = { title : this.title, content : this.parsedString, summary: this.summary };
    this.httpClient.put('https://localhost:5001/posts', body)
      .subscribe(data => console.log(data));
  }

  onValueChanged(event: any) {
    this.parsedString = this.compileMarkdown(event.target.value);
    console.log(this.parsedString);
  }

  private compileMarkdown(value: string): string {
    return marked.parser(marked.lexer(value));
  }


  ngOnInit(): void {

  }
}
