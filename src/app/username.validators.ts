import { AbstractControl, ValidationErrors } from "@angular/forms";

export class UsernameValidators {
    static cannotContainSpace(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).indexOf(' ') >= 0) {
            return {
                cannotContainSpace: true
            };
        }

        return null;
    }

    static shouldBeEqual (control: AbstractControl) : ValidationErrors | null {
        console.log('Valida', control.root.get('confirmPassword'));
        if(control.root.get('confirmPassword').value !== control.root.get('password').value) {
            return {
                shouldBeEqual: true
            };
        }

        return null;
    }

    // async validator
    // static shouldBeUnique(control: AbstractControl) : Promise<ValidationErrors | null> {
    //     return new Promise((resolve, reject) => {
    //         setTimeout(() => {
    //             console.log('ok');
    //             if(control.value === 'mo') {
    //                 resolve({ shouldBeUnique: true });
    //             } else {
    //                 resolve(null);
    //             }
    //         }, 2000);
    //     });
    // }
}