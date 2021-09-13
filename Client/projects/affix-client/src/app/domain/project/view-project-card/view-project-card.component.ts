import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectCardModel } from '../models/project-card.model';

@Component({
  selector: 'app-view-project-card',
  templateUrl: './view-project-card.component.html',
  styleUrls: ['./view-project-card.component.scss']
})
export class ViewProjectCardComponent implements OnInit {

  constructor(private router: Router) { }

  @Input()
  public projectCardModel: ProjectCardModel

  ngOnInit(): void {
  }

}
