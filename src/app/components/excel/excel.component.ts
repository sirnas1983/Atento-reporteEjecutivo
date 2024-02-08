import { Component } from '@angular/core';
import { ReportePersona } from 'src/app/intefaces/PersonasReporte';
import { ExcelService } from 'src/app/services/excel.service';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})


export class ExcelComponent {

  constructor(private excelService: ExcelService){}

  listaPersonasConDetalle: ReportePersona[] = [];

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.excelService.loadData(file);
    }
  }
}