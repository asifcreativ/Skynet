import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ILookup } from '../shared/models/lookup';
import { IPagination, Pagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';


@Injectable({
    providedIn: 'root'
})
export class ShopService {
    baseUrl = environment.apiUrl;
    /** For client side caching */
    products: IProduct[] = [];
    brands: ILookup[] = [];
    types: ILookup[] = [];
    pagination = new Pagination<IProduct>();
    shopParams = new ShopParams();

    constructor(private http: HttpClient) { }

    getProducts(useCache: boolean) {
        if (useCache === false) {
            this.products = [];
        }

        if (this.products.length > 0 && useCache === true) {
            const pagesReceived = Math.ceil(this.products.length / this.shopParams.pageSize);

            if (this.shopParams.pageIndex <= pagesReceived) {
                this.pagination.data = this.products.slice(
                    (this.shopParams.pageIndex - 1) * this.shopParams.pageSize,
                    this.shopParams.pageIndex * this.shopParams.pageSize
                ); // slice close
                return of(this.pagination);
            }
        }

        let params = new HttpParams();

        if (this.shopParams.brandId) {
            params = params.append('brandId', `${this.shopParams.brandId}`);
        }

        if (this.shopParams.typeId) {
            params = params.append('typeId', `${this.shopParams.typeId}`);
        }

        if (this.shopParams.sort) {
            params = params.append('sort', `${this.shopParams.sort}`);
        }

        if (this.shopParams.pageIndex) {
            params = params.append('pageIndex', `${this.shopParams.pageIndex}`);
        }

        if (this.shopParams.pageSize) {
            params = params.append('pageSize', `${this.shopParams.pageSize}`);
        }

        if (this.shopParams.search) {
            params = params.append('search', `${this.shopParams.search}`);
        }

        return this.http.get<IPagination<IProduct>>(`${this.baseUrl}products`, { observe: 'response', params })
            .pipe(
                map(resp => {
                    this.products = [...this.products, ...resp.body.data];
                    this.pagination = resp.body;
                    return this.pagination;
                })
            );
    }

    setShopParams(params: ShopParams) {
        this.shopParams = params;
    }

    getShopParams() {
        return this.shopParams;
    }

    getProductById(id: number) {
        const product = this.products.find(el => el.id === id);

        if (product) {
            return of(product);
        }

        return this.http.get<IProduct>(`${this.baseUrl}products/${id}`);
    }

    getBrands() {
        if (this.brands.length) {
            return of(this.brands);
        }

        return this.http.get<ILookup[]>(`${this.baseUrl}products/brands`).pipe(
            map(resp => {
                this.brands = resp;
                return resp;
            })
        );
    }

    getProductTypes() {
        if (this.types.length) {
            return of(this.types);
        }
        return this.http.get<ILookup[]>(`${this.baseUrl}products/types`).pipe(
            map(resp => {
                this.types = resp;
                return resp;
            })
        );
    }
}
