import { Injectable } from '@angular/core';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpHeaders,
} from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if ((req.method !== 'GET' || req.url.indexOf('draft' ) && this.isSameOriginUrl(req)) > -1) {
            return from(this.authService.getAccessToken()).pipe(
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

        return next.handle(req);
    }

    private isSameOriginUrl(req: any) {
        // It's an absolute url with the same origin.
        if (req.url.startsWith(`${window.location.origin}/`)) {
          return true;
        }
    
        // It's a protocol relative url with the same origin.
        // For example: //www.example.com/api/Products
        if (req.url.startsWith(`//${window.location.host}/`)) {
          return true;
        }
    
        // It's a relative url like /api/Products
        if (/^\/[^\/].*/.test(req.url)) {
          return true;
        }
    
        // It's an absolute or protocol relative url that
        // doesn't have the same origin.
        return false;
      }
}
