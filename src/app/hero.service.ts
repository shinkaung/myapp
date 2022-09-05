import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
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
  private log(message: string): void {
    this.messageService.add(`HeroService: ${message}`);
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    }; }

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