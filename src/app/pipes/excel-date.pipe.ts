import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'excelDate'
})
export class ExcelDatePipe implements PipeTransform {
  transform(excelDate: number): Date | string | undefined {
    if (!excelDate && excelDate !== 0) {
      return 'NA';
    }

    // Separate the integer and fractional parts
    const days = Math.floor(excelDate);
    const timeFraction = excelDate - days;

    // Convert the integer part to a JavaScript date
    const baseDate = new Date('1899-12-31');
    const realDate = new Date(baseDate.getTime() + days * 24 * 60 * 60 * 1000);

    // Convert the fractional part to time
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const millisecondsInFraction = timeFraction * millisecondsInDay;
    const hours = Math.floor(millisecondsInFraction / (60 * 60 * 1000));
    const minutes = Math.floor((millisecondsInFraction % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((millisecondsInFraction % (60 * 1000)) / 1000);

    // Set the time component in the real date
    realDate.setHours(hours, minutes, seconds);

    return realDate;
  }
}
