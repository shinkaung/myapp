import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  createDb() {
    const heroes = [
      { Id: 12, Name: 'Dr. Nice' },
      { Id: 13, Name: 'Bombasto' },
      { Id: 14, Name: 'Celeritas' },
      { Id: 15, Name: 'Magneta' },
      { Id: 16, Name: 'RubberMan' },
      { Id: 17, Name: 'Dynama' },
      { Id: 18, Name: 'Dr. IQ' },
      { Id: 19, Name: 'Magma' },
      { Id: 20, Name: 'Tornado' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.Id)) + 1 : 11;
  }
}
