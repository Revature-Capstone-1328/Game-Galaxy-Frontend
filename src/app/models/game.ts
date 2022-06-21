export class Game {
    constructor(
      public gameID:number,
      public storeID:number,
      public name:string,
      public steamAppID:number,
      public salePrice:number,
      public retailPrice:number,
      public steamRatingText:string,
      public steamRatingPercent: number,
      public steamRatingCount: number,
      public metacriticScore:number,
      public metacriticLink:string,
      public releaseDate:Date,
      public publisher:string,
      public thumb:string
      ){}

}
