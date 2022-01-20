import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SearchDialogComponent } from '../search-dialog/search-dialog.component';

@Component({
  selector: 'app-search-container',
  templateUrl: './search-container.component.html'
})
export class SearchContainerComponent {

  constructor(public dialog: MatDialog, private router: Router) { }

  openDialog() {
    this.dialog
      .open(SearchDialogComponent, {
        height: '50%',
        width: '60%'
      })
      .afterClosed()
      .subscribe((isSearchResultClicked: boolean) => {
        if (isSearchResultClicked) {
          const currentUrl = this.router.url;
          this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
            this.router.navigate([currentUrl]);
          });
        }
      });
  }

  ngOnDestroy() {
    this.dialog.closeAll();
    this.dialog.ngOnDestroy();
  }

}
