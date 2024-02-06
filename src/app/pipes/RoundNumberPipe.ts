import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundNumber'
})

export class RoundNumberPipe implements PipeTransform {
  transform(value: number): number {
    return Math.round(value); // Round the value to the nearest integer
  }
}