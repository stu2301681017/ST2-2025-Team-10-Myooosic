import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrl: './login.scss',
  imports: [ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, CommonModule]
})
export class Login {

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
    });
  }

  protected onSubmit() {

  }

}
