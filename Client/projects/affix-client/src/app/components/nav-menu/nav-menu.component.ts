import { EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  constructor() { }

  public toggleSidenav: EventEmitter<void> = new EventEmitter<void>();

  ngOnInit(): void {
  }

}
