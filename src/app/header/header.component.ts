import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from '../../../node_modules/rxjs';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  public Authenticated: boolean;
  private authListenerSubs: Subscription;

  constructor(private objectAuthService: AuthService) {}

  ngOnInit() {
    this.Authenticated = this.objectAuthService.getAuth();
    this.authListenerSubs = this.objectAuthService.getAuthStatusListener().subscribe(
      isAuth => {
        this.Authenticated = isAuth;
      }
    );
  }

  logout() {
    this.objectAuthService.logout();
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
