import { Component, OnInit } from '@angular/core';
import { BasePatagoniaService } from 'src/app/services/base-patagonia.service';
import { LoaderService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-patagonia-table',
  templateUrl: './patagonia-table.component.html',
  styleUrls: ['./patagonia-table.component.css']
})
export class PatagoniaTableComponent implements OnInit {

  nestedTableData!: any;
  filteredReport!: any[];
  queryParams: any;
  expandedContainers: boolean = false;

  constructor(private patagoniaService: BasePatagoniaService, private ls: LoaderService) {}

  expandedRow: any; // Store the currently expanded row

  toggleDetails(data: any) {
    // If the clicked row is already expanded, collapse it
    data.expanded = !data.expanded;

    if (this.expandedRow === data) {
      this.expandedRow = null;
    } else {
      // Otherwise, expand the clicked row and collapse the previously expanded row
      this.expandedRow = data;
    }
  }

  ngOnInit(): void {
    this.patagoniaService.rawData$.subscribe((data) => {
      this.ls.showLoader(this.constructor.name);
      this.nestedTableData = data.slice(1);
      this.filteredReport = this.nestedTableData;
      this.ls.hideLoader(this.constructor.name);
    });
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
    console.log("buscando");
    const inputElement = event.target as HTMLInputElement; // Type assertion
    const searchText = inputElement.value.trim(); // Trim whitespace from the search term

    if (searchText === "") {
      this.filteredReport = this.nestedTableData;
    } else {
    this.filteredReport = this.nestedTableData.filter((item: any) =>
      String(item['dni']).toLowerCase().includes(searchText) ||
      item['agente'].toLowerCase().includes(searchText) ||
      item['asesor'].toLowerCase().includes(searchText)
    );
    }}
}
