import { Component } from '@angular/core';
import { ExecutiveGraphData } from 'src/app/intefaces/ExecutiveGraphData';
import { ArrayToGraphDataService } from 'src/app/services/array-to-graph-data.service';
import { ExcelService } from 'src/app/services/excel-to-array.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {

  chartData: ExecutiveGraphData = {
    registros:0,
    porDescansos:0,
    porDesvios :0,
    porFaltas:0,
    porImproductivos:0,
    porTMO:0,
    porTardanza:0
  };

  constructor(private excelService: ExcelService, private arrayToGraphDataService: ArrayToGraphDataService) { }

  ngOnInit(): void {
    this.excelService.processedData$.subscribe(data =>{
      this.chartData = this.arrayToGraphDataService.convertToGraphData(data);
    })
  }
}
