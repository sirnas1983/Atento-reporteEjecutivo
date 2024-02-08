import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { PersonaPatagonia } from 'src/app/intefaces/PersonaPatagonia';
import { BasePatagoniaService } from 'src/app/services/base-patagonia.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-operativo-table',
  templateUrl: './operativo-table.component.html',
  styleUrls: ['./operativo-table.component.css']
})
export class OperativoTableComponent implements OnInit, OnDestroy {

  filteredData!: PersonaPatagonia;
  queryParamsSubscription: Subscription | undefined;
  showNestedTable: boolean = false; // Flag to control visibility of nested table
  detailedAudioData: any; // Detailed audio data to display in nested table
  rawDataSubscription: Subscription | undefined;
  selectedIndex: number = -1; // Variable to store the index of the clicked row


  constructor(private basePatagoniaService: BasePatagoniaService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(params => {
      const dni = params['dni'];
      if (dni) {
        this.basePatagoniaService.parseToPersonaData(dni);
      }
    });

    this.basePatagoniaService.filteredDataSubject$.subscribe(data => {
      this.filteredData = data;
    });
  }

  ngOnDestroy(): void {
    if (this.queryParamsSubscription) {
      this.queryParamsSubscription.unsubscribe();
    }
  }

  exportToExcel(): void {
    if (!this.filteredData || !this.filteredData.registros.length) {
      console.error('No data to export');
      return;
    }

    const data: any[] = [];

    // Add nombre and dni in the first two rows
    data.push(['Nombre: ' + this.filteredData.nombre]);
    data.push(['DNI: ' + this.filteredData.dni]);

    // Add a blank row for separation
    data.push([]);

    // Add headers
    data.push([
      'Nombre',
      'ID Audio',
      'Duración Audio',
      'Objetivo x 3',
      'Objetivo x 4',
      'Fecha Transcripción',
      'Hora Transcripción',
      'Duración Transcripción',
      'Desvío x 3',
      'Desvío x 4'
    ]);

    // Add rows
    this.filteredData.registros.forEach(registro => {
      data.push([
        registro.nombre,
        registro.idAudio,
        registro.duracionAudio,
        registro.objetivo3,
        registro.objetivo4,
        registro.fechaTranscripcion,
        registro.horaTranscripcion,
        registro.duracionTranscripcion,
        registro.desvio3,
        registro.desvio4
      ]);
    });

    // Create a new workbook
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();
    const worksheet: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte TMO');

    // Export the workbook to Excel file
    XLSX.writeFile(workbook, 'Reporte - '+String(this.filteredData.dni)+'.xlsx');
  }

  toggleNestedTable(idAudio: string, index: number): void {
    if (this.selectedIndex === index && this.showNestedTable) {
      this.showNestedTable = false;
      this.selectedIndex = -1;
      return;
    }
    
    // Otherwise, expand the clicked row and collapse other rows
    this.showNestedTable = true;
    this.selectedIndex = index;
    if (this.showNestedTable) {
      // Fetch detailed audio data based on idAudio from rawData$ observable
      this.rawDataSubscription = this.basePatagoniaService.rawData$.subscribe(data => {
        const audioData = data.find((item: any) => String(Number(item['id grabacion'])) === String(Number(idAudio)));
        if (audioData) {
          // Update detailed audio data for nested table
          this.detailedAudioData = {
            transcripcion : audioData['transcripcion']};
        }
      });
    } else {
      this.rawDataSubscription?.unsubscribe(); // Unsubscribe to prevent memory leaks
    }
  }
}
