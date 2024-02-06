import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResumenEjecutivo } from '../intefaces/ResumenEjecutivo';
import { ReadExcelFileService } from './read-excel-file.service';
import { ReportePersona } from '../intefaces/PersonasReporte';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
 
    private processedDataSubject: BehaviorSubject<ReportePersona[]> = new BehaviorSubject<ReportePersona[]>([]);
    public processedData$: Observable<ReportePersona[]> = this.processedDataSubject.asObservable();
  
    constructor(private readExcelFile : ReadExcelFileService) { }
  
    private setData(sheetName: string, data: any[]): void {
      const headers: string[] = data[0];
      const parsedData = this.parseDataAsResumenEjecutivo(data, headers);
      const reportData = this.processResumenEjecutivo(parsedData);
      this.processedDataSubject.next(reportData);
    }
  
    private parseDataAsResumenEjecutivo(data: any[], headers: string[]): ResumenEjecutivo[] {
      const parsedData: ResumenEjecutivo[] = [];
    
      for (let i = 1; i < data.length; i++) {
        const row = data[i];
        const rowData: ResumenEjecutivo = {} as ResumenEjecutivo;

        // Check if any cell has a value in the row
        if (row.some((cell: String) => cell !== undefined && cell !== null && cell !== '')) {
          headers.forEach((header, index) => {
            const cellValue = row[index];
            if (cellValue !== undefined && cellValue !== null && cellValue !== '') {
              rowData[header as keyof ResumenEjecutivo] = cellValue;
            }
          });
          parsedData.push(rowData);
        }
      }
    
      return parsedData;
    }
  
    getResumenEjecutivoData(file: File, sheetName?: string): Observable<ReportePersona[]> {
      return new Observable<ReportePersona[]>((observer) => {
        this.readExcelFile.readFile(file, sheetName).then((jsonData: any[]) => {
          try {
            this.setData(sheetName || '', jsonData);
            observer.next(this.processedDataSubject.value);
            observer.complete();
          } catch (error) {
            observer.error(error);
          }
        }).catch((error) => {
          observer.error(error);
        });
      });
    }

    private processResumenEjecutivo(data: ResumenEjecutivo[]): ReportePersona[] {
      const uniqueNames = [...new Set(data.map(obj => obj['NOMBRE']))];
      return uniqueNames.map(name => {
        const registros = data.filter(obj => obj.NOMBRE === name);
        return new ReportePersona(
          name,
          registros.length,
          registros.filter(obj => obj.BREAK !== "OK").length,
          registros.filter(obj => obj.DESVIOS === "SI").length,
          registros.filter(obj => obj.FALTA !== "OK").length,
          registros.filter(obj => obj.PRODUCTIVIDAD !== "OK").length,
          registros.filter(obj => obj.TMO !== "OK").length,
          registros.filter(obj => obj.TARDANZAS !== "OK").length,
          registros
        );
      });
    }
    
}
