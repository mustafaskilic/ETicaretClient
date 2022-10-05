import { Injectable } from '@angular/core';
declare var alertify: any;
@Injectable({
  providedIn: 'root',
})
export class AlertifyService {
  constructor() {}

  // message(
  //   message: string,
  //   messageType: MessageType,
  //   position: Position,
  //   delay: number = 3,
  //   dismissOthers: boolean = false
  // )
  message(message: string, options: Partial<AlertifyOptions>) {
    alertify.set('notifier', 'delay', options.delay);
    alertify.set('notifier', 'position', options.position);
    const msg = alertify[options.messageType](message);
    if (options.dismissOthers) msg.dismissOthers();
  }

  dismiss() {
    alertify.dismissAll();
  }
}

export class AlertifyOptions {
  messageType: MessageType = MessageType.Message;
  position: Position = Position.Bottom_Left;
  delay: number = 3;
  dismissOthers: boolean = false;
}

export enum MessageType {
  Error = 'error',
  Message = 'message',
  Success = 'success',
  Notify = 'notify',
  Warning = 'warning',
}

export enum Position {
  Bottom_Right = 'bottom-right',
  Bottom_Left = 'bottom-left',
  Bottom_Center = 'bottom-center',
  Top_Right = 'top-right',
  Top_Left = 'top-left',
  Top_Center = 'top-center',
}
