import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HttpClientService } from 'src/app/services/common/http-client.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent extends BaseComponent implements OnInit {
  constructor(
    spinner: NgxSpinnerService,
    private httpClientService: HttpClientService
  ) {
    super(spinner);
  }

  ngOnInit(): void {
    this.showSpinner(SpinnerType.BallGridBeat);

    // this.httpClientService
    //   .post(
    //     { controller: 'products' },
    //     {
    //       name: 'Kalem',
    //       stock: 100,
    //       price: 15,
    //     }
    //   )
    //   .subscribe();

    // this.httpClientService
    //   .put(
    //     { controller: 'products' },
    //     {
    //       id: '639c0433-170e-4d8a-9aa6-7a2cea16da42',
    //       name: 'Karpuz',
    //       stock: 25,
    //       price: 5.5,
    //     }
    //   )
    //   .subscribe();

    // this.httpClientService
    //   .delete(
    //     { controller: 'products' },
    //     '639c0433-170e-4d8a-9aa6-7a2cea16da42'
    //   )
    //   .subscribe();
  }
}
