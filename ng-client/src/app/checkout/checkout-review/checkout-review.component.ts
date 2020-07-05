import { CdkStepper } from '@angular/cdk/stepper';
import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket } from 'src/app/shared/models/basket';

@Component({
    selector: 'app-checkout-review',
    templateUrl: './checkout-review.component.html',
    styleUrls: ['./checkout-review.component.scss']
})
export class CheckoutReviewComponent implements OnInit {
    @Input() appStepper: CdkStepper;
    basket$: Observable<IBasket>;

    constructor(private basketService: BasketService, private toastr: ToastrService) { }

    ngOnInit() {
        this.basket$ = this.basketService.basket$;
    }

    createPaymentIntent() {
        this.basketService.createPaymentIntent().subscribe(() => {
            this.appStepper.next(); // when create/update payment intent successful then move user to next step
            // TODO: Only for development
            // this.toastr.success('Payment intent created');
        }, error => {
            console.log(error);
            this.toastr.error(error.message);
        });
    }
}
