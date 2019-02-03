import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { AuthenticationService } from '../services/authentication.service';

export class AuthenticationInterceptor implements HttpInterceptor {

    readonly TOKEN_KEY = "token";

    constructor(/*private authenticationService: AuthenticationService*/) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Interceptor Called!  Request:', req);

        // TODO: should get this from the authentication service but there is some 
        // dependency injection problem - I can't seem to resolve the authentication service from 
        // here.  FOr now just get the token directly from local storage
        const token = localStorage.getItem(this.TOKEN_KEY);;
        if (token) {
            const bearerToken = `Bearer ${token}`;
            const copiedReq = req.clone({headers: req.headers.set('Authorization', bearerToken)});
            return next.handle(copiedReq);
        }
        return next.handle(req);
    }
}