import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasePatagoniaService } from 'src/app/services/base-patagonia.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-patagonia-table',
  templateUrl: './patagonia-table.component.html',
  styleUrls: ['./patagonia-table.component.css']
})
export class PatagoniaTableComponent {


  nestedTableData!: any;
  filteredReport!: any[];
  queryParams: any;
  expandedContainers :boolean = false;

  constructor(private patagoniaService: BasePatagoniaService, private ls : LoaderService ) {

  }

  ngOnInit(): void {
    
    this.patagoniaService.rawData$.subscribe((data) => {
      this.ls.showLoader(this.constructor.name);
      this.nestedTableData = data.slice(1);
      this.filteredReport = this.nestedTableData;
      this.ls.hideLoader(this.constructor.name);
    });
    // Subscribe to query parameters
    this.expandedContainers = false;
  }

  toggleCollapse(row: any) {
    row.collapsed = !row.collapsed;
  }

  parseTimeToSeconds(time: string): number {
    const [hours, minutes, seconds] = time.split(':').map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }


  getSecondsFromTimeString(timeString: string): number {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return (hours * 3600) + (minutes * 60) + seconds;
  }

  filterEmployees(event: any) {
    const searchText = event.target.value.toLowerCase().trim();
    this.filteredReport = this.nestedTableData.filter((item: any) =>
      item['dni'].toLowerCase().includes(searchText) ||
      item['agente'].toLowerCase().includes(searchText) ||
      item['asesor'].toLowerCase().includes(searchText)
    );
  }
}

