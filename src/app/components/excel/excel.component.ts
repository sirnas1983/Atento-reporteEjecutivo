import { Component } from '@angular/core';
import { ReportePersona } from 'src/app/intefaces/PersonasReporte';
import { ArrayToGraphDataService } from 'src/app/services/array-to-graph-data.service';
import { ExcelService } from 'src/app/services/excel-to-array.service';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})


export class ExcelComponent {

  isLoading : boolean = false;

  constructor(private excelService: ExcelService, private arrayToGraph : ArrayToGraphDataService) { }

  listaPersonasConDetalle : ReportePersona[] = [];
  

  onFileChange(event: any) {
    const file: File = event.target.files[0];
    this.isLoading = true;
    if (file) {
      this.excelService.getResumenEjecutivoData(file, 'RESUMEN').subscribe(data =>{
        this.listaPersonasConDetalle = data;
        this.isLoading = false;
      })   
  }
}
}