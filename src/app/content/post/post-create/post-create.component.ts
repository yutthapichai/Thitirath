import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from '../../../../../node_modules/rxjs';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-postcreate',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostcreateComponent implements OnInit, OnDestroy {
  public UserAuth: boolean;
  private authListenerSubs: Subscription;
  constructor(private objectAuthService: AuthService) { }

  ngOnInit() {
    this.UserAuth = this.objectAuthService.getAuth();
    this.authListenerSubs = this.objectAuthService.getAuthStatusListener().subscribe(
      isAuth => {
        this.UserAuth = isAuth;
      }
    );
  }

  ngOnDestroy() {
    this.authListenerSubs.unsubscribe();
  }
}
