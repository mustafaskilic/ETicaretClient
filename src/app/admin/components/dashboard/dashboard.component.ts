import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  constructor(
    private alertify: AlertifyService,
    spinner: NgxSpinnerService,
    private signalRService: SignalRService
  ) {
    super(spinner);
    signalRService.start(HubUrls.ProductHub);
  }

  ngOnInit(): void {
    this.signalRService.on(
      ReceiveFunctions.receiveProductAddedMessageReceiveFunction,
      (message) => {
        this.alertify.message(message, {
          messageType: MessageType.Error,
          position: Position.Top_Right,
        });
      }
    );
  }
  m() {
    this.alertify.message('merhaba', {
      messageType: MessageType.Success,
      delay: 5,
      dismissOthers: false,
      position: Position.Top_Right,
    });
  }
  d() {
    this.alertify.dismiss();
  }
}
