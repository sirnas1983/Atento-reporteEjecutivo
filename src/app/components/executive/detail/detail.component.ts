import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReportePersona } from 'src/app/intefaces/ReportePersona';
import { PersonaService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  @ViewChild('container') container!: ElementRef<HTMLElement>; 

  radius: number = 50; // Initial radius value set to 50 pixels
  isPersona: boolean = false;
  persona!: ReportePersona | undefined;
  showContent: boolean = false; // Initially show the content

  constructor(private personaService: PersonaService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.personaService.persona$.subscribe(persona => {
      if (persona) {
        this.persona = persona;
        this.isPersona = true;
        this.showContent = false;
      }
    });
  }


  toggleContent() {
    this.showContent = !this.showContent;
  }
}
