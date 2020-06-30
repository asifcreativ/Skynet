import { IAddress } from './address';


export interface IOrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shipToAddress: IAddress;
}


export interface IOrder {
    id: number;
    buyerEmail: string;
    orderDate: string;
    shipToAddress: IAddress;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: IOrderItemDto[];
    subtotal: number;
    status: string;
    total: number;
}


export interface IOrderItemDto {
    productId: number;
    productName: string;
    productUrl: string;
    price: number;
    quantity: number;
}
