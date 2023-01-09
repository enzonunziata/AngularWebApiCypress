import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  fullname: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  logout(): void {
    this.userService.logout();
    this.ngZone.run(() => this.router.navigate(['/login']));
  }

  ngOnInit(): void {
    this.userService.currentUser$.subscribe((user) => {
      this.isLoggedIn = user != null;
      this.fullname = user?.fullname || '';
    });
  }
}
