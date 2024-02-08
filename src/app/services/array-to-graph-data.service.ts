import { Injectable } from '@angular/core';
import { ExecutiveGraphData } from '../intefaces/ExecutiveGraphData';
import { ReportePersona } from '../intefaces/PersonasReporte';
import { LoaderService } from './loader.service';

@Injectable({
  providedIn: 'root'
})
export class ArrayToGraphDataService {

  constructor(private loaderService: LoaderService) { }

  public convertToGraphData(reportePersona: ReportePersona[]): ExecutiveGraphData {
    this.loaderService.showLoader(this.constructor.name);
    let porDesvios = reportePersona.reduce((total, obj) => total + obj.porDesvios * obj.weight, 0) / 100 ;
    this.loaderService.hideLoader(this.constructor.name);
    return {
      registros: reportePersona.length,
      porDesvios: Math.round(reportePersona.reduce((total, obj) => total + obj.porDesvios * obj.weight, 0)*100)/100,
      porDescansos: Math.round(reportePersona.reduce((total, obj) => total + obj.porDescansos * obj.weight, 0)*100)/100,
      porFaltas: Math.round(reportePersona.reduce((total, obj) => total + obj.porFaltas * obj.weight, 0)*100)/100,
      porImproductivos: Math.round(reportePersona.reduce((total, obj) => total + obj.porImproductivos * obj.weight, 0)*100)/100 ,
      porTMO: Math.round(reportePersona.reduce((total, obj) => total + obj.porTMO * obj.weight, 0)*100)/100,
      porTardanza: Math.round(reportePersona.reduce((total, obj) => total + obj.porTardanza * obj.weight, 0)*100)/100 
    }
  }
}
