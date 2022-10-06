import { Component, OnInit } from '@angular/core';
import { Hero } from '../../core/models/hero';
import { HeroService } from '../../core/services/hero.service';
import { MessageService } from '../../core/services/message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
 

  constructor(private heroService: HeroService , 
    private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes()
        .subscribe(heroes => {
          if(heroes != undefined){
            this.heroes = heroes;
            this.messageService.add("Fetch Hero Success")
          }
        });    
  }

  add(Name: string): void {
    Name = Name.trim();
    if (!Name) { return; }
    this.heroService.addHero({ Name } as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });

  }
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero.Id).subscribe( x=> {
      if(x !== undefined){
        this.messageService.add(`Delete Hero Success.ID ${hero.Name}`)
      }
    });
  }
}
