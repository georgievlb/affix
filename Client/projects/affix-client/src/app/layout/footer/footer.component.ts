import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  public credits: string[] = [
      'Powered by Angular Material',
      'Text 2',
      'Text 3'
  ];

  public constructor(
      private readonly matIconRegistry: MatIconRegistry,
      private readonly domSanitizer: DomSanitizer) {
      this.matIconRegistry.addSvgIcon(
          'angular_logo',
          this.domSanitizer.bypassSecurityTrustResourceUrl(
              '../../../assets/angular.svg'
          )
      );
  }
}
