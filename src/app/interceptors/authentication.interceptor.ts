import { HttpInterceptorFn } from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
  const jwt = localStorage.getItem("jwt");
  
        if (jwt) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + jwt)
            });

            return next.call("handle", cloned);
        }
        else {
            return next.call("handle", req);
        }
        
};
