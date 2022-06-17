import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  games: Game[] = [];
  name: string = "";

  constructor(private gameService:GameService) { }

  ngOnInit(): void {
  }

  Search() {
    if (this.name == "") {
    } else {
      this.games = this.games.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }

  getGames = () => {
    this.gameService.getGames().subscribe({
      next: (data: any) => {
        this.games = data;
      },
      error: () => {
        console.log("Unable to access game from API.");
      }
    });
  }


  addToCart(gameId: string){

  }

}
