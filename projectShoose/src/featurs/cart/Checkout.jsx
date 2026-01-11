import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../user/Login.css";
import { clearCart } from "./cartSlice";


export default function Checkout(){
    let navigate=useNavigate();
    let disp=useDispatch();
    let [address,setAddress]=useState();
    let current=localStorage.getItem( "currentUser")
    let user=JSON.parse(current)
    let arr=useSelector(state=>state.c.arr);
    let { register, formState, handleSubmit } = useForm();
    console.log(user)
    useEffect(()=>{
        if(!current)
            navigate("/login")
    },[current])

    const saveOrderInServer=(e)=>{
        // e.preventDefault();

        axios.post("http://localhost:5003/order/",{
            idusers:user.idusers,
            address:address,
            products:arr,
            orderdate:new Date()
        },
        {
            headers: {
                authorization: current?.token
            }   
        }
        ).then(res=>{
            
            alert("הזמנה בוצעה בהצלחה")
            disp(clearCart())
           navigate("/list")
        }).catch(err=>{
            console.log(err)
            alert("שגיאה בהוספת ההזמנה"+err.response.data)
        })
    }

       
    return <form  onSubmit={handleSubmit(saveOrderInServer)} style={{marginTop:"15vh"}}>
    <h2>:לסיום ההזמנה</h2>

<input className="logininput" type="text" placeholder="כתובת" {...register("address",{required:{value:true,message:"שדה חובה"}})} onChange={(e) => {setAddress(e.target.value)}}/>
    {formState.errors.address&&<div  style={{color: "red" }}>{formState.errors.address.message}</div>}
<br />
<input style={{backgroundColor:" #1976d2",color: "black",padding:"5px",borderRadius:"10px",fontSize: "1vw"}} type="submit"  />
<br />
{/* <Link  style={{backgroundColor:" #1976d2",color: "black",padding:"5px",borderRadius:"10px",fontSize: "2vw"}}  to="/checkout" >לתשלום </Link> */}
</form>
}