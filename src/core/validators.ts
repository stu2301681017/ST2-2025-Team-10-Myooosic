import { ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";

export namespace AppValidators {

    export function equalTo(otherControlName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {

            if (!control.parent) return null;

            const otherControl = control.parent.get(otherControlName);
            if (!otherControl) return null;

            if (control.value !== otherControl.value) {
                return { equal: true };
            }

            return null;
        };
    }

}