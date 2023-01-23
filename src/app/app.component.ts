import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DynamicLoadComponentDirective } from './directives/common/dynamic-load-component.directive';
import { AuthService } from './services/common/auth.service';
import { DynamicLoadComponentService } from './services/common/dynamic-load-component.service';
import { HttpClientService } from './services/common/http-client.service';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from './services/ui/custom-toastr.service';
import { ComponentType } from '../app/services/common/dynamic-load-component.service';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(DynamicLoadComponentDirective, { static: true })
  dynamicLoadComponentDirective: DynamicLoadComponentDirective;
  constructor(
    public authService: AuthService,
    private toastrService: CustomToastrService,
    private router: Router,
    private httpClientService: HttpClientService,
    private dynamicLoadComponentService: DynamicLoadComponentService
  ) {
    this.httpClientService
      .get({
        controller: 'baskets',
      })
      .subscribe((data) => {});
    authService.identityCheck();
  }

  signOut() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.authService.identityCheck();
    this.router.navigate(['']);
    this.toastrService.message('Oturum kapatılmıştır!', 'Oturum Kapatıldı', {
      messageType: ToastrMessageType.Info,
      position: ToastrPosition.TopRight,
    });
  }

  async loadComponent() {
    await this.dynamicLoadComponentService.loadComponent(
      ComponentType.BasketsComponent,
      this.dynamicLoadComponentDirective.viewContainerRef
    );
  }
}
