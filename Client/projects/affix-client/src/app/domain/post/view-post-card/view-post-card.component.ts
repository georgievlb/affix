import { Component, OnInit, Input } from '@angular/core';
import { PostCardModel } from '../models/post.model';

@Component({
  selector: 'app-view-post-card',
  templateUrl: './view-post-card.component.html',
  styleUrls: ['./view-post-card.component.scss']
})
export class ViewPostCardComponent implements OnInit {

  constructor() { }

  @Input()
  public header: string;

  @Input()
  public title: string;

  @Input()
  public subtitle: string;

  @Input()
  public content: string;

  ngOnInit(): void {
  }

}
