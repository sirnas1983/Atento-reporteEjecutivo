import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Improductividad } from 'src/app/intefaces/Improductividad';
import { ExcelService } from 'src/app/services/excel.service';
import { ImproductividadService } from 'src/app/services/improductividad.service';

@Component({
  selector: 'app-tmo-table',
  templateUrl: './tmo-table.component.html',
  styleUrls: ['./tmo-table.component.css']
})
export class TmoTableComponent {

  nestedTableData!: any;
  filteredReport!: any[];

  constructor(private improductividadService: ImproductividadService) {
  }

  ngOnInit(): void {
    this.improductividadService.tableData$.subscribe((data) => {
      this.nestedTableData = data.slice(1);
      this.filteredReport = this.nestedTableData;
      console.log(data);
    });
  }

  toggleCollapse(row: any) {
    row.collapsed = !row.collapsed;
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
        persona.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  }

}
