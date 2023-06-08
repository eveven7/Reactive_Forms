import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export class CustomValiators {
  static forbidenName(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'Test') {
      return { forbidenName: true };
    }
    return null;
  }

  static asyncForbidenName(
    control: FormControl
  ): Promise<any> | Observable<any> {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'Testproject') {
          resolve({ forbidenName: true });
        } else {
          resolve(null);
        }
      }, 2000);
    });
    return promise
  }
}
