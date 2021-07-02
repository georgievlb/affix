import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  public title: string = '';
  public content: string = '';


  createPost():void {
    const body = { title : this.title, content : this.content };
    this.httpClient.put('https://localhost:5001/posts', body)
      .subscribe(data => console.log(data));
  }

  ngOnInit(): void {

  }
}
