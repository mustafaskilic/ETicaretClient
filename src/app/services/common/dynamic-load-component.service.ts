import { Type } from '@angular/compiler';
import { ViewContainerRef, Injectable } from '@angular/core';
import { BasketsComponent } from 'src/app/ui/components/baskets/baskets.component';
@Injectable({
  providedIn: 'root',
})
export class DynamicLoadComponentService {
  // _viewContainerRef: ViewContainerRef;
  constructor() {}

  async loadComponent(
    component: ComponentType,
    viewContainerRef: ViewContainerRef
  ) {
    let _component: any = null;
    switch (component) {
      case ComponentType.BasketsComponent:
        _component = (
          await import('../../../app/ui/components/baskets/baskets.component')
        ).BasketsComponent;
        break;

      default:
        break;
    }
    viewContainerRef.clear();
    return viewContainerRef.createComponent(_component);
  }
}

export enum ComponentType {
  BasketsComponent,
}
