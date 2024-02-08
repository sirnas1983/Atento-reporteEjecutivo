import { Component } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'atento';

  isLoading: boolean = false;

  constructor(private loaderService: LoaderService) {
    this.loaderService.isLoading$.subscribe(data => {
      this.isLoading = data;
    });
  }

}
