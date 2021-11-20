import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({
  name: 'renderMarkdown'
})
// TODO: This is currently not used. Delete it if necessary.
export class RenderMarkdownPipe implements PipeTransform {

  transform(value: any) {
    return  marked.parser(marked.lexer(value));
  }
}
