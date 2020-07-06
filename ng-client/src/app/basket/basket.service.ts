import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Basket, IBasket, IBasketItem, IBasketTotals } from '../shared/models/basket';
import { IDeliveryMethod } from '../shared/models/deliveryMethod';
import { IProduct } from '../shared/models/product';


@Injectable({
    providedIn: 'root'
})
export class BasketService {
    baseUrl = environment.apiUrl;
    // BehaviorSubject use to access data in multiple views/components
    private basketSource = new BehaviorSubject<IBasket>(null);
    basket$ = this.basketSource.asObservable();
    private basketTotalSource = new BehaviorSubject<IBasketTotals>(null);
    basketTotal$ = this.basketTotalSource.asObservable();
    private shipping = 0;

    constructor(private http: HttpClient) { }


    createPaymentIntent() {
        const basketId = this.getCurrentBasketValue().id;
        return this.http.post(`${this.baseUrl}payments/${basketId}`, {}).pipe(
            map((basket: IBasket) => {
                this.basketSource.next(basket);
                // console.log(this.getCurrentBasketValue());
            })
        );
    }


    setShippingPrice(deliveryMethod: IDeliveryMethod) {
        this.shipping = deliveryMethod.price;
        this.calculateTotals();

        const basket = this.getCurrentBasketValue();
        basket.deliveryMethodId = deliveryMethod.id;
        basket.shippingPrice = deliveryMethod.price;
        this.setBasket(basket);
    }


    getBasket(id: string) { // this method used by async pipe
        return this.http.get<IBasket>(`${this.baseUrl}basket?id=${id}`)
            .pipe(
                map((basket: IBasket) => {
                    this.basketSource.next(basket);
                    this.shipping = basket.shippingPrice;
                    this.calculateTotals();
                    // console.log(this.getCurrentBasketValue());
                })
            );
    }


    setBasket(basket: IBasket) {
        this.http.post(`${this.baseUrl}basket`, basket)
            .subscribe(
                (resp: IBasket) => {
                    this.basketSource.next(resp);
                    this.calculateTotals();
                    // console.log("BasketService -> setBasket -> resp", resp);
                },
                error => console.log(error)
            );
    }


    getCurrentBasketValue(): IBasket {
        return this.basketSource.value;
    }


    addItemToBasket(item: IProduct, quantity = 1) {
        const itemToAdd: IBasketItem = this.mapProductItemToBasketItem(item, quantity);

        // const basket: IBasket = this.getCurrentBasketValue() ?? this.createBasket();

        let basket = this.getCurrentBasketValue();
        if (basket === null) {
            basket = this.createBasket();
        }

        basket.items = this.addOrUpdateItem(basket.items, itemToAdd, quantity);
        this.setBasket(basket);
    }


    incrementItemQuantity(item: IBasketItem) {
        const basket = this.getCurrentBasketValue();
        const idx = basket.items.findIndex(el => el.id === item.id);
        basket.items[idx].quantity += 1;
        this.setBasket(basket);
    }


    decrementItemQuantity(item: IBasketItem) {
        const basket = this.getCurrentBasketValue();
        const idx = basket.items.findIndex(el => el.id === item.id);

        if (basket.items[idx].quantity > 1) {
            basket.items[idx].quantity -= 1;
            this.setBasket(basket);
        } else {
            this.removeItemFromBasket(item);
        }
    }


    removeItemFromBasket(item: IBasketItem) {
        const basket = this.getCurrentBasketValue();
        if (basket.items.some(el => el.id === item.id)) {
            basket.items = basket.items.filter(el => el.id !== item.id);

            if (basket.items.length) {
                this.setBasket(basket);
            } else {
                this.deleteBasket(basket);
            }
        }
    }


    deleteLocalBasket() {
        this.basketSource.next(null);
        this.basketTotalSource.next(null);
        localStorage.removeItem('basket_id');
    }


    deleteBasket(basket: IBasket) {
        return this.http.delete(`${this.baseUrl}basket?id=${basket.id}`).subscribe(() => {
            this.basketSource.next(null);
            this.basketTotalSource.next(null);
            localStorage.removeItem('basket_id');
        }, error => console.log(error));
    }

    //#region Helper Methods
    private addOrUpdateItem(Items: IBasketItem[], itemToAdd: IBasketItem, quantity: number): IBasketItem[] {
        const idx = Items.findIndex(el => el.id === itemToAdd.id);

        if (idx === -1) { // add
            // itemToAdd.quantity = quantity;
            Items.push(itemToAdd);
        } else { // update quantity
            Items[idx].quantity += quantity;
        }

        return Items;
    }


    private createBasket(): IBasket {
        const basket = new Basket();
        localStorage.setItem('basket_id', basket.id);
        return basket;
    }


    private mapProductItemToBasketItem(item: IProduct, quantity: number): IBasketItem {
        return {
            id: item.id,
            productName: item.name,
            price: item.price,
            pictureUrl: item.pictureUrl,
            quantity,
            brand: item.productBrand,
            type: item.productType
        };
    }


    private calculateTotals() {
        const basket = this.getCurrentBasketValue();
        const shipping = this.shipping;
        const subtotal = basket.items.reduce((acc, curr) => (curr.price * curr.quantity) + acc, 0);
        const total = shipping + subtotal;

        this.basketTotalSource.next({ shipping, subtotal, total });
    }
    //#endregion Helper Methods
}
