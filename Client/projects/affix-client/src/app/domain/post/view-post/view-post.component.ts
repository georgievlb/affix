import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../modles/post.model';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss']
})
export class ViewPostComponent implements OnInit {

  constructor() { }

  @Input()
  public postTitle: string;
  @Input()
  public postContent: string;

  ngOnInit(): void {
  }

}
