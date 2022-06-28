import { Game } from "./game";

export class Orderhistory {
    constructor(public orderId:number, public orderDate:Date, public game:Game, public quantity:number){}
}
