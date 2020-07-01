import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IBasketItem } from '../../models/basket';
import { IOrderItem } from '../../models/Order';

@Component({
    selector: 'app-basket-summary',
    templateUrl: './basket-summary.component.html',
    styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {
    @Input() isBasket = true;
    @Output() increment = new EventEmitter<IBasketItem>();
    @Output() decrement = new EventEmitter<IBasketItem>();
    @Output() remove = new EventEmitter<IBasketItem>();
    @Input() items: IBasketItem[] | IOrderItem[] = [];
    @Input() isOrder = false;

    constructor() { }

    ngOnInit() { }

    removeBasketItem(item: IBasketItem) {
        this.remove.emit(item);
    }

    incrementItemQuantity(item: IBasketItem) {
        this.increment.emit(item);
    }

    decrementItemQuantity(item: IBasketItem) {
        this.decrement.emit(item);
    }

}
