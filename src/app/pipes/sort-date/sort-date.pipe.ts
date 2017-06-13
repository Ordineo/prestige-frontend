import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'sortDate'
})
export class SortDatePipe implements PipeTransform {

  transform(array: Array<string>, args: string): Array<string> {
    if (typeof args[0] === 'undefined') {
      return array;
    }

    const direction = args[0][0];
    const column = args[0].slice(1);

    array.sort((a: any, b: any) => {

      const left = Number(new Date(a[column]));
      const right = Number(new Date(b[column]));

      return (direction === '-') ? right - left : left - right;
    });

    return array;
  }

}


