import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AppValidators } from '../../core/validators';
import { Links } from '../../components/links/links';
@Component({
  selector: 'app-register',
  templateUrl: './register.html',
  styleUrl: './register.scss',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, CommonModule, Links]
})
export class Register {

  protected form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      name: ['', [
        Validators.minLength(4),
        Validators.maxLength(32),
        Validators.pattern(/^[a-zA-Z0-9@.]+$/),
        Validators.required
      ]],
      pass: ['', [
        Validators.minLength(8),
        Validators.maxLength(64),
        Validators.pattern(/^\S+$/),
        Validators.required
      ]],
      confName: ['', [
        AppValidators.equalTo('name'),
        Validators.required,
      ]],
      confPass: ['', [
        AppValidators.equalTo('pass'),
        Validators.required
      ]],
    });
  }

  protected onSubmit() {

  }
  
}
