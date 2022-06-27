import { Game } from "./game";
import { User } from "./user";

export class Cart {
    constructor(public cartId:number, public game:Game, public quantity:number, public user?:User){}
}
