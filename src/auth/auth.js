import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const AuthGuard = () => {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['x_auth']);
    console.log(cookies.x_auth);
    useEffect(()=>{
        if(!cookies.x_auth) {
            navigate("/login", { replace: true, state: {} })
        }
    }, [])
    
}

export const LoginAuthGuard = () => {
    const navigate = useNavigate()
    const [cookies, setCookie, removeCookie] = useCookies(['x_auth']);
    console.log(cookies.x_auth);
    useEffect(()=>{
        if(cookies.x_auth) {
            navigate("/", { replace: true, state: {} })
        }
    }, [])
}


export const CheckLogin = () => {
    let result = true;

    const [cookies, setCookie, removeCookie] = useCookies(['x_auth']);
    console.log(cookies.x_auth);
    if(!cookies.x_auth) {
        result = false;
    }

    return result;
}