// excel.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReadExcelFileService } from './read-excel-file.service';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  
  private processedDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public processedData$: Observable<any[]> = this.processedDataSubject.asObservable();

  constructor(private readExcelFile : ReadExcelFileService,
    private loaderService : LoaderService) { }

  public loadData(file: File): void {
    this.loaderService.showLoader(this.constructor.name);
    this.readExcelFile.readFile(file).then((jsonData: any[]) => {
      jsonData = this.parseData(jsonData);
      this.processedDataSubject.next(jsonData);
    }).catch((error) => {
      console.error('Error reading Excel file:', error);
    });
    this.loaderService.hideLoader(this.constructor.name);
  }

  public parseData(data: any): any {
    // Remove any empty arrays
    const filteredData = this.removeEmptyArrays(data);
    return filteredData;
  }
  
  private removeEmptyArrays(data: any): any {
    if (typeof data === 'object' && data !== null) {
      const result: any = {};
      for (const [key, value] of Object.entries(data)) {
        if (Array.isArray(value)) {
          const cleanedArray = this.removeEmptyArraysFromArray(value);
          if (cleanedArray.length > 0) {
            result[key] = cleanedArray;
          }
        } else {
          result[key] = this.removeEmptyArrays(value);
        }
      }
      return result;
    } else {
      return data; // Return non-object values as is
    }
  }
  
  private removeEmptyArraysFromArray(arr: any[]): any[] {
    let startIndex = 0;
    // Find the index of the first non-empty array
    for (let i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) && arr[i].length > 0) {
        startIndex = i;
        break;
      }
    }
    // Slice the array from the first non-empty index and remove empty arrays recursively
    const cleanedArray = arr.slice(startIndex).filter(item => {
      if (Array.isArray(item)) {
        return this.removeEmptyArraysFromArray(item).length > 0;
      } else {
        return true;
      }
    });
    return cleanedArray;
  }
}
