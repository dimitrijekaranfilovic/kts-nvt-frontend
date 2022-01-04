import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenString',
})
export class ShortenStringPipe implements PipeTransform {
  transform(value: string, stringLength: number = 20): string {
    if (value.length >= stringLength)
      return value.substring(0, stringLength) + '...';
    else return value;
  }
}
