import { Injectable } from '@angular/core';
import { ExecutiveGraphData } from '../intefaces/ExecutiveGraphData';
import { ReportePersona } from '../intefaces/PersonasReporte';

@Injectable({
  providedIn: 'root'
})
export class ArrayToGraphDataService {

  constructor() { }

  public convertToGraphData(reportePersona : ReportePersona[]) : ExecutiveGraphData{
    let porDesvios = reportePersona.reduce((total, obj) => total + obj.porDesvios , 0)/reportePersona.length/100;
    return {
      registros : reportePersona.length,
      porDesvios : Math.round(reportePersona.reduce((total, obj) => total + obj.porDesvios , 0)/reportePersona.length),
      porDescansos : reportePersona.reduce((total, obj) => total + obj.porDescansos , 0)/reportePersona.length/porDesvios,
      porFaltas :  reportePersona.reduce((total, obj) => total + obj.porFaltas , 0)/reportePersona.length/porDesvios,
      porImproductivos : reportePersona.reduce((total, obj) => total + obj.porImproductivos , 0)/reportePersona.length/porDesvios,
      porTMO : reportePersona.reduce((total, obj) => total + obj.porTMO , 0)/reportePersona.length/porDesvios,
      porTardanza : reportePersona.reduce((total, obj) => total + obj.porTardanza , 0)/reportePersona.length/porDesvios
      }

  }

}
