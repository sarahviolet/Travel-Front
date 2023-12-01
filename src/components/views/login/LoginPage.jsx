/*
Created By: Sarah Yun
Modified By: Sarah Yun, Nov/30/2023
*/

import axios from "axios";
import { useForm } from "react-hook-form";
import { LoginAuthGuard } from "../../../auth/auth";

export default function LoginPage(){

    LoginAuthGuard();

    const {register, setValue, watch ,handleSubmit} = useForm();

    const onClickSubmitBtn = async (data) => {
        console.log(data)
        const result = await axios.post("http://localhost:4000/api/users/login", data, {withCredentials: true});
        console.log(result);
        document.location.href = "/"
    }
    return (
        <>
        <div>
            <label htmlFor="email">Email</label>
            <input type="text" {...register("email")}/>
            <label htmlFor="password">Password</label>
            <input type="password" {...register("password")}/>
            <button onClick={handleSubmit(onClickSubmitBtn)}>Login</button>
        </div>
        </>
    )
}