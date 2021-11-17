import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthorizeService } from 'src/api-authorization/authorize.service';
import { mergeMap } from 'rxjs/operators';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
    constructor(private authorizeService: AuthorizeService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
            return this.authorizeService.getAccessToken().pipe(
                mergeMap((token: string | null) => {
                    req = req.clone({
                        headers: new HttpHeaders({
                            Authorization: `Bearer ${token}`,
                        }),
                    });
                    return next.handle(req);
                })
            );
    }
}
