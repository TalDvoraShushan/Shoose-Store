
import { createSlice } from "@reduxjs/toolkit";

const init={
    arr:[],
    sumproduct:0,
    sumprice:0,
    isShow:false
}
const cartSlice=createSlice({
    initialState:init,
    name:"cart",
    reducers:{
        closeOpen:(state,action)=>{
            state.isShow=false;
        },
        addItem:(state,action)=>{
            let product=state.arr.find(item=>item.idproducts==action.payload.idproducts);
            state.isShow=true;
           
            if(!product)
            {
                let it={...action.payload,qty:1};
                state.arr.push(it);
                state.sumproduct++;
                state.sumprice+=it.price;
            }
            else{
                product.qty++;
                state.sumproduct++;
                state.sumprice+=product.price;
            
            } 
            localStorage.setItem("cart",JSON.stringify(state.arr));
            localStorage.setItem("sumproduct",JSON.stringify(state.sumproduct));
            localStorage.setItem("sumprice",JSON.stringify(state.sumprice));
        },
        remove:(state,action)=>
        {
            let index=state.arr.findIndex(item=>item.idproducts==action.payload.idproducts);
            state.arr.splice(index,1);
            state.sumproduct-=action.payload.qty;
            state.sumprice-=action.payload.price*action.payload.qty;   
            localStorage.setItem("cart",JSON.stringify(state.arr))
            localStorage.setItem("sumproduct",JSON.stringify(state.sumproduct));
            localStorage.setItem("sumprice",JSON.stringify(state.sumprice));
          
        },
        removeItem:(state,action)=>{
            let prod=state.arr.find(item=>item.idproducts==action.payload.idproducts)
            if(prod.qty==1)
            {
                let index=state.arr.findIndex(iteme=>iteme.idproducts==action.payload);
                state.arr.splice(index,1);
                state.sumproduct--;
                state.sumprice-=prod.price;
            }
            else{
                prod.qty--;
                state.sumproduct--;
                state.sumprice-=prod.price;
            }
            localStorage.setItem("cart",JSON.stringify(state.arr))
            localStorage.setItem("sumproduct",JSON.stringify(state.sumproduct));
            localStorage.setItem("sumprice",JSON.stringify(state.sumprice));
        },
        clearCart:(state,action)=>{
           localStorage.removeItem("cart")
           localStorage.removeItem("sumproduct")
           localStorage.removeItem("sumprice")
           state.arr=[];
           state.sumprice=0;
           state.sumproduct=0

        },
        startCart:(state,action)=>{
            state.arr=action.payload;
            state.sumprice=JSON.parse(localStorage.getItem("sumprice"))
            state.sumproduct=JSON.parse(localStorage.getItem("sumproduct"))
        }
    }
})
export default cartSlice.reducer;
export const{addItem, remove,removeItem,closeOpen,clearCart,startCart}=cartSlice.actions