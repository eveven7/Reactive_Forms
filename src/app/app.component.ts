import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  forbidenUsernames = ['Chris', 'Anna'];
  genders = ['male', 'female'];
  signupForm: FormGroup;
  ngOnInit(): void {
    this.signupForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.forbidenNames.bind(this),
        ]),
        email: new FormControl(
          null,
          [Validators.required, Validators.email],
          this.forbidenEmails.bind(this)
        ),
      }),

      gender: new FormControl('male'),
      hobbies: new FormArray([]),
    });
    // this.signupForm.valueChanges.subscribe((value) => console.log(value));
    this.signupForm.statusChanges.subscribe((status) => console.log(status));
    this.signupForm.setValue({
      userData:{
        username: 'Max',
        email: 'test@test.com'
      },
      gender: 'male',
      hobbies: []
    })
    this.signupForm.patchValue({
      userData:{
        username: 'Anna',
        email: 'test@test.com'
      },
      gender: 'male',
      hobbies: []
    })//update form
  }

  onSubmit() {
    console.log(this.signupForm);
    this.signupForm.reset()
  }
  onAddHobby() {
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }
  getControls() {
    return (<FormArray>this.signupForm.get('hobbies')).controls;
  }

  forbidenNames(control: FormControl): { [s: string]: boolean } {
    if (this.forbidenUsernames.indexOf(control.value) !== -1) {
      return { nameIsForbiden: true };
    }
    return null;
  }

  forbidenEmails(control: FormControl): Promise<any> | Observable<any> {
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if (control.value === 'test@test.com') {
          resolve({ emailIsForbiden: true });
        } else {
          reject(null); // Reject the promise when the email value is valid
        }
      }, 1500);
    });
    return promise;
  }
}
