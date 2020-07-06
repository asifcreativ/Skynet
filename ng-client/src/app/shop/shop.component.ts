import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ILookup } from '../shared/models/lookup';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
    selector: 'app-shop',
    templateUrl: './shop.component.html',
    styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
    @ViewChild('searchInput', { static: false }) searchInput: ElementRef;
    products: IProduct[] = [];
    /** total product counts in DB */
    totalItems = 0;
    brands: ILookup[] = [];
    productTypes: ILookup[] = [];
    shopParams: ShopParams;
    sortOptions = [
        { name: 'Alphabetical', value: 'name' },
        { name: 'Price: Low to Hight', value: 'priceAsc' },
        { name: 'Price: High to Low', value: 'priceDesc' }
    ];

    constructor(private shopService: ShopService) {
        this.shopParams = this.shopService.getShopParams();
    }

    ngOnInit(): void {
        this.getProducts(true);
        this.getBrands();

        this.getProductTypes();
    }


    private getProducts(useCache = false) {
        this.shopService.getProducts(useCache).subscribe(resp => {
            this.products = resp.data;
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
        const params = this.shopService.getShopParams();
        params.brandId = brandId;
        params.pageIndex = 1;
        this.shopService.setShopParams(params);
        this.getProducts();
    }

    onSelectProductType(typeId: number) {
        const params = this.shopService.getShopParams();
        params.typeId = typeId;
        params.pageIndex = 1;
        this.shopService.setShopParams(params);
        this.getProducts();
    }


    onSelectSort(sort: string) {
        const params = this.shopService.getShopParams();
        params.sort = sort;
        this.shopService.setShopParams(params);
        this.getProducts();
    }

    onPageChanged(evt) {
        const params = this.shopService.getShopParams();
        if (params.pageIndex !== evt.page) {
            params.pageIndex = evt.page;
            this.shopService.setShopParams(params);
            this.getProducts(true);
        }
    }

    onSearch() {
        const params = this.shopService.getShopParams();
        params.search = this.searchInput.nativeElement.value;
        params.pageIndex = 1;
        this.shopService.setShopParams(params);
        this.getProducts();
    }

    onSearchReset() {
        this.searchInput.nativeElement.value = '';
        this.shopParams = new ShopParams();
        this.shopService.setShopParams(this.shopParams);
        this.getProducts();
    }
}
