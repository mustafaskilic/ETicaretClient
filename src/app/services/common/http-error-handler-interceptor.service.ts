import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import {
  CustomToastrService,
  ToastrMessageType,
  ToastrPosition,
} from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root',
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {
  constructor(private toastrService: CustomToastrService) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error) => {
        console.log('test');
        switch (error.status) {
          case HttpStatusCode.Unauthorized:
            this.toastrService.message(
              'Bu işlemi yapmaya yetkiniz bulunmamaktadır!',
              'Yetkisiz işlem!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopRight,
              }
            );
            break;
          case HttpStatusCode.InternalServerError:
            this.toastrService.message(
              'Sunucuya erişilmiyor!',
              'Sunucu Hatası!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopRight,
              }
            );
            break;
          case HttpStatusCode.BadRequest:
            this.toastrService.message(
              'Geçersiz istek  yapıldı!',
              'Geçersiz istek!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopRight,
              }
            );
            break;
          case HttpStatusCode.NotFound:
            this.toastrService.message('Sayfa bulunamadı!', 'Bulunamadı!', {
              messageType: ToastrMessageType.Warning,
              position: ToastrPosition.TopRight,
            });
            break;

          default:
            this.toastrService.message(
              'Beklenmeyen bir hata meydana geldi!',
              'Beklenmeyen Hata!',
              {
                messageType: ToastrMessageType.Warning,
                position: ToastrPosition.TopRight,
              }
            );
            break;
        }
        return of(error);
      })
    );
  }
}
