import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResumenEjecutivo } from '../intefaces/ResumenEjecutivo';
import { ReportePersona } from '../intefaces/PersonasReporte';
import { ExcelService } from './excel.service';

@Injectable({
  providedIn: 'root'
})
export class ResumenService {

  private processedDataSubject: BehaviorSubject<ReportePersona[]> = new BehaviorSubject<ReportePersona[]>([]);
  public processedData$: Observable<ReportePersona[]> = this.processedDataSubject.asObservable();

  private rawData: {} = {};

  constructor(private excelService: ExcelService) {
    this.initializeDataSubscription();
  }

  private initializeDataSubscription(): void {
    this.excelService.processedData$.subscribe(data => {
      const sheetName = 'RESUMEN EJECUTIVO'; // Change this to the desired sheet name
      const sheetData = data ? data[sheetName as keyof typeof data] : undefined;
      if (sheetData) {
        this.setData(sheetData);
      }
    });
  }

  private setData(data: any[]): void {
    const headers: string[] = data[0];
    const parsedData = this.parseDataAsResumenEjecutivo(data, headers);
    const reportData = this.processResumenEjecutivo(parsedData);
    console.log(reportData);
    this.processedDataSubject.next(reportData);
  }

  private parseDataAsResumenEjecutivo(data: any[], headers: string[]): ResumenEjecutivo[] {
    const parsedData: ResumenEjecutivo[] = [];

    for (let i = 1; i < data.length; i++) {
      const row = data[i];
      const rowData: ResumenEjecutivo = {} as ResumenEjecutivo;

      // Check if any cell has a value in the row
      if (row.some((cell: any) => cell !== undefined && cell !== null && cell.valueOf != '')) {
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

  private processResumenEjecutivo(data: ResumenEjecutivo[]): ReportePersona[] {
    const uniqueNames = [...new Set(data.map(obj => obj['NOMBRE']))].filter(name => typeof name === 'string');
    const totalRegistros : number = data.length;
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
        registros,
        totalRegistros
      );
    });
  }
}
