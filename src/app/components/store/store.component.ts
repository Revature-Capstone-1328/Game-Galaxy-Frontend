import { Component, OnInit } from '@angular/core';
import { identity } from 'rxjs';
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
  date: Date= new Date();

  constructor(private gameService:GameService) { }

  ngOnInit(): void {
    this.getGames();
  }

  Search() {
    if (this.name == "") {
    } else {
      this.games = this.games.filter(res => {
        return res.name.toLocaleLowerCase().match(this.name.toLocaleLowerCase());
      })
    }
  }

  getGames(){
    console.log("Fetching games");

    for (let id = 1; id < 50; id++) {
      console.log("Fetching game no " + id);
      this.getGameFromAPI(id);
    }
    /*
    this.getGame(String(7));
    this.getGame(String(120));
    this.getGame(String(132));*/
  }

  //Function gets called to store game from API into database
  getGameFromAPI = (gameID:number) => {
    //console.log("Fetching game");
    this.gameService.getGame(gameID).subscribe({
      next: (data: any) => {
        console.log("Getting game "+gameID);
        if (data.deals.length>0){
          console.log(data);
          let game = new Game(0, "", 0, this.date, "", "");
          game.name = data.info.title; //name
          game.thumb = data.info.thumb; //thumb
          this.gameService.getDeal(data.deals[0].dealID).subscribe({
            next: (data: any) => {
              console.log("Getting deal for "+gameID);
              console.log(data);
              game.gameID = data.gameInfo.gameID; //gameId
              game.retailPrice = data.gameInfo.retailPrice; //retailPrice
              let date = new Date(data.gameInfo.releaseDate *1000);
              game.releaseDate = date; //releaseDate
              game.publisher = data.gameInfo.publisher; //publisher
              console.log("Gathered game " +gameID+":");
              console.log(game);
              this.games.push(game); //Testing
              this.addGame(game); //Posts to Database
            },
            error: () => {
              console.log("Unable to access game from API.");
            }
          });
        }else{
          console.log("Game "+gameID+" is an empty game")
        }


      },
      error: () => {
        console.log("Unable to access game from API.");
      }
    });
  }


  addToCart(gameID: number){

  }

  addGame(game: Game){


    this.gameService.addGame(game).subscribe({
      next:()=>{
        console.log("New Game added.");
      },
      error:()=>{
        console.log("Couldn't add new game!");
      }

    })
  }

}
