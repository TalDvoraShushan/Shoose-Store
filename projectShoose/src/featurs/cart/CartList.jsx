import { useSelector } from "react-redux"
import { Link } from "react-router-dom";
import CartListItem from "./CartListItem";
import "./CartListItem.css"


export default function CartList() {

    let a = useSelector(state => state.c.arr);
    let sp = useSelector(state => state.c.sumproduct);
    let sc = useSelector(state => state.c.sumprice);

    return <div>
        <h1>סל הקניות שלי</h1>
        {a.length == 0 ? "אין מוצרים בסל" :
       
            <ul id="allProd">
               { a.map(item => <li  key={item.idproducts}><CartListItem item={item} /></li>)}
            </ul> }
        <h3>סה"כ מחיר כולל : {sc}</h3>
        <h3>כמות מוצרים : {sp}</h3>
        {a.length > 0 && <Link  style={{backgroundColor:" #1976d2",color: "black",padding:"5px",borderRadius:"10px",fontSize: "2vw"}}  to="/checkout" >לתשלום </Link>}
    </div>

}