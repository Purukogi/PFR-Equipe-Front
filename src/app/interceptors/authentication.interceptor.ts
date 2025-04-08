import { HttpInterceptorFn } from '@angular/common/http';

export const authenticationInterceptor: HttpInterceptorFn = (req, next) => {
    const jwt = localStorage.getItem("jwt");

    if (req.method == "OPTIONS") {
        return next.call("handle", req);
    }
    
    if (jwt) {
        if(req.url != "http://localhost:8080/login"){
            const cloned = req.clone({
                headers: req.headers.set("Authorization",
                    "Bearer " + jwt)
            }); 
            return next.call("handle", cloned);   
        }               
    }
    return next.call("handle", req);
};
