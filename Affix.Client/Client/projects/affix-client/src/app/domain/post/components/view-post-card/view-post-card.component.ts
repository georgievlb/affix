import { Component, OnInit, Input } from '@angular/core';
import { PostModel } from '../../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-post-card',
  templateUrl: './view-post-card.component.html',
  styleUrls: ['./view-post-card.component.scss']
})
export class ViewPostCardComponent implements OnInit {

  constructor(private router: Router) { }

  @Input()
  public postCardModel: PostModel;

  ngOnInit(): void {
  }

  openPostDetails(): void {
    this.router.navigate(['/posts/'+ this.postCardModel.moniker]);
  }

}
