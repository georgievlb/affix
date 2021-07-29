import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";

const SMALL_WIDTH_BREAKPOINT = 44;

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public isScreenSmall: boolean;
  public isCollapsed = true;

  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}em)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
  }

  toggle() {
    // this.isExpanded = !this.isExpanded;
    this.isCollapsed = !this.isCollapsed;
  }

}
