import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, firstValueFrom, lastValueFrom } from 'rxjs';
import { Create_Product } from 'src/app/contracts/create_product';
import { List_Product } from 'src/app/contracts/list_product';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private httpClientService: HttpClientService) {}

  create(
    product: Create_Product,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ) {
    this.httpClientService
      .post(
        {
          controller: 'products',
        },
        product
      )
      .subscribe({
        next: (res) => {
          successCallBack();
        },
        error: (errorResponse: HttpErrorResponse) => {
          const _error: Array<{ key: string; value: Array<string> }> =
            errorResponse.error;
          let message = '';
          _error.forEach((val, index) => {
            val.value.forEach((_v, _index) => {
              message += `${_v}<br>`;
            });
          });
          errorCallBack(message);
        },
      });
  }

  async read(
    page: number = 0,
    size: number = 5,
    successCallBack?: () => void,
    errorCallBack?: (errorMessage: string) => void
  ): Promise<{ totalProductCount: number; products: List_Product[] }> {
    const promiseData: Promise<{
      totalProductCount: number;
      products: List_Product[];
    }> = firstValueFrom(
      this.httpClientService.get<{
        totalProductCount: number;
        products: List_Product[];
      }>({
        controller: 'products',
        queryString: `page=${page}&size=${size}`,
      })
    );

    promiseData
      .then((d) => successCallBack())
      .catch((errorResponse: HttpErrorResponse) =>
        errorCallBack(errorResponse.message)
      );

    return await promiseData;
  }

  async delete(id: string) {
    const deleteObservable: Observable<any> =
      this.httpClientService.delete<any>(
        {
          controller: 'products',
        },
        id
      );

    await firstValueFrom(deleteObservable);
  }

  async readImages(
    id: string,
    successCallBack?: () => void
  ): Promise<List_Product_Image[]> {
    const getObservable: Observable<List_Product_Image[]> =
      this.httpClientService.get<List_Product_Image[]>(
        {
          action: 'getproductimages',
          controller: 'products',
        },
        id
      );
    const images: List_Product_Image[] = await firstValueFrom(getObservable);
    successCallBack();
    return images;
  }

  async deleteImage(id: string, imageId: string, successCallBack?: () => void) {
    const deleteObservable = this.httpClientService.delete(
      {
        controller: 'products',
        action: 'deleteproductimage',
        queryString: `imageId=${imageId}`,
      },
      id
    );
    successCallBack();
    await firstValueFrom(deleteObservable);
  }

  async changeShowcaseImage(
    imageId: string,
    productId: string,
    successCallBack?: () => void
  ): Promise<void> {
    const changeShowcaseImageObservable = this.httpClientService.get({
      controller: 'products',
      action: 'changeshowcaseimage',
      queryString: `productImageId=${imageId}&productId=${productId}`,
    });

    await firstValueFrom(changeShowcaseImageObservable);
    successCallBack();
  }
}
