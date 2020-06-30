import { CdkStepper } from '@angular/cdk/stepper';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-stepper',
    templateUrl: './stepper.component.html',
    styleUrls: ['./stepper.component.scss'],
    providers: [{ provide: CdkStepper, useExisting: StepperComponent }]
})
export class StepperComponent extends CdkStepper implements OnInit {

    ngOnInit() {
    }

    onClick(index: number) {
        this.selectedIndex = index;
    }
}
