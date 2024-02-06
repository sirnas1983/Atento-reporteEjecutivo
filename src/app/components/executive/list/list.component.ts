import { Component } from '@angular/core';
import { ExecutiveGraphData } from 'src/app/intefaces/ExecutiveGraphData';
import { ReportePersona } from 'src/app/intefaces/PersonasReporte';
import { ArrayToGraphDataService } from 'src/app/services/array-to-graph-data.service';
import { ExcelService } from 'src/app/services/excel-to-array.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-card1',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

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

  filteredReportePersonas : ReportePersona[] = [];

  reportePersonas : ReportePersona[] = []

  constructor(private excelService: ExcelService, 
    private arrayToGraphDataService: ArrayToGraphDataService,
    private personaService : PersonaService) { }

  ngOnInit(): void {
    this.excelService.processedData$.subscribe(data =>{
      data.pop();
      this.reportePersonas = data;
      this.filteredReportePersonas = this.reportePersonas;
      this.isReportePersonas = true;
    })
  }

  navigateToDetails(persona: any){
    console.log(persona);
    this.personaService.setPersona(persona);
  }

  filterEmployees(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Type assertion
    const searchTerm = inputElement.value.trim(); // Trim whitespace from the search term
  
    if (searchTerm === "") {
      console.log("ACA ESTOY");
      this.filteredReportePersonas = this.reportePersonas;
    } else {
      this.filteredReportePersonas = this.reportePersonas.filter(persona =>
        persona.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }
  

}
