import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const datePipe = new DatePipe('es');
    return datePipe.transform(value, 'fullDate');
  }
}
