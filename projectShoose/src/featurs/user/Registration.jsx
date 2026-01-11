import { data } from "@remix-run/router";
import axios from "axios";
import { useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { userIn } from "u:/ו תכנות/react/קוד שיעור פרוויקט שלב 3/src/features/user/userslice";
import "./Login.css"
export const  Registration=()=>{
let {register,handleSubmit,formState:{errors}}=useForm()
let disp=useDispatch();
const sendToServer=(data)=>{
    alert("שליחה שלרת")
    axios.post("http://localhost:5003/user",data)
    .then(res=>{
        alert("משתמש נוסף בהצלחה")
        console.log(res.data);
        disp(userIn(res.data))
    }).catch(err=>{
        console.log(err)
        alert("שגיאה בהוספת משתמש"+err.response.data)
    })
}

 return <form onSubmit={handleSubmit(sendToServer)} style={{ display: "flex", flexDirection: "column" , flexWrap:"wrap",    alignItems: "center" ,   width: "20%", marginLeft: "35%",marginTop:"10%",textAlign:"center"}}>
    <h2>
        !הרשם אלינו עכשיו
    </h2>
    <label >הקש שם מלא</label>
    <input className="logininput" type="text" {...register("name", {
         required: { value: true, message: "שדה חובה" },
          })} />
          {errors.name && <div className="logininput" style={{ backgroundColor: "red" }}>
            {errors.name.message}
        </div>}
    
   
    <label >הקש סיסמה</label>
    <input className="logininput" {...register("pass", {
            required: { value: true, message: "סיסמא היא חובה" },
            pattern: {
                value: /[A-Z]{1,}/&&/[a-z]{1,}/&&/[0-9]{1,0}/&&/[!*@$&]{1,}/, message: " אות גדולה אות קטנה מספר וסימן"
            }

        })} type="text" />
        {errors.pass && <div className="logininput" style={{ backgroundColor: "red" }}>
            {errors.pass.message}
        </div>}

    <label >הקש מייל</label>
    <input className="logininput" type="text"{...register("mail",{
        required:{value:true,message:"שדה חובה" },
        pattern:{
            value:/^[A-Za-z0-9]{2,}@(gmail|012).com$/,message:"מייל לא תקין הקש אות ומספר והמשך של מייל  "
        }})}  />
        {errors.mail && <div className="logininput" style={{ backgroundColor: "red" }}>
            {errors.mail.message}</div>}
  
    <label >הקש מספר טלפון</label>
    <input className="logininput"  type="text"{...register("phone")} />
    <br />
    <input className="submit" type="submit" />

</form>
}

    
   
