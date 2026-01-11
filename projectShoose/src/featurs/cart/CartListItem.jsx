import { useDispatch } from "react-redux"
import { addItem, remove, removeItem } from "./cartSlice";
import "./CartListitem.css"

export default function CartListItem({ item }) {
    let disp = useDispatch();

    return <div className="cart" >
       
        
        <img src={`images/${item.imgUrl}`} className="imglittele" />
        <p>{item.pname}</p>
        <p>מחיר: {item.price}₪</p>
        <p>מידה : {item.size}</p>
        <p>כמות : {item.qty}</p>
        <p>סה"כ : {item.price*item.qty}₪ </p>
        <input type="button"  value="-" onClick={()=>disp(removeItem(item))}  />
        <input type="button"  value="🗑" onClick={()=>disp(remove(item))}  />
        <input type="button" value="+" onClick={()=>disp(addItem(item))} />
       
    </div>

}