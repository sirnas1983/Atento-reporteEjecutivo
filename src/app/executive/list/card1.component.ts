import { Component } from '@angular/core';
import { ExecutiveGraphData } from 'src/app/intefaces/ExecutiveGraphData';
import { ReportePersona } from 'src/app/intefaces/PersonasReporte';
import { ArrayToGraphDataService } from 'src/app/services/array-to-graph-data.service';
import { ExcelService } from 'src/app/services/excel-to-array.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-card1',
  templateUrl: './card1.component.html',
  styleUrls: ['./card1.component.css']
})
export class Card1Component {

  chartData: ExecutiveGraphData = {
    registros:0,
    porDescansos:0,
    porDesvios :0,
    porFaltas:0,
    porImproductivos:0,
    porTMO:0,
    porTardanza:0
  };

  isReportePersonas : boolean = false;

  reportePersonas : ReportePersona[] = []

  constructor(private excelService: ExcelService, 
    private arrayToGraphDataService: ArrayToGraphDataService,
    private personaService : PersonaService) { }

  ngOnInit(): void {
    this.excelService.processedData$.subscribe(data =>{
      this.reportePersonas = data;
      this.isReportePersonas = true;
    })
  }

  navigateToDetails(persona: any){
    console.log(persona);
    this.personaService.setPersona(persona);
  }
}
