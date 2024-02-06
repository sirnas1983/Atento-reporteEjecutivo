import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class ReadExcelFileService {

  constructor() { }

  private validateSheetName(workbook: XLSX.WorkBook, sheetName: string): boolean {
    return workbook.SheetNames.includes(sheetName);
  }
  
  public readFile(file: File, sheetName?: string): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const data: string = e.target.result;
        try {
          const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });
          const selectedSheetName: string = sheetName || workbook.SheetNames[0]; // Use the first sheet if none provided
          if (!this.validateSheetName(workbook, selectedSheetName)) {
            reject(`Sheet "${selectedSheetName}" not found in the Excel file.`);
            return;
          }
          const worksheet: XLSX.WorkSheet = workbook.Sheets[selectedSheetName];
          const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 }); // Include header
          resolve(jsonData);
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
