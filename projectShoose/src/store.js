import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./featurs/cart/cartSlice"
import userSlice from "./featurs/user/user"

export const store=configureStore({
    reducer:{
        c:cartSlice,
        u:userSlice
    }
})