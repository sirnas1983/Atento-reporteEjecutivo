import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ReadExcelFileService {

  constructor(private ls : LoaderService) { }

  public readFile(file: File): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.ls.showLoader(this.constructor.name);
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const data: string = e.target.result;
        try {
          const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
          const jsonData: any = {};
          workbook.SheetNames.forEach(sheetName => {
            const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];
            jsonData[sheetName] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Include header
          });
          resolve(jsonData);
          this.ls.hideLoader(this.constructor.name);
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsBinaryString(file);
    });
  }
}

