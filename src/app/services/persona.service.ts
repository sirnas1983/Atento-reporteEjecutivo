import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private personaSubject = new BehaviorSubject<any>(null);
  persona$ = this.personaSubject.asObservable();

  setPersona(persona: any): void {
    this.personaSubject.next(persona);
  }

  getPersona(): any {
    return this.personaSubject.value;
  }
}
