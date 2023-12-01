import axios from "axios";
import { CheckLogin } from "../../../auth/auth";
import { useCookies } from "react-cookie";

export default function Nav(){
    const isLogin = CheckLogin();
    const [cookies, setCookie, removeCookie] = useCookies(['x_auth']);
    const onClickLogoutBtn = async (data) => {
        console.log(data)
        const result = await axios.get("http://localhost:4000/api/users/logout", {withCredentials: true});
        if(result) {
           
            setCookie("x_auth", null);
        }
        console.log(result);
    }
    return (
        <>
        <nav>
            <a href={`/`}>Home</a>
            <a href={`/about`}>About</a>
            <a href={`/booking`}>Booking</a>
            {
            isLogin ? <button onClick={onClickLogoutBtn}>Logout</button> : 
            <>
              <a href={`/register`}>Register</a>
              <a href={`/login`}>Login</a>
            </>
            }
            
        </nav>
        </>
    )
}