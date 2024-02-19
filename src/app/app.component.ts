import { Component, ElementRef, Renderer2 } from '@angular/core';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'atento';
  sidebarWidth: number = 0;
  isLoading: boolean = false;

  constructor(private loaderService: LoaderService, private renderer: Renderer2, private elementRef: ElementRef) {
    this.loaderService.isLoading$.subscribe(data => {
      this.isLoading = data;
    });
  }

  ngOnInit(): void {
    this.sidebarWidth = this.elementRef.nativeElement.querySelector('#sidebar').offsetWidth;
    this.checkScreenWidth();
    window.addEventListener('resize', () => this.checkScreenWidth());
  }

  checkScreenWidth(): void {
    if (window.innerWidth < 768) {
      this.showWarningMessage();
    } else {
      this.removeWarningMessage();
    }
  }

  showWarningMessage(): void {
    const warningMessage = this.renderer.createElement('div');
    this.renderer.addClass(warningMessage, 'warning-message');
    this.renderer.appendChild(warningMessage, this.renderer.createText('La aplicacion esta optimizada para pantallas de mas de 768px de ancho'));
    this.renderer.appendChild(document.body, warningMessage);
  }

  removeWarningMessage(): void {
    const warningMessage = document.querySelector('.warning-message');
    if (warningMessage) {
      this.renderer.removeChild(document.body, warningMessage);
    }
  }
}
