import { Injectable } from '@angular/core';
import { LoaderService } from './loader.service';
import { ExcelService } from './excel.service';
import { BehaviorSubject } from 'rxjs';
import { Tardanza } from '../intefaces/Tardanza';

@Injectable({
  providedIn: 'root'
})
export class TardanzaService {

  rawData!: any;

  private rawDataSubject: BehaviorSubject<Tardanza[]> = new BehaviorSubject<Tardanza[]>([]);
  public readonly rawData$ = this.rawDataSubject.asObservable();

  private tableDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public readonly tableData$ = this.tableDataSubject.asObservable();

  constructor(private ls: LoaderService, private excelService: ExcelService) {
    this.excelService.processedData$.subscribe(data => {
      const sheetName = 'TARDANZAS'; 
      const sheetData = data ? data[sheetName as keyof typeof data] : undefined;
      if (sheetData) {
        const parsedData = this.parseTardanza(sheetData);
        this.rawDataSubject.next(parsedData);
        const tableData = this.parseTardanzaForTable(parsedData);
        this.tableDataSubject.next(tableData);
      }
    });
  }

  async getImproductividadByDniAndFecha(dni: string, fecha: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.rawData$.subscribe((data: Tardanza[]) => {
        if (data) {
          let $dni = Number(dni);
          const filteredData = data
              .filter(item => Number(item.DNI) === $dni)
              .filter(data => this.isSameDate(this.parseExcelDate(fecha), data.Fecha));
          resolve(this.parseTardanzaForTable(filteredData));
        } else {
          reject("Error: No data available.");
        }
      });
    });
  }

  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  parseTardanzaForTable(tardanzaData: Tardanza[]): any[] {
    this.ls.showLoader(this.constructor.name);

    const uniqueNombres = new Set(tardanzaData.map(item => item.NOMBRE));

    const nestedTableData = Array.from(uniqueNombres).map(nombre => {
      const nombreData = tardanzaData.filter(item => item.NOMBRE === nombre);
      const uniqueSemanas = new Set(nombreData.map(item => item.SEMANA));

      const semanaData = Array.from(uniqueSemanas).map(semana => {
        const semanaNombreData = nombreData.filter(item => item.SEMANA === semana);
        return {
          semana,
          data: semanaNombreData.map(item => ({
            SITE: item.SITE,
            SUPER: item.SUPER,
            Fecha: item.Fecha,
            'Horario Programado': this.parseExcelTime(item['Horario Programado']),
            'Horario Entrada Gap': this.parseExcelTime(item['Horario Entrada Gap']),
            'Horario Salida Gap': this.parseExcelTime(item['Horario Salida Gap']),
            'Horario Laboral': this.parseExcelTime(item['Horario Laboral']),
            'Hs Gap': this.parseExcelTime(item['Hs Gap']),
            'Hs Avaya': this.parseExcelTime(item['Hs Avaya']),
            'Break Objetivo': this.parseExcelTime(item['Break Objetivo']),
            'Break Real': this.parseExcelTime(item['Break Real']),
            'Impacto Break': this.formatPercentage(item['Impacto Break']),            
            'Entrada Biométrico': this.parseExcelTime(item['Entrada Biométrico']),
            'Salida Biométrico': this.parseExcelTime(item['Salida Biométrico']),
            'Estado Break': item['Estado Break'],
            Tardanza: item.Tardanza
          }))
        };
      });

      return {
        nombre,
        dni: nombreData[0].DNI, 
        semanaData
      };
    });

    this.ls.hideLoader(this.constructor.name);
    return nestedTableData;
  }

  private formatPercentage(percentage: any): string {
    if (typeof percentage === 'number') {
      return `${percentage.toFixed(2)}%`;
    } else {
      return percentage;
    }
  }

  parseTardanza(rawData: any): Tardanza[] {
    this.ls.showLoader(this.constructor.name);
    const tardanza: Tardanza[] = [];

    rawData.forEach((item: any[]) => {
      const registro: Tardanza = {
        SEMANA: item[0],
        DNI: item[1],
        SITE: item[2],
        SUPER: item[3],
        NOMBRE: item[4],
        Fecha: this.parseExcelDate(item[5]),
        'Horario Programado': item[6],
        'Horario Entrada Gap': item[7],
        'Horario Salida Gap': item[8],
        'Horario Laboral': item[9],
        'Hs Gap': item[10],
        'Hs Avaya': item[11],
        'Break Objetivo': item[12],
        'Break Real': item[13],
        'Impacto Break': item[14],
        'Entrada Biométrico': item[15],
        'Salida Biométrico': item[16],
        'Estado Break': item[17],
        Tardanza: item[18]
      };
      tardanza.push(registro);
    });
    this.ls.hideLoader(this.constructor.name);
    return tardanza;
  }

  private parseExcelDate(dateValue: any): Date {
    
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const epoch = new Date('1899-12-31').getTime();
    const dateInMilliseconds = epoch + dateValue * millisecondsInDay;
    return new Date(dateInMilliseconds);
  }

  private parseExcelTime(timeValue: any): string {
    if (typeof timeValue === 'string') {
      return timeValue;
    }
    const hours = Math.floor(timeValue * 24);
    const minutes = Math.floor((timeValue * 24 * 60) % 60);
    const seconds = Math.floor((timeValue * 24 * 60 * 60) % 60);
    const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;

    return formattedTime;
  }

  private padZero(num: number): string {
    return num < 10 ? `0${num}` : `${num}`;
  }
}
