import { Component, Input, OnInit } from '@angular/core';
import { BreakpointObserver, BreakpointState } from "@angular/cdk/layout";
import { environment } from 'src/environments/environment';

const SMALL_WIDTH_BREAKPOINT = 44;

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  public isScreenSmall: boolean;
  public isCollapsed = true;
  public homeUrl = `https://${environment.apiUrl}:${environment.port}/`;

  constructor(private breakpointObserver: BreakpointObserver) { }

  @Input()
  public isUserLoggedIn: boolean;

  @Input()
  public userName: string | undefined;

  @Input()
  public userRole: string | undefined | null;

  ngOnInit(): void {
    this.breakpointObserver
      .observe([`(max-width: ${SMALL_WIDTH_BREAKPOINT}em)`])
      .subscribe((state: BreakpointState) => {
        this.isScreenSmall = state.matches;
      });
  }

  toggle() {
    this.isCollapsed = !this.isCollapsed;
  }

}
