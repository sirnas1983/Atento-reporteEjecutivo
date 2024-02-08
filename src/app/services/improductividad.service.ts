import { Injectable } from '@angular/core';
import { Improductividad } from '../intefaces/Improductividad';
import { LoaderService } from './loader.service';
import { ExcelService } from './excel.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImproductividadService {

  rawData! : any;

  private rawDataSubject: BehaviorSubject<Improductividad[]> = new BehaviorSubject<Improductividad[]>([]);
  public readonly rawData$ = this.rawDataSubject.asObservable();

  private tableDataSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public readonly tableData$ = this.tableDataSubject.asObservable();

  constructor(private ls : LoaderService, private excelService : ExcelService) { 
    this.excelService.processedData$.subscribe(data => {
      const sheetName = 'IMPRODUCTIVIDAD'; // Change this to the desired sheet name
      const sheetData = data ? data[sheetName as keyof typeof data] : undefined;
      if (sheetData) {
        const parsedData = this.parseImproductividad(sheetData);
        this.rawDataSubject.next(parsedData);
        const tableData = this.parseImproductividadForTable(parsedData);
        this.tableDataSubject.next(tableData);
      }
    });
  }

  async getImproductividadByDniAndFecha(dni: string, fecha: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.rawData$.subscribe((data: Improductividad[]) => {
        if (data) {
          let $dni = Number(dni);
          const filteredData = data
              .filter(item => Number(item.dni) === $dni)
              .filter(data => this.isSameDate(this.parseExcelDate(fecha), data.fecha));
          resolve(this.parseImproductividadForTable(filteredData));
        } else {
          reject("Error: No data available.");
        }
      });
    });
  }

  // Helper method to check if two dates are the same
  private isSameDate(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getDate() === date2.getDate();
  }

  parseImproductividadForTable(improductividadData: Improductividad[]): any[] {
    this.ls.showLoader(this.constructor.name);

    // Step 1: Create a set of unique names
    const uniqueNames = new Set(improductividadData.map(item => item.nombre));

    // Step 2: For each unique name, create a set of unique semanas
    const nestedTableData = Array.from(uniqueNames).map(nombre => {
      const nombreData = improductividadData.filter(item => item.nombre === nombre);
      const uniqueSemanas = new Set(nombreData.map(item => item.semana));

      // Step 3: For each unique semana and nombre combination, filter the data and construct the semanaData
      const semanaData = Array.from(uniqueSemanas).map(semana => {
        const semanaNombreData = nombreData.filter(item => item.semana === semana);
        return {
          semana,
          data: semanaNombreData.map(item => ({
            site: item.site,
            supervisor: item.supervisor,
            fecha: item.fecha, 
            jornadaRegistrada: item.jornadaRegistrada,
            auxiliares: item.auxiliares,
            transcripcion: item.transcripcion,
            grabasIncorrectas: item.grabasIncorrectas,
            tiempoProductivo: item.tiempoProductivo instanceof Date ? item.tiempoProductivo.toLocaleTimeString() : item.tiempoProductivo,
            tiempoImproductivo: item.tiempoImproductivo,
            estado: item.estado
          }))
        };
      });

      return {
        nombre,
        dni: nombreData[0].dni, // Assuming dni is the same for each unique name
        semanaData
      };
    });

    this.ls.hideLoader(this.constructor.name);
    return nestedTableData;
  }

  parseImproductividad(rawData : any): Improductividad[] {
    this.ls.showLoader(this.constructor.name);
    const improductividad: Improductividad[] = [];

    rawData.forEach((item: any[]) => {
      const registro: Improductividad = {
        semana: item[0],
        dni: item[1],
        site: item[2],
        supervisor: item[3],
        nombre: item[4],
        motivoDeApercibimiento: item[5],
        fecha: this.parseExcelDate(item[6]), 
        jornadaRegistrada: this.parseExcelTime(item[7]),
        auxiliares: this.parseExcelTime(item[8]),
        transcripcion: this.parseExcelTime(item[9]),
        grabasIncorrectas: this.parseExcelTime(item[10]),
        tiempoProductivo: this.parseExcelTime(item[11]),
        tiempoImproductivo: this.parseTiempoImproductivo(item[12]),
        estado: item[13]
      };
      improductividad.push(registro);
    });
    this.ls.hideLoader(this.constructor.name);
    return improductividad;
  }

  private parseExcelDate(dateValue: any): Date {
    // Excel stores dates as the number of days since a specific epoch (usually December 30, 1899)
    // Assuming dateValue is the number of days since the epoch, we can create a Date object accordingly
    const millisecondsInDay = 24 * 60 * 60 * 1000;
    const epoch = new Date('1899-12-31').getTime();
    const dateInMilliseconds = epoch + dateValue * millisecondsInDay;
    return new Date(dateInMilliseconds);
  }
  
  private parseExcelTime(timeValue: any): string {
    // Convert time value to number of hours, minutes, and seconds
    const hours = Math.floor(timeValue * 24);
    const minutes = Math.floor((timeValue * 24 * 60) % 60);
    const seconds = Math.floor((timeValue * 24 * 60 * 60) % 60);

    // Format the time string
    const formattedTime = `${this.padZero(hours)}:${this.padZero(minutes)}:${this.padZero(seconds)}`;

    return formattedTime;
}

private padZero(num: number): string {
    // Add leading zero if the number is less than 10
    return num < 10 ? `0${num}` : `${num}`;
}
  
  private parseTiempoImproductivo(tiempoValue: any): string {
    // Try parsing the tiempoValue as a number
    const parsedValue = parseFloat(tiempoValue);

    // Check if parsing was successful and the parsed value is a number
    if (!isNaN(parsedValue)) {
        // Parsing successful, return the parsed value formatted as time string
        return this.parseExcelTime(parsedValue);
    } else {
        // Parsing unsuccessful or tiempoValue is not a number, return the original value
        return tiempoValue;
    }
}
  
}