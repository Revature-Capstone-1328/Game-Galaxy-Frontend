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
  date: Date= new Date();
  //dealId: string = "";
  //game: Game= new Game("","",0,"","","");

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

    for (let id = 7; id < 15; id++) {
      console.log("Fetching game no " + id);
      this.getGame(String(id));
    }
    /*
    this.getGame(String(7));
    this.getGame(String(120));
    this.getGame(String(132));*/
  }

  getGame = (gameId:string) => {
    //console.log("Fetching game");
    this.gameService.getGame(gameId).subscribe({
      next: (data: any) => {
        console.log("Getting game "+gameId);
        if (data.deals.length>0){
          console.log(data);
          let game = new Game("", "", 0, this.date, "", "");
          game.name = data.info.title; //name
          game.thumb = data.info.thumb; //thumb
          //this.dealId = data.deals[0].dealID; //dealID
          this.gameService.getDeal(data.deals[0].dealID).subscribe({
            next: (data: any) => {
              console.log("Getting deal for "+gameId);
              console.log(data);
              game.gameId = data.gameInfo.gameID; //gameId
              game.retailPrice = data.gameInfo.retailPrice; //retailPrice
              let date = new Date(data.gameInfo.releaseDate *1000);
              game.releaseDate = date; //releaseDate
              game.publisher = data.gameInfo.publisher; //publisher
              console.log("Gathered game " +gameId+":");
              console.log(game);
              this.games.push(game);
            },
            error: () => {
              console.log("Unable to access game from API.");
            }
          });
        }else{
          console.log("Game "+gameId+" is an empty game")
        }
      //this.games.push(this.game);

      },
      error: () => {
        console.log("Unable to access game from API.");
      }
    });
  }


  addToCart(gameId: string){

  }

}
