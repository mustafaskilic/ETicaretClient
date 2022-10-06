import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

export class BaseComponent {
  constructor(private spinner: NgxSpinnerService) {}
  showSpinner(spinnerNameType: SpinnerType) {
    this.spinner.show(spinnerNameType);

    setTimeout(() => this.hidespinner(spinnerNameType), 1000);
  }
  hidespinner(spinnerNameType: SpinnerType) {
    this.spinner.hide(spinnerNameType);
  }
}

export enum SpinnerType {
  BallGridBeat = 's1',
  BallAtom = 's2',
  BallClimbingDot = 's3',
}
