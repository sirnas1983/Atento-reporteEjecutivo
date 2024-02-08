import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TardanzaService } from 'src/app/services/tardanza.service';

@Component({
  selector: 'app-tardanzas-table',
  templateUrl: './tardanzas-table.component.html',
  styleUrls: ['./tardanzas-table.component.css']
})
export class TardanzasTableComponent {

  nestedTableData!: any;
  filteredTardanzas!: any[];
  queryParams: any;
  expandedContainers :boolean = false;

  constructor(private tardanzaService: TardanzaService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.tardanzaService.tableData$.subscribe((data) => {
      this.nestedTableData = data.slice(1);
      this.filteredTardanzas = this.nestedTableData;
    });
    this.expandedContainers = false;
    this.route.queryParams.subscribe(params => {
      // Store the query parameters
      this.queryParams = params;
      // Call method to get data for specific DNI and fecha
      this.getDataForDniAndFecha();
    });
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
      const data = await this.tardanzaService.getImproductividadByDniAndFecha(dni, fecha);
      // Assign the data to nestedTableData and filteredReport
      this.nestedTableData = data;
      this.filteredTardanzas = data;
      this.expandedContainers = true;
    } catch (error) {
      // Handle any errors
      console.error('Error fetching data:', error);
    }
  }

  hasMedidaDisciplinaria(data: any[] | any): boolean {
    if (Array.isArray(data)) {
      return data.some(item => this.hasMedidaDisciplinaria(item));
    } else if (data && Array.isArray(data.data)) {
      return data.data.some((item:any) => item['Estado Break'] && item['Estado Break'].toLowerCase().trim() === 'medida disciplinaria');
    } else {
      return false;
    }
  }


  toggleCollapse(row: any) {
    row.collapsed = !row.collapsed;
  }

  getPercentageWidth(partialTime: string, totalTime: string): string {
    const partialSeconds = this.parseTimeToSeconds(partialTime);
    const totalSeconds = this.parseTimeToSeconds(totalTime);

    const percentage = (partialSeconds / totalSeconds) * 100;

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

  filterTardanzas(event: Event): void {
    const inputElement = event.target as HTMLInputElement; // Type assertion
    const searchTerm = inputElement.value.trim(); // Trim whitespace from the search term

    if (searchTerm === "") {
      this.filteredTardanzas = this.nestedTableData;
    } else {
      this.filteredTardanzas = this.nestedTableData.filter((tardanza:any) =>
        tardanza.nombre.toLowerCase().includes(searchTerm) ||
        tardanza.dni.toString().includes(searchTerm)
    );
    }
  }

}
