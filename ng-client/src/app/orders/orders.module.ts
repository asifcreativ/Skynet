import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { OrderDetailedComponent } from './order-detailed/order-detailed.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';



@NgModule({
    declarations: [OrdersComponent, OrderDetailedComponent],
    imports: [
        CommonModule,
        OrdersRoutingModule,
        SharedModule
    ]
})
export class OrdersModule { }
