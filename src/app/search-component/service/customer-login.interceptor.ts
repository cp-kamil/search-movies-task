import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { finalize } from 'rxjs';
import { LoaderService } from './loader.service';

@Injectable()
export class LoaderInterceptor implements HttpInterceptor {

  constructor(private loader: LoaderService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.loader.show()
    return next.handle(req).pipe(
      finalize(() => this.loader.hide())
    );

  }
}
