import { Component, OnInit, Input } from '@angular/core';
import { PostCardModel } from '../models/post-card.model';

@Component({
  selector: 'app-view-post-card',
  templateUrl: './view-post-card.component.html',
  styleUrls: ['./view-post-card.component.scss']
})
export class ViewPostCardComponent implements OnInit {

  constructor() { }

  @Input()
  public postCardModel: PostCardModel;

  ngOnInit(): void {
  }

}
