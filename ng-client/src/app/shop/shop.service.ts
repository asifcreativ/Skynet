import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ILookup } from '../shared/models/lookup';
import { IPagination } from '../shared/models/pagination';
import { IProduct } from '../shared/models/product';
import { ShopParams } from '../shared/models/shopParams';


@Injectable({
    providedIn: 'root'
})
export class ShopService {
    baseUrl = 'https://localhost:5001/api/';

    constructor(private http: HttpClient) { }

    getProducts(shopParams: ShopParams) {
        let params = new HttpParams();

        if (shopParams.brandId) {
            params = params.append('brandId', `${shopParams.brandId}`);
        }

        if (shopParams.typeId) {
            params = params.append('typeId', `${shopParams.typeId}`);
        }

        if (shopParams.sort) {
            params = params.append('sort', `${shopParams.sort}`);
        }

        if (shopParams.pageIndex) {
            params = params.append('pageIndex', `${shopParams.pageIndex}`);
        }

        if (shopParams.pageSize) {
            params = params.append('pageSize', `${shopParams.pageSize}`);
        }

        if (shopParams.search) {
            params = params.append('search', `${shopParams.search}`);
        }

        return this.http.get<IPagination<IProduct>>(`${this.baseUrl}products`, { observe: 'response', params })
            .pipe(
                map(resp => resp.body)
            );
    }

    getProductById(id: number) {
        return this.http.get<IProduct>(`${this.baseUrl}products/${id}`);
    }

    getBrands() {
        return this.http.get<ILookup[]>(`${this.baseUrl}products/brands`);
    }

    getProductTypes() {
        return this.http.get<ILookup[]>(`${this.baseUrl}products/types`);
    }
}
