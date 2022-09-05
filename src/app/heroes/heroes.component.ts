import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { MessageService } from '../message.service';
// import { MessageService } from "/Users/shinkaung/training2022/myapp/src/app/message.service";

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];
 

  constructor(private heroService: HeroService , private messageService: MessageService) { }

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
