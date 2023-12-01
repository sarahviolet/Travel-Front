import axios from "axios";
import { useForm } from "react-hook-form";
import { LoginAuthGuard } from "../../../auth/auth";

export default function RegisterPage(){
    LoginAuthGuard();

    const {register, setValue, watch ,handleSubmit} = useForm();

    const onClickSubmitBtn = async (data) => {
        console.log(data)
        const result = await axios.post("http://localhost:4000/api/users/register", data, {withCredentials: true});
        console.log(result);
        if(result) {
            document.location.href = "/login"
        }
    }

    return (
        <>
        <div>
            <label htmlFor="firstname">First Name</label>
            <input type="text" {...register("firstname")}/>
            <label htmlFor="lastname">Last Name</label>
            <input type="text" {...register("lastname")}/>
            <label htmlFor="email">Email</label>
            <input type="text" {...register("email")}/>
            <label htmlFor="password">Password</label>
            <input type="password" {...register("password")}/>
            <button onClick={handleSubmit(onClickSubmitBtn)}>Register</button>
        </div>
        </>
    )
}