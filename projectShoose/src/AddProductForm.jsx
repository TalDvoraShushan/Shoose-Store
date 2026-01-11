import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Button } from "@mui/material";
import './AddProductForm.css'

export default function AddProductForm() {
    let { register, formState, handleSubmit } = useForm();
    let user=useSelector(state=>state.u.currentUser)
    let [categories, setCategories] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5003/category")
        .then(res => { setCategories(res.data) })

        .catch(err => { alert("error in adding prod " + err.response.data) })
    } , [])
    
    const save = (data) => {
        alert(data)
        console.log(data)

        axios.post("http://localhost:5003/product", data,{
            headers:{
                authorization:user?.token
            }
        })
            .then(res => {
                console.log(res);
                alert("מוצר נוסף בהצלחה קיבל קוד  " + res.data.id)

            }).catch(err => {
                alert("error in adding product " + err.response.data)
                console.log(err);
            })
    }

    const categorys = [
        {
        value: '1',
        label: 'סניקרס',
      },
      {
        value: '2',
        label: 'מגפיים',
      }
    ];
    

    return <> <h2> : מלא פרטי מוצר</h2>
    <form className="addM" >
        <div style={{display:"flex"}}><TextField label="שם מוצר" className="TF" style={{margin:"15px"}} {...register("pname",{required:{value:true,message:"שדה חובה"}})}></TextField>
        <br />{formState.errors.pname&&<div style={{color: "red" ,width:"5vw" ,height:"2.5vh" }}>{formState.errors.pname.message}</div>}
        <TextField label="מחיר" className="TF" style={{margin:"15px"}}{...register("price",{required:{value:true,message:"שדה חובה"}})}></TextField>
        {formState.errors.price&&<div style={{color: "red" ,width:"5vw",height:"2.5vh"}}>{formState.errors.price.message}</div>}</div>

        <div style={{display:"flex"}}><TextField label="תיאור" className="TF" style={{margin:"15px"}} {...register("discrep",{required:{value:true,message:"שדה חובה"}})}></TextField>
        <br />{formState.errors.discrep&&<div style={{color: "red" ,width:"5vw" ,height:"2.5vh" }}>{formState.errors.discrep.message}</div>}
        <TextField label="מידה" className="TF" style={{margin:"15px"}} {...register("size",{required:{value:true,message:"שדה חובה"}})}></TextField>
        <br />{formState.errors.size&&<div style={{color: "red" ,width:"5vw" ,height:"2.5vh" }}>{formState.errors.size.message}</div>}</div>
    
        
        
        <div style={{display:"flex"}}><TextField label="תאריך ייצור" className="TF" style={{margin:"15px"}} type="date" variant="outlined"slotProps={{inputLabel: {shrink: true,},
        }}{...register("createdate",{required:{value:true,message:"שדה חובה"}})}></TextField>
        <br />{formState.errors.createdate&&<div style={{color: "red" ,width:"5vw" ,height:"2.5vh" }}>{formState.errors.createdate.message}</div>}
        <TextField label="צבע" className="TF" style={{margin:"15px"}} {...register("color",{required:{value:true,message:"שדה חובה"}})}></TextField>
        <br />{formState.errors.color&&<div style={{color: "red" ,width:"5vw" ,height:"2.5vh" }}>{formState.errors.color.message}</div>}
        <Box
        component="form"
   
        noValidate
        autoComplete="off">
        
        </Box>
        </div>
        <div style={{display:"flex"}}><Box
        component="form"
   
        noValidate
        autoComplete="off">
        <div>
            <TextField
            className="TF"
            style={{margin:"15px"}}
            select
            label="קטגוריה"
            defaultValue=""
            {...register("categoryid",)}
            >
            {categorys.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
            ))}
            </TextField>
        </div>
        </Box>
        
        <TextField label="ניתוב תמונה" className="TF" style={{margin:"15px"}} {...register("imgUrl")}></TextField></div>
        <Button style={{backgroundColor:" #1976d2",color: "black",fontFamily:"system-ui",fontSize: "1vw"}} 
        variant="contained" onClick={handleSubmit(save)}>שליחה</Button>

    </form></>
}