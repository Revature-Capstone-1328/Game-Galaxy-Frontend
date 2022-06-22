import { Component, OnInit } from '@angular/core';
import { Game } from 'src/app/models/game';
import { GameService } from 'src/app/services/game.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  favs: number[] = [];
  favGames: Game[] = [];

  constructor(private gameService: GameService) { }

  ngOnInit(): void {
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

  addGameToFavorite = (gameID: number) => {
    this.gameService.addGameToFavorite(gameID).subscribe({
      next: () => {
        console.log("Added favorite: " + gameID);
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

  deleteGameFromFavorite = (gameID: number) => {
    this.gameService.deleteGameFromFavorite(gameID).subscribe({
      next: () => {
        console.log("Deleted favorite: " + gameID);
      },
      error: () => {
        console.log("Unable to access favorites.");
      }
    });
  }

}
