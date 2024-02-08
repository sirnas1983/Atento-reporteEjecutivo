import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ChartData } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ExecutiveGraphData } from 'src/app/intefaces/ExecutiveGraphData';
import { ArrayToGraphDataService } from 'src/app/services/array-to-graph-data.service';
import { ResumenService } from 'src/app/services/resumen.service';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import { ChartOptions, ChartType } from "chart.js";
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  sortedData: any[] = [];
  chartData: ExecutiveGraphData = {  
    registros: 0,
    porDescansos: 0,
    porDesvios: 0,
    porFaltas: 0,
    porImproductivos: 0,
    porTMO: 0,
    porTardanza: 0
  };

  public barChartOptions: ChartOptions = {
    responsive: true,
    aspectRatio: 0,
    scales: { 
      x: {
       weight:1.1
      },
      y: {
        type: 'linear',
        
      }
    },
    
    plugins: {
      legend :{
        display:false
      },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: 'black',
        font: { weight: 'bold', size: 20 },
        formatter: (value: number) => {
          return value + '%';
        }
      }
  }, 
};
  
  
  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: [
      {
        data: [],
        backgroundColor: [],
        hoverBackgroundColor : []
      },
    ]
  };

  @HostListener('window:resize')
  onResize() {
    this.chart?.update();
  }
  
  ngOnInit(): void {
    this.resumenService.processedData$.subscribe(data => {
      if (data) {
        this.chartData = this.arrayToGraphDataService.convertToGraphData(data);
        this.sortedData = this.sortChartData(this.chartData);
        this.barChartData.datasets[0].data = this.sortedData.map(data => data[1]);
        this.barChartData.labels = this.sortedData.map(data => data[0].slice(3));
        this.assignBarColors();
        this.chart?.update();
      }
    });
  }
  
  
  private assignBarColors(): void {
    const colorScale = [
      { value: 0, color: 'green' },
      { value: 10, color: 'green' },
      { value: 45, color: 'yellow' },
      { value: 70, color: 'orange' },
      { value: 90, color: 'red' }
    ];

    this.barChartData.datasets[0].backgroundColor = this.sortedData.map(data => {
      const value = data[1];
      const colorObj = colorScale.find(color => value <= color.value);
      return colorObj ? colorObj.color : 'blue';
    });

    this.barChartData.datasets[0].hoverBackgroundColor = this.barChartData.datasets[0].backgroundColor;
  }

  @ViewChild(BaseChartDirective) chart!: BaseChartDirective;
  
  public chartType: ChartType = 'bar';

  constructor(private resumenService: ResumenService, private arrayToGraphDataService: ArrayToGraphDataService, private loaderService : LoaderService) { }

  private sortChartData(data: ExecutiveGraphData): any[] {
    let sortedData : any[] = [];
    for (let obj of Object.entries(data)){
      if(obj[0] !== "registros" && obj[0] !== "porDesvios"){
        sortedData.push(obj);
      }
    }
    
    return sortedData;
  }
}
