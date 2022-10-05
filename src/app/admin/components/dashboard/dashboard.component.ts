import { Component, OnInit } from '@angular/core';
import {
  AlertifyService,
  MessageType,
  Position,
} from 'src/app/services/admin/alertify.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  constructor(private alertify: AlertifyService) {}

  ngOnInit(): void {}
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
