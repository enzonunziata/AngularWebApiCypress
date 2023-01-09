import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  @Input() errorString: string = '';
  @Output() onFormSubmit = new EventEmitter<{
    username: string;
    password: string;
  }>();

  form = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });

  constructor() {}

  submit(): void {
    this.errorString = '';
    if (this.form.invalid) {
      this.errorString = 'Invalid form values';
      return;
    }

    const username = this.form.get('username')?.value || '';
    const password = this.form.get('password')?.value || '';
    this.onFormSubmit.emit({ username, password });
  }
}
