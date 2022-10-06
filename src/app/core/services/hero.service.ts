import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../models/hero';
import { MessageService } from './message.service';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor( 
    private apiservice: ApiService,
    private messageService: MessageService
    ) { }

    getHeroes(): Observable<Hero[]> {
      return this.apiservice.get("/Heroess");
    }
/** GET hero by id. Will 404 if id not found */
getHero(Id: number): Observable<Hero> {
  return this.apiservice.get(`/Heroess/${Id}`);
}
    /** PUT: update the hero on the server */
updateHero(hero: Hero): Observable<any> {
  return this.apiservice.putJson(`/Heroess/${hero.Id}`, hero);
}

/** POST: add a new hero to the server */
addHero(hero: Hero): Observable<Hero> {
  return this.apiservice.postJson("/Heroess", hero);
}
/** DELETE: delete the hero from the server */
deleteHero(Id: number): Observable<Hero> {
  return this.apiservice.delete(`/Heroess/${Id}`);
}
/* GET heroes whose name contains search term */
searchHeroes(term: string): Observable<Hero[]> {
  if (!term.trim()) {
    // if not search term, return empty hero array.
    return of([]);
  }
  return this.apiservice.postJson("/Heroess/search",{"term":term});
}
}