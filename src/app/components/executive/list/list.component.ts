import { Component } from '@angular/core';
import { ResumenService } from 'src/app/services/resumen.service';
import { ReportePersona } from 'src/app/intefaces/ReportePersona';
import { PersonaService } from 'src/app/services/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent {

  filteredReportePersonas: any[] = [];
  reportePersonas: any[] = [];
  isReportePersonas: boolean = false;
  persona!: ReportePersona;
  isPersona = false;
  innerTableVisible: boolean = false;


  constructor(
    private router: Router,
    private resumenService: ResumenService,
    private personaService: PersonaService
  ) {
  }

  ngOnInit(): void {
    this.resumenService.processedData$.subscribe((data: any) => {
      this.reportePersonas = data; // Assign data to reportePersonas
      this.filteredReportePersonas = data;
      console.log(data);
      this.isReportePersonas = true;
    });
  }

  getColor(percentage: number): string {
    let red: number, green: number, blue: number;

    if (percentage >= 50) {
      // Interpolate between red and yellow (quadratic interpolation)
      red = 255;
      green = Math.round(255 - Math.pow((percentage / 50), 2) * 255);
    } else {
      // Interpolate between yellow and green (quadratic interpolation)
      red = Math.round(255 - Math.pow(((percentage - 50) / 50), 2) * 255);
      green = 255;
    }

    blue = 0;

    // Return the RGBA value as a CSS color string with opacity 0.75
    return `rgba(${red}, ${green}, ${blue}, 0.75)`;
  }



  navigateToDetails(persona: ReportePersona) {
    this.persona = persona;
    this.isPersona = true;
    this.personaService.setPersona(persona);
    this.router.navigate(['/personas/detalle/', String(persona.nombre.split(" ")[0]).toLowerCase()]);
  }

  filterEmployees(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const searchTerm = inputElement.value.trim();
    if (searchTerm === "") {
      this.filteredReportePersonas = this.reportePersonas; // Filter filteredReportePersonas instead
    } else {
      this.filteredReportePersonas = this.reportePersonas.filter(persona =>
        persona.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        persona.dni.toString().includes(searchTerm)
      );
    }
  }

  toggleInnerTable(element: any) {
    // Close all inner tables except the clicked one
    this.filteredReportePersonas.forEach(item => {
      if (item !== element) {
        item.collapsed = false;
      }
    });

    // Toggle the clicked element
    element.collapsed = !element.collapsed;
  }

  openSpecificReport(registro: any, persona: any, reportType: string) {

    if (reportType === "TARDANZAS") {
      this.router.navigate(['/tardanzas'], { queryParams: { dni: persona.dni, fecha: registro.Fecha } });
    } else if (reportType === "TMO") {
      this.router.navigate(['/patagonia'], { queryParams: { dni: persona.dni, fecha: registro.Fecha } });
    } else if (reportType === "PRODUCTIVIDAD") {
      this.router.navigate(['/improductivos'], { queryParams: { dni: persona.dni, fecha: registro.Fecha } });
    }
  }

}
