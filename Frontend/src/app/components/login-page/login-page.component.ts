import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  errorString: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {}

  formSubmit(event: { username: string; password: string }) {
    this.userService
      .login({ username: event.username, password: event.password })
      .subscribe({
        next: () => {
          this.ngZone.run(() => {
            this.router.navigate(['/products']);
          });
        },
        error: (e) => {
          this.errorString = e.statusText;
        },
      });
  }
}
