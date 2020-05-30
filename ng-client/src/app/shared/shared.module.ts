import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { PagerComponent } from './pager/pager.component';


@NgModule({
    declarations: [PagingHeaderComponent, PagerComponent],
    imports: [
        CommonModule,
        PaginationModule.forRoot(),
        CarouselModule.forRoot()
    ],
    exports: [
        PaginationModule,
        PagingHeaderComponent,
        PagerComponent,
        CarouselModule
    ]
})
export class SharedModule { }