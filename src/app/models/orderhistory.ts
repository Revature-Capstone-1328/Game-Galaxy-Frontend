import { Cart } from "./cart";
import { Game } from "./game";

export class Orderhistory {
    constructor(public orderId:number, public orderDate:Date, public games:Cart[], public totalPrice:number){}
}
