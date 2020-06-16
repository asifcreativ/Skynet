import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BasketService } from 'src/app/basket/basket.service';
import { IProduct } from 'src/app/shared/models/product';
import { BreadcrumbService } from 'xng-breadcrumb';
import { ShopService } from '../shop.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product: IProduct;
  quantity = 1;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private breadcrumbService: BreadcrumbService,
    private basketService: BasketService
  ) {
    this.breadcrumbService.set('@productDetails', '');
  }

  ngOnInit() {
    this.loadProduct();
  }

  private loadProduct() {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.shopService.getProductById(id).subscribe(resp => {
      this.product = resp;
      this.breadcrumbService.set('@productDetails', this.product.name);
    }, error => console.log(error));
  }

  incrementQuantity() {
    this.quantity += 1;
  }

  decrementQuantity() {
    if (this.quantity > 1) {
      this.quantity -= 1;
    }
  }

  addItemToBasket() {
    this.basketService.addItemToBasket(this.product, this.quantity);
  }
}
