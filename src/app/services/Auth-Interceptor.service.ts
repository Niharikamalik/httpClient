import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

// export class AuthInterceptor implements HttpInterceptor
// {
//   intercept(req: HttpRequest<any>, next: HttpHandler){

//     const modifyRequest = req.clone()
//     console.log('auth interceptor')
//     return next.handle(modifyRequest);
//   }

// }
