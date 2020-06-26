import { Component, ElementRef, Input, OnInit, Self, ViewChild } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
    selector: 'app-text-input',
    templateUrl: './text-input.component.html',
    styleUrls: ['./text-input.component.scss']
})
export class TextInputComponent implements OnInit, ControlValueAccessor {
    @ViewChild('input', { static: true }) input: ElementRef<HTMLInputElement>;
    @Input() type = 'text';
    @Input() label: string;

    constructor(@Self() public controlDir: NgControl) {
        this.controlDir.valueAccessor = this;
    }

    ngOnInit() {
        const control = this.controlDir.control;
        const validators = control.validator ? [control.validator] : [];
        const asyncValidators = control.asyncValidator ? [control.asyncValidator] : [];

        control.setValidators(validators);
        control.setAsyncValidators(asyncValidators);
        control.updateValueAndValidity();
    }

    onChange(event: any) { }

    onTouched() { }

    writeValue(obj: any) {
        this.input.nativeElement.value = obj || '';
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    setDisabledState?(isDisabled: boolean) { }

}
