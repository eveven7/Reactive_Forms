import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValiators } from '../custom-validator';

@Component({
  selector: 'app-practise',
  templateUrl: './practise.component.html',
  styleUrls: ['./practise.component.css'],
})
export class PractiseComponent implements OnInit {
  constructor() {}
  myForm: FormGroup;
  statuses:string[]= ['Stable', 'Critical', 'Finished'];

  ngOnInit(): void {
    this.myForm = new FormGroup({
      projectName: new FormControl(null, [
        Validators.required,
        CustomValiators.forbidenName],
        CustomValiators.asyncForbidenName,
      ),

      email: new FormControl(null, [Validators.required, Validators.email]),

      status: new FormControl('Critical'),
    });
  }

  onSubmit() {
    console.log(this.myForm.value);
  }
}
