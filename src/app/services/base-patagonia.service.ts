import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ExcelService } from './excel.service';
import { LoaderService } from './loader.service';
import { BasePatagonia } from '../intefaces/BasePatagonia';
import { PersonaPatagonia } from '../intefaces/PersonaPatagonia';
import { ReportePatagonia } from '../intefaces/ReportePatagonia';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BasePatagoniaService {

  rawData!: any;
  parsedData!: any;

  private rawDataSubject: BehaviorSubject<BasePatagonia[]> = new BehaviorSubject<BasePatagonia[]>([]);
  public readonly rawData$ = this.rawDataSubject.asObservable();

  private filteredDataSubject: BehaviorSubject<PersonaPatagonia> = new BehaviorSubject<PersonaPatagonia>({
    dni: '',
    nombre: '',
    registros: []
  });
  public readonly filteredDataSubject$ = this.filteredDataSubject.asObservable();

  constructor(private ls: LoaderService, private excelService: ExcelService) {
    this.excelService.processedData$.subscribe(data => {
      const sheetName = 'basePatagonia'; // Updated sheet name
      const sheetData = data ? data[sheetName as keyof typeof data] : undefined;
      if (sheetData) {
        this.rawData = this.parseControlIncorrectas(sheetData);
        this.rawDataSubject.next(this.rawData); // Emit the updated rawData
      }
    });
  }

  parseControlIncorrectas(rawData: any): BasePatagonia[] {
    this.ls.showLoader(this.constructor.name);
    const incorrectas: BasePatagonia[] = [];
    rawData.forEach((item: any[]) => {
      const registro: BasePatagonia = {
        'ani': item[0],
        'id grabacion': item[1],
        'agente': item[2],
        'extension': item[3],
        'fecha grabacion': (item[4]),
        'hora grabacion': item[5],
        'duracion grabacion': item[6],
        'servicio': item[7],
        'url': item[8],
        'servidor': item[9],
        'tipo de resultado': item[10],
        'resultado': item[11],
        'transcripcion': item[12],
        'duracion transcripcion (minutos)': item[13],
        'fecha/hora creacion primer texto': (item[14]),
        'usuario creacion primer texto': item[15],
        'fecha/hora primer texto usuario resultado': (item[16]),
        'fecha/hora creacion ultimo texto': (item[17]),
        'fecha creacion resultado': (item[18]),
        'usuario creacion resultado': item[19],
        'user': item[20],
        'site': item[21],
        'asesor': item[22],
        'dni': item[23],
        'login': item[24],
        'fechau': (item[25]),
        'duracion grabacion redondeada (en minutos)': item[26],
        'objetivo tmo (en minutos)': item[27],
        'desvio tmo * 3 (en minutos)': item[28],
        'desvio tmo * 4 (en minutos)': item[29],
        'selecciono tmo': item[30],
        'supervisor': item[31],
        'horas gap': item[32],
        'hora guardado de ficha': item[33],
        'tiempo de transcripcion en hs': item[34],
        'controlar': item[35],
        'tiempo de llamada': item[36],
        '1er control': item[37],
        '2do control': item[38],
        '3er control': item[39],
        '4to control': item[40],
        'cuento trans. correctas': item[41],
        'cuento trans. incorrectas': item[42],
        'tiempo en minutos': item[43],
        'objellamada': item[44],
        'mes': item[45],
        'semana': item[46]
      };
      incorrectas.push(registro);
    });
    this.ls.hideLoader(this.constructor.name);
    return incorrectas;
  }

  parseToPersonaData(dniToParse: string): void {
    this.rawData$.subscribe(data => {
      const personaItems = data.filter((item: any) => String(Number(item.dni)) === String(Number(dniToParse)));
      if (personaItems.length === 0) {
        this.filteredDataSubject.next({
          dni: '',
          nombre: '',
          registros: []
        }); // DNI not found
        return;
      }
      const personaData: PersonaPatagonia = {
        dni: dniToParse,
        nombre: '',
        registros: []
      };
      personaData.nombre = personaItems[0].asesor;
      personaItems.forEach((item: any) => {
        personaData.registros.push(new ReportePatagonia(
          item.dni,
          item['id grabacion'],
          item['duracion grabacion'],
          item['duracion transcripcion (minutos)'],
          item['fecha/hora primer texto usuario resultado'],
          item['fecha/hora primer texto usuario resultado'],
          item['usuario creacion resultado']
        ));
      });
      this.filteredDataSubject.next(personaData);
    });
  }
}
