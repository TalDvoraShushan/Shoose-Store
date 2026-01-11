import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import One from "./One";
import './ProductList.css';
import LittleCart from "./LittleCart";
import { useSelector } from "react-redux";
import Windows from "./Windows";
import { Pagination } from "@mui/material";

export default function ProductList() {
    let [arr, setArr] = useState([]);
    let [numbutt, setNumbutt] = useState(1);
    let [currentNumPage, setCurrentNumPage] = useState(1);

    function deleteFromList(id){
        let copyarr=[...arr];
        let index=copyarr.findIndex(i=>i.idproducts==id)
        copyarr[index].isActive="0";
        setArr(copyarr);
    }
  
  
    useEffect(() => {
        axios.get("http://localhost:5003/product/numpages?perpage=3")
            .then(res => {
                // console.log(res)
                setNumbutt(res.data.totalPages)
            })
            .catch(err => {
                console.log(err)
                alert("תקלה בשליפת כמות העמודים" + err.message)
            })
    }, [])

    useEffect(() => {
        getProductsByPage(1)
    }, [])
    function getProductsByPage(numPage) {
        if (numPage > numbutt)
            return;
        axios.get(`http://localhost:5003/product?page=${numPage}&perpage=3`)
            .then(res => {
                // console.log(res);
                setArr(res.data);
            })
            .catch(err => {
                console.log(err)
                alert("תקלה בשליפת המוצרים" + err.message)

            })
    }
 
    let isShow = useSelector(state => state.c.isShow);
    // console.log(arr)
    return <div >
        {isShow&& <Windows/>}
        
        <ul className="all-products">
            {arr.map(item => {
                if(item.isActive=="1")
                    return <li deleteFromList={deleteFromList} key={item.idproducts}><One  x={item}  /></li>
            })}
        </ul>
      
        <Pagination className="pages" variant="outlined" shape="rounded" color="primary" count={numbutt} page={currentNumPage} onChange={(e, value) => { 
         setCurrentNumPage(value);
         getProductsByPage(value)
     }} />
    </div>

}