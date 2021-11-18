import { PipeTransform } from "@angular/core";
import { Pipe } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";

// TODO: This is currently not used. Delete it if necessary.
@Pipe({ name: "renderHtml" })
export class RenderHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: any) {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}