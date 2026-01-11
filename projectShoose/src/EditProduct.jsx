
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { useSelector } from "react-redux";

import "./EditProduct.css"

export default function EditProduct({ item, closeEdit }) {
    let { register, formState, handleSubmit } = useForm({
        defaultValues: { idproducts:item.idproducts,pname: item.pname, price: item.price,color:item.color,size:item.size,discrep:item.discrep,categoryid:item.categoryid,createdate:item.createdate,imgUrl:item.imgUrl }
    });
    let user = useSelector(state => state.u.currentUser);
    const save = (data) => {
        alert(data)
        console.log(data)
        console.log(data.idproducts)

      axios.put("http://localhost:5003/product/"+data.idproducts,data,{
          headers:{
              authorization:user?.token
          }
      })
            .then(res => {
                console.log(res)
                alert("מוצר התעדכן בהצלחה   " )
            }).catch(err => {
                alert("תקלה בעדכון מוצר" + err.response.data)
                console.log(err)
            })
            closeEdit()
    }
    const cancle=()=>{
        closeEdit()
    }
    let [categories, setCategories] = useState([])
    useEffect(() => {
        axios.get("http://localhost:5003/category")
        .then(res => { setCategories(res.data) })

        .catch(err => { alert("error in adding prod " + err.response.data) })
    }

        , [])

    return <div className="outer"><form  onSubmit={handleSubmit(save)} style={{ display: "flex", flexDirection: "column" }}>
        <label className="editlabel">שם</label>
        <input className="editinput" type="text" {...register("pname", { required: { value: true, message: "שדה חובה" } })} />
        {formState.errors.name && <div style={{ backgroundColor: "red" }}>{formState.errors.name.message}</div>}
        <label className="editlabel">מחיר</label>
        <input className="editinput" type="number" {...register("price", { required: { value: true, message: "שדה חובה מחיר " } })} />
        {formState.errors.price && <div style={{ backgroundColor: "red" }}>{formState.errors.name.message}</div>}

        <label className="editlabel">צבע</label>
        <input className="editinput" type="text" {...register("color")} />
        <label className="editlabel">מידה</label>
        <input className="editinput" type="number" {...register("size")} />

        <label className="editlabel">תיאור</label>
        <input className="editinput" type="text" {...register("discrep")} />
        <label className="editlabel">קטגוריה</label>
        <select  className="editinput" {...register("categoryid")}>
                    {categories.map(item=><option value={item.idcategory} key={item.idcategory}>{item.name}</option>)}
        </select>

        <label className="editlabel">תאריך ייצור</label>
        <input className="editinput" type="date" {...register("createdate")} />
        <label className="editlabel">תמונה</label>
        <input className="editinput" type="text" {...register("imgUrl")} />
       <div>
        <input type="submit" value="עדכן"/>
        <input type="button" onClick={cancle} value="ביטול" />
       </div>
        

    </form></div>
}