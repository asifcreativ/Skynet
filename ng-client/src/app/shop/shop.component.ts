import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { ILookup } from './product-item/lookup';
import { ShopService } from './shop.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
    @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
    products: IProduct[] = [];
    /** total product counts in DB */
    totalItems = 0;
    brands: ILookup[] = [];
    productTypes: ILookup[] = [];
    shopParams = new ShopParams();
    sortOptions = [
        { name: 'Alphabetical', value: 'name' },
        { name: 'Price: Low to Hight', value: 'priceAsc' },
        { name: 'Price: High to Low', value: 'priceDesc' }
    ];

    constructor(private shopService: ShopService) { }

    ngOnInit(): void {
        this.getProducts();
        this.getBrands();

        this.getProductTypes();
    }


    private getProducts() {
        this.shopService.getProducts(this.shopParams).subscribe(resp => {
            this.products = resp.data;
            this.shopParams.pageIndex = resp.pageIndex;
            this.shopParams.pageSize = resp.pageSize;
            this.totalItems = resp.count;
        }, error => {
            console.log(error);
        });
    }

    private getBrands() {
        this.shopService.getBrands().subscribe(resp => {
            this.brands = [{ id: 0, name: 'All' }, ...resp];
        }, error => {
            console.log(error);
        });
    }

    private getProductTypes() {
        this.shopService.getProductTypes().subscribe(resp => {
            this.productTypes = [{ id: 0, name: 'All' }, ...resp];
        }, error => {
            console.log(error);
        });
    }

    onSelectBrand(brandId: number) {
        this.shopParams.brandId = brandId;
        this.shopParams.pageIndex = 1;
        this.getProducts();
    }

    onSelectProductType(typeId: number) {
        this.shopParams.typeId = typeId;
        this.shopParams.pageIndex = 1;
        this.getProducts();
    }


    onSelectSort(sort: string) {
        this.shopParams.sort = sort;
        this.getProducts();
    }

    onPageChanged(evt) {
        if (this.shopParams.pageIndex !== evt.page) {
            this.shopParams.pageIndex = evt.page;
            this.getProducts();
        }
    }

    onSearch() {
        this.shopParams.search = this.searchInput.nativeElement.value;
        this.shopParams.pageIndex = 1;
        this.getProducts();
    }

    onSearchReset() {
        this.searchInput.nativeElement.value = '';
        this.shopParams = new ShopParams();
        this.getProducts();
    }
}
