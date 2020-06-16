import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';


@NgModule({
    declarations: [
        PagingHeaderComponent,
        PagerComponent,
        OrderTotalsComponent
    ],
    imports: [
        CommonModule,
        PaginationModule.forRoot(),
        CarouselModule.forRoot()
    ],
    exports: [
        PaginationModule,
        PagingHeaderComponent,
        PagerComponent,
        CarouselModule,
        OrderTotalsComponent
    ]
})
export class SharedModule { }
