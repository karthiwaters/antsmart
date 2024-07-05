
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.page.html',
  styleUrls: ['./survey.page.scss'],
})
export class SurveyPage implements OnInit {

  surveyForm: FormGroup;
  currentStep: number = 0;
  steps: Array<string> = ['Step 1', 'Step 2', 'Step 3', 'Step 4', 'Step 5'];

  constructor(private fb: FormBuilder) {
    this.surveyForm = this.fb.group({
      step1: this.fb.group({
        rating1: [null, Validators.required],
        rating2: [null, Validators.required]
      }),
      step2: this.fb.group({
        rating3: [null, Validators.required],
        rating4: [null, Validators.required]
      }),
      step3: this.fb.group({
        rating5: [null, Validators.required],
        rating6: [null, Validators.required]
      }),
      step4: this.fb.group({
        rating7: [null, Validators.required],
        rating8: [null, Validators.required]
      }),
      step5: this.fb.group({
        rating9: [null, Validators.required],
        rating10: [null, Validators.required]
      })
    });
  }

  ngOnInit() {
    console.log('called');
  }

  nextStep() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
    }
  }

  previousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  onSubmit() {
    if (this.surveyForm.valid) {
      console.log(this.surveyForm.value);
    } else {
      console.log('Form is not valid');
    }
  }
}

