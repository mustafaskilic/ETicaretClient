import { Component, Inject, OnInit, Output } from '@angular/core';
import { MatCard } from '@angular/material/card';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { BaseUrl } from 'src/app/contracts/base-url';
import { List_Product_Image } from 'src/app/contracts/list_product_image';
import { DialogService } from 'src/app/services/common/dialog.service';
import { FileUploadOptions } from 'src/app/services/common/fileupload/fileupload.component';
import { FileService } from 'src/app/services/common/models/file.service';
import { ProductService } from 'src/app/services/common/models/product.service';
import { BaseDialog } from '../base/basedialog';
import {
  DeleteDialogComponent,
  DeleteState,
} from '../delete-dialog/delete-dialog.component';

declare var $: any;
@Component({
  selector: 'app-select-product-image-dialog',
  templateUrl: './select-product-image-dialog.component.html',
  styleUrls: ['./select-product-image-dialog.component.scss'],
})
export class SelectProductImageDialogComponent
  extends BaseDialog<SelectProductImageDialogComponent>
  implements OnInit
{
  constructor(
    dialogRef: MatDialogRef<SelectProductImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: SelectProductImageState | string,
    private productService: ProductService,
    private spinner: NgxSpinnerService,
    private dialogService: DialogService,
    private fileService: FileService
  ) {
    super(dialogRef);
  }

  images: List_Product_Image[];
  baseUrl: BaseUrl;
  async ngOnInit() {
    this.baseUrl = await this.fileService.getBaseStorageUrl();
    this.spinner.show(SpinnerType.BallAtom);
    this.images = await this.productService.readImages(
      this.data as string,
      () => {
        this.spinner.hide(SpinnerType.BallAtom);
      }
    );
  }

  async deleteImage(imageId: string, event: any) {
    this.dialogService.openDialog({
      componentType: DeleteDialogComponent,
      data: DeleteState.Yes,
      afterClosed: async () => {
        this.spinner.show(SpinnerType.BallAtom);

        await this.productService.deleteImage(
          this.data as string,
          imageId,
          () => {
            this.spinner.hide(SpinnerType.BallAtom);
            var card = document.getElementById(imageId);
            $(card).fadeOut(500);
          }
        );
      },
    });
  }

  showCase(imageId: string) {
    this.spinner.show(SpinnerType.BallAtom);
    this.productService.changeShowcaseImage(
      imageId,
      this.data as string,
      () => {
        this.spinner.hide(SpinnerType.BallAtom);
      }
    );
  }

  @Output() options: Partial<FileUploadOptions> = {
    accept: '.png, .jpg, .jpeg, .gif',
    action: 'upload',
    controller: 'products',
    isAdminPage: true,
    explanation: 'Ürün resmini seçin veya buraya sürükleyin...',
    queryString: `id=${this.data}`,
  };
}

export enum SelectProductImageState {
  Close,
}
