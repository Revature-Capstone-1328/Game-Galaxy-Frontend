import { Game } from "./game";
import { User } from "./user";

export class Order {
    constructor(public orderId:number, public orderDate:Date,  public games:Game[], public user?:User){}
}

