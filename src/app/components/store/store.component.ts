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

  favs: number[] = [];
  favGames: Game[] = [];

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

  getFavorite = (id: number) => {
    this.gameService.getFavorite(id).subscribe({
      next: (data: Game) => {
        this.favGames.push(data);
      },
      error: () => {
        console.log("Unable to access favorites.");
      }
    });
  }

  addGameToFavorite = (gameId: string) => {
    this.gameService.addGameToFavorite(gameId).subscribe({
      next: () => {
        console.log("Added favorite: " + gameId);
      },
      error: () => {
        console.log("Unable to access favorites.");
      }
    });
  }

  getMyFavoriteGames = () => {
    this.gameService.getMyFavoriteGames().subscribe({
      next: (data: number[]) => {
        this.favs = data;
        for (let favId of data) {
          this.getFavorite(favId);
        }
        console.log("Favorites retrieved");
      },
      error: () => {
        console.log("Unable to access favorites.");
      }
    });
  }

  deleteGameFromFavorite = (gameId: string) => {
    this.gameService.deleteGameFromFavorite(gameId).subscribe({
      next: () => {
        console.log("Deleted favorite: " + gameId);
      },
      error: () => {
        console.log("Unable to access favorites.");
      }
    });
  }

  addToCart(gameId: string){

  }

}
