import { AbstractControl, FormControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function mustMatchValidator(matchControl: FormControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const matches = matchControl.value === control.value;
        return matches ? null : { valueMismatch: { expected: matchControl.value, got: control.value } };
    };
}