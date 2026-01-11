import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import DeleteProduct from './DeleteProduct'
import { addItem, closeOpen } from './featurs/cart/cartSlice'
import './One.css'
import EditProduct from "./EditProduct"
import axios from 'axios'

export default function One({ x }) {

  let dispatch = useDispatch()
  let [productForEdit, setProductFromEdit] = useState(null)

  let user = useSelector(state => state.u.currentUser);

  function deleteProduct(data, user) {
    axios.delete("http://localhost:5003/product/" + data.idproducts, {
      headers: {
        authorization: user?.token
      }
    })
      .then(res => {
        console.log(res)
        alert("product " + res.data.idproducts + " deleted successfuli")
      })
      .catch(err => {
        alert("error in deleting product " + err.response.data)
      })

  }


  return <div className="oneProduct">
    <h2>{x.pname}</h2>
    <h4>מחיר: {x.price}₪</h4>
    <h4>מידה: {x.size}</h4>
    <img src={`images/${x.imgUrl}`} className="prodimg" />
    <br />
    {(!user || (user && user.role != "maneger")) &&<input value="🛒" type="button" onClick={() => {
      dispatch(addItem(x)); setTimeout(() => {
        dispatch(closeOpen(x))
      }, 2000);
    }} />}
    {user && user.role == "maneger" && <input value="🖊" type="button" onClick={() => {
      setProductFromEdit(x)
    }} />}
    {productForEdit && <EditProduct item={productForEdit} closeEdit={() => { setProductFromEdit(null) }} />}


    {user && user.role == "maneger" && <input value="🗑" type="button" onClick={() => {
      deleteProduct(x,user)

    }} />}
   

  </div>

}