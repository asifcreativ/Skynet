import { CdkStepperModule } from '@angular/cdk/stepper';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BasketSummaryComponent } from './components/basket-summary/basket-summary.component';
import { OrderTotalsComponent } from './components/order-totals/order-totals.component';
import { PagingHeaderComponent } from './components/paging-header/paging-header.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { TextInputComponent } from './components/text-input/text-input.component';
import { PagerComponent } from './pager/pager.component';


@NgModule({
    declarations: [
        PagingHeaderComponent,
        PagerComponent,
        OrderTotalsComponent,
        TextInputComponent,
        StepperComponent,
        BasketSummaryComponent
    ],
    imports: [
        CommonModule,
        PaginationModule.forRoot(),
        CarouselModule.forRoot(),
        BsDropdownModule.forRoot(),
        RouterModule,
        ReactiveFormsModule,
        CdkStepperModule
    ],
    exports: [
        // Modules
        PaginationModule,
        CarouselModule,
        ReactiveFormsModule,
        BsDropdownModule,
        CdkStepperModule,
        // Components
        PagingHeaderComponent,
        PagerComponent,
        OrderTotalsComponent,
        TextInputComponent,
        StepperComponent,
        BasketSummaryComponent
    ]
})
export class SharedModule { }
