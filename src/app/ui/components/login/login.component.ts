import {
  FacebookLoginProvider,
  SocialAuthService,
} from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(
    private userService: UserService,
    spinner: NgxSpinnerService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public socialAuthService: SocialAuthService
  ) {
    super(spinner);
    this.socialAuthService.authState.subscribe(async (user) => {
      this.showSpinner(SpinnerType.BallAtom);
      switch (user.provider) {
        case 'GOOGLE':
          await this.userService.googleLogin(user, () => {
            this.authService.identityCheck();
            this.hidespinner(SpinnerType.BallAtom);
            this.redirectUrl();
          });
          break;
        case 'FACEBOOK':
          userService.facebookLogin(user, () => {
            this.authService.identityCheck();
            this.hidespinner(SpinnerType.BallAtom);
            this.redirectUrl();
          });
          break;
        default:
          break;
      }
    });
  }

  ngOnInit(): void {}

  facebookLogin() {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallAtom);
    await this.userService.login(usernameOrEmail, password, () => {
      this.redirectUrl();
      this.hidespinner(SpinnerType.BallAtom);
    });
  }

  redirectUrl() {
    this.activatedRoute.queryParams.subscribe((queryParams) => {
      const returnUrl: string = queryParams['returnUrl'];
      if (returnUrl) this.router.navigate([returnUrl]);
    });
  }
}
