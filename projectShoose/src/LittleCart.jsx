import { useSelector } from "react-redux"
import "./LittleCart.css"



export default function CartList() {

    let a = useSelector(state => state.c.arr);
    let sp = useSelector(state => state.c.sumproduct);
    let sc = useSelector(state => state.c.sumprice);

    return <div className="divlitellecart">
        <h1>סל הקניות שלי</h1>
        {a.length == 0 ? "אין מוצרים בסל" :
       
            <ul >
               { a.map(item => 
                <li className="littlecart" key={item.idproducts}>
                    <p>{item.price}₪</p>
                    <p>{item.pname}</p>
                    <img className="imglittele" src={`images/${item.imgUrl}`}  />
                    
                </li>)}
            </ul> }
            <div className="divsum">
        <h3>סה"כ מחיר כולל : {sc}₪</h3>
        <h3>כמות מוצרים : {sp}</h3></div>
    </div>

}