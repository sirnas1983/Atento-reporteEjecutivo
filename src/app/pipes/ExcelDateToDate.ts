import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformExcelDate'
})

export class ExcelDateToDate implements PipeTransform {
  transform(excelDateStr: string): Date {
    // Convert the Excel date string to a number
    const excelDateNum = parseFloat(excelDateStr);
    
    // Calculate the milliseconds since January 1, 1900
    const millisecondsSince1900 = (excelDateNum - 1) * 24 * 60 * 60 * 1000;
    
    // Calculate the timestamp of the Excel date
    const excelDateTimestamp = Date.UTC(1900, 0, 1) + millisecondsSince1900;
    
    // Create a new Date object using the timestamp
    return new Date(excelDateTimestamp);
  }
}