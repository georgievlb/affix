import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-post-details',
  templateUrl: './view-post-details.component.html',
  styleUrls: ['./view-post-details.component.scss']
})
export class ViewPostDetailsComponent implements OnInit {

  constructor() { }

  @Input()
  public title: string = '';

  @Input()
  public content: string = '';

  ngOnInit(): void {
  }

}
