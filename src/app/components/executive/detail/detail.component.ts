import { Component, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { ReportePersona } from 'src/app/intefaces/PersonasReporte';
import { LoaderService } from 'src/app/services/loader.service';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements AfterViewInit {

  @ViewChild('container') container!: ElementRef<HTMLElement>; 

  radius: number = 50; // Initial radius value set to 50 pixels
  isPersona: boolean = false;
  persona!: ReportePersona | undefined;
  showContent: boolean = false; // Initially show the content

  constructor(private personaService: PersonaService, private loaderService: LoaderService) { }

  ngOnInit(): void {
    this.personaService.persona$.subscribe(persona => {
      if (persona) {
        this.persona = persona;
        this.isPersona = true;
        this.showContent = false;
        this.calculateRadius(); // Recalculate radius after data is loaded
      }
    });
  }

  ngAfterViewInit(): void {
    this.calculateRadius(); // Calculate radius after the view has been initialized
  }

  @HostListener('window:resize')
  onResize() {
    this.calculateRadius(); // Recalculate radius on window resize
  }

  calculateRadius() {
    // Ensure that persona and container are defined before calculating radius
    if (this.persona && this.container) {
      const width = this.container.nativeElement.offsetWidth;
      // Ensure the width is positive
      if (width > 0) {
        // Adjust radius to fit one-third of the view
        this.radius = Math.round(width / 6 * .9);
      } else {
        // Set a default positive radius value
        this.radius = 50; // You can adjust this value as needed
      }
    }
  }

  getColorFromPercentage(percentage: number = 0): string {
    const red = Math.round(255 * percentage / 100);
    const green = Math.round(255 * (100 - percentage) / 100);
    const blue = 0;
    return this.rgbToHex(red, green, blue);
  }

  // Helper function to convert RGB to HEX
  rgbToHex(r: number, g: number, b: number): string {
    return '#' + this.componentToHex(r) + this.componentToHex(g) + this.componentToHex(b);
  }

  componentToHex(c: number): string {
    const hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
  }

  getColorForInnerCircle(percentage: number = 0): string {
    const outerColor = this.getColorFromPercentage(percentage); // Get the color for the outer circle
    const innerBrightness = 0.8; // Adjust brightness for the inner circle color (e.g., 80%)
    const innerColor = this.adjustBrightness(outerColor, innerBrightness);
    return innerColor;
  }

  // Helper function to adjust brightness of a color
  adjustBrightness(color: string, factor: number): string {
    // Parse the color string into RGB components
    const rgb = this.hexToRgb(color);

    // Adjust each RGB component by the specified factor
    const adjustedRgb = {
      r: Math.round(rgb.r * factor),
      g: Math.round(rgb.g * factor),
      b: Math.round(rgb.b * factor)
    };

    // Convert the adjusted RGB components back to HEX
    return this.rgbToHex(adjustedRgb.r, adjustedRgb.g, adjustedRgb.b);
  }

  hexToRgb(hex: string): { r: number, g: number, b: number } {
    // Remove '#' if present
    hex = hex.replace('#', '');

    // Parse hexadecimal components
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return { r, g, b };
  }

  toggleContent() {
    this.showContent = !this.showContent;
  }
}
