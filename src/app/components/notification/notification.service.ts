import {
  ApplicationRef,
  ComponentFactoryResolver,
  Injectable,
  Injector,
} from '@angular/core';
import { ToastComponent } from '../toast/toast.component';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector
  ) {}

  showSuccess(message: string) {
    this.showToast(message, 'success');
  }

  showError(message: string) {
    this.showToast(message, 'error');
  }

  private showToast(message: string, type: 'success' | 'error') {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(ToastComponent);
    const componentRef = componentFactory.create(this.injector);

    componentRef.instance.message = message;
    componentRef.instance.type = type;

    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    setTimeout(() => {
      this.appRef.detachView(componentRef.hostView);
      componentRef.destroy();
    }, 3000);
  }
}
