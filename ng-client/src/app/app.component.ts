import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    constructor(
        private basketService: BasketService,
        private accountService: AccountService
    ) { }

    ngOnInit() {
        this.loadBasket();
        this.loadCurrentUser();
    }

    private loadCurrentUser() {
        const token = localStorage.getItem('token');

        this.accountService.loadCurrentUser(token).subscribe(
            () => {
                // console.log('get current user');
            },
            error => console.log(error)
        );
    }

    private loadBasket() {
        const basketId = localStorage.getItem('basket_id');

        if (basketId) {
            this.basketService.getBasket(basketId).subscribe(
                () => {
                    // console.log('Initialize basket');
                },
                error => console.log(error)
            );
        }
    }
}

