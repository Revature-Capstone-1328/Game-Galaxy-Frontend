import { Game } from "./game";
import { User } from "./user";

export class Order {
    constructor(public orderId:number,  public games:Game[], public orderDate:Date,  public user?:User){}
}

