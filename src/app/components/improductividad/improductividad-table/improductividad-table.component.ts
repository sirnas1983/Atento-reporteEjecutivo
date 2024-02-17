import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ImproductividadService } from 'src/app/services/improductividad.service';

@Component({
  selector: 'app-improductividad-table',
  templateUrl: './improductividad-table.component.html',
  styleUrls: ['./improductividad-table.component.css']
})
export class ImproductividadTableComponent {

  nestedTableData!: any;
  filteredReport!: any[];
  queryParams: any;
  expandedContainers :boolean = false;

  constructor(private improductividadService: ImproductividadService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.improductividadService.tableData$.subscribe((data) => {
      this.nestedTableData = data.slice(1);
      this.filteredReport = this.nestedTableData;
<<<<<<< HEAD:src/app/components/improductividad/improductividad-table/improductividad-table.component.ts
    });
    // Subscribe to query parameters
    this.expandedContainers = false;
    this.route.queryParams.subscribe(params => {
      // Store the query parameters
      this.queryParams = params;
      // Call method to get data for specific DNI and fecha
      this.getDataForDniAndFecha();
=======
>>>>>>> a06545c4f668470f856f8efd3dcf9a6eecf9ecd7:src/app/components/tmo/tmo-table/tmo-table.component.ts
    });
  }

  toggleCollapse(row: any) {
    row.collapsed = !row.collapsed;
  }

  async getDataForDniAndFecha(): Promise<void> {
    if (!this.queryParams || !this.queryParams.dni || !this.queryParams.fecha) {
      console.error('Missing query parameters (dni, fecha)');
      return;
    }

    const dni = String(this.queryParams.dni);
    const fecha =this.queryParams.fecha;
    try {
      // Call the service method to get data
      const data = await this.improductividadService.getImproductividadByDniAndFecha(dni, fecha);
      // Assign the data to nestedTableData and filteredReport
      this.nestedTableData = data;
      this.filteredReport = data;
      this.expandedContainers = true;
    } catch (error) {
      // Handle any errors
      console.error('Error fetching data:', error);
    }
  }

  getPercentageWidth(partialTime: string, totalTime: string): string {
    // Parse partial and total time strings to seconds
    const partialSeconds = this.parseTimeToSeconds(partialTime);
    const totalSeconds = this.parseTimeToSeconds(totalTime);

    // Calculate percentage
    const percentage = (partialSeconds / totalSeconds) * 100;

    // If percentage is greater than 100%, set it to 100%
    const adjustedPercentage = Math.min(percentage, 100);

    return `${adjustedPercentage}%`;
  }

  getColor(estado: string): string {
    if (estado.toLocaleLowerCase() === "medida disciplinaria") {
      return '#cf3516'; // Red color
    } else if (estado.toLocaleLowerCase() !== "continua seguimiento") {
      return 'grey'; // Blue color
    }
    return '#028a4a';
  }



  parseTimeToSeconds(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }


  getSecondsFromTimeString(timeString: string): number {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
  }

  filterEmployees(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Type assertion
    const searchTerm = inputElement.value.trim(); // Trim whitespace from the search term

    if (searchTerm === "") {
      this.filteredReport = this.nestedTableData;
    } else {
      this.filteredReport = this.nestedTableData.filter((persona: any) =>
        persona.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        persona.dni.toString().includes(searchTerm)
      );
    }
  }

  hasMedidaDisciplinaria(data: any[] | any): boolean {
    if (Array.isArray(data)) {
      return data.some(item => this.hasMedidaDisciplinaria(item));
    } else if (data && Array.isArray(data.data)) {
      return data.data.some((item: any) => item.estado && item.estado.toLowerCase().trim() === 'medida disciplinaria');
    } else {
      return false;
    }
  }

}
