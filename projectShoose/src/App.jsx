import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import AddProductForm from './AddProductForm'
import ProductList from './ProductList'
import CartList from './featurs/cart/cartList'
import NavBar from './NavBar'
import { Route, Routes } from 'react-router-dom'
import { Registration } from './featurs/user/Registration'
import { LogIn } from './featurs/user/LogIn'
import Checkout from '../src/featurs/cart/Checkout'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { userIn } from './featurs/user/user'
import { startCart } from './featurs/cart/cartSlice'

function App() {
  let disp=useDispatch()
  useEffect(()=>{
    let u=localStorage.getItem("currentUser")
    console.log(u)
    console.log(localStorage)
    if(u!="undefined"&&u!=null&&u!=undefined){
      let user=JSON.parse(u)
      console.log(user)
      disp(userIn(user))
    }
    let c=localStorage.getItem("cart");
    if(c){
      disp(startCart(JSON.parse(c)))
    }

})

  return (<>
    <NavBar />
    <Routes>
      <Route path='add' element={<AddProductForm />} />
      <Route path='list' element={<ProductList />} />
      <Route path='cart' element={<CartList />} />
      <Route path='' element={<ProductList />} />
      <Route path="login" element={<LogIn />} />
      <Route path="checkout" element={<Checkout/>}/>
      <Route path="reg" element={<Registration />} />
      <Route path='' element={<ProductList />} />
    </Routes>
  </>
  )
}

export default App
