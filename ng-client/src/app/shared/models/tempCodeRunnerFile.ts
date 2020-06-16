import uuid from 'uuid';

export interface IBasket {
    id: number;
    Items: IBasketItem[];
}

export interface IBasketItem {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    pictureUrl: string;
    brand: string;
    type: string;
}

class Basket implements IBasket {
    id: uuid;
    Items: IBasketItem[];
}


var obj = new Basket();
console.log(obj.id)