import { Component } from '@angular/core';
import { ExecutiveGraphData } from 'src/app/intefaces/ExecutiveGraphData';
import { ArrayToGraphDataService } from 'src/app/services/array-to-graph-data.service';
import { ResumenService } from 'src/app/services/resumen.service';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.css']
})
export class ContainerComponent {

  chartData: ExecutiveGraphData = {
    registros: 0,
    porDescansos: 0,
    porDesvios: 0,
    porFaltas: 0,
    porImproductivos: 0,
    porTMO: 0,
    porTardanza: 0
  };

  constructor(private resumenService: ResumenService,
    private arrayToGraphDataService: ArrayToGraphDataService,
    ) { }

  ngOnInit(): void {
    this.resumenService.processedData$.subscribe(data => {
      if (data) {
        
        this.chartData = this.arrayToGraphDataService.convertToGraphData(data);
      }
    });
  }

}
