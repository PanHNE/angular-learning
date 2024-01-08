import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {
  private maxNumberOfLetters: number = 10; 

  transform(value: any) {
    if (value.length > this.maxNumberOfLetters) {
      return value.substr(0, this.maxNumberOfLetters) + ' ...';
    }
    
    return value;
  }
}