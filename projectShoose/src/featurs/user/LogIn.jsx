import { data } from "@remix-run/router";
import axios from "axios";
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import './Login.css'
import { userIn } from "./user";

export const  LogIn=()=>{
let {register,handleSubmit,formState:{errors}}=useForm()
let disp=useDispatch();
const sendToServer=(data)=>{
    alert("שליחה שלרת")
    axios.post("http://localhost:5003/user/login",data)
    .then(res=>{
        alert("שלום ל"+res.data.name)
        console.log(res.data);
        disp(userIn(res.data))
    }).catch(err=>{
        console.log(err)
        alert("שגיאה בשם משתמש או סיסמה"+err.response.data)
    })
}

 return <form onSubmit={handleSubmit(sendToServer)} style={{ display: "flex", flexDirection: "column" , flexWrap:"wrap",    alignItems: "center" ,   width: "20%", marginLeft: "35%",marginTop:"15%",textAlign:"center"}}>
    <h2>!התחבר עכשיו</h2>
    <label >הקש שם משתמש</label>
    <input className="logininput" {...register("name",{required:{value:true,message:"שדה חובה" }})} type="text" />
    {errors.name && <div className="logininput" style={{ backgroundColor: "red" }}>
            {errors.name.message}</div>}
    <label >הקש סיסמה</label>
    <input className="logininput" {...register("pass",{required:{value:true,message:"שדה חובה" }})} type="text" />
    {errors.pass && <div className="logininput" style={{ backgroundColor: "red" }}>
            {errors.pass.message}</div>}
   <br />
    <input className="submit" type="submit" />

</form>
}