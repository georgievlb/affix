import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({
  name: 'renderMarkdown'
})
export class RenderMarkdownPipe implements PipeTransform {

  transform(value: any) {
    return  marked.parser(marked.lexer(value));
  }
}
