import { Component } from '@angular/core';
import { ExecutiveGraphData } from 'src/app/intefaces/ExecutiveGraphData';
import { ReportePersona } from 'src/app/intefaces/PersonasReporte';
import { ResumenService } from 'src/app/services/resumen.service';
import { PersonaService } from 'src/app/services/persona.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  chartData: ExecutiveGraphData = {
    registros: 0,
    porDescansos: 0,
    porDesvios: 0,
    porFaltas: 0,
    porImproductivos: 0,
    porTMO: 0,
    porTardanza: 0
  };

  isReportePersonas: boolean = false;

  filteredReportePersonas: ReportePersona[] = [];

  reportePersonas: ReportePersona[] = []

  constructor(private resumenService: ResumenService,
    private personaService: PersonaService,
    private loaderService: LoaderService) { }

  ngOnInit(): void {

    this.resumenService.processedData$.subscribe(data => {
      this.reportePersonas = data;
      this.personaService.setPersona(this.reportePersonas[0]);
      this.filteredReportePersonas = this.reportePersonas;
      this.isReportePersonas = true;
    });
  }


  navigateToDetails(persona: any) {
    this.personaService.setPersona(persona);
  }

  filterEmployees(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Type assertion
    const searchTerm = inputElement.value.trim(); // Trim whitespace from the search term

    if (searchTerm === "") {
      this.filteredReportePersonas = this.reportePersonas;
    } else {
      this.filteredReportePersonas = this.reportePersonas.filter(persona =>
        persona.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }


}
