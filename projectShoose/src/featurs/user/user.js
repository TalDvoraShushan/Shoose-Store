import { createSlice } from "@reduxjs/toolkit";

const initialState={
    currentUser:null
};
const userSlice=createSlice({
    initialState:initialState,
    name:"user",
    reducers:{
        userIn:(state,action)=>{
            state.currentUser=action.payload;
            localStorage.setItem("currentUser",JSON.stringify(action.payload));
        },
        userOut:(state,action)=>{
            state.currentUser=null;
            localStorage.removeItem("currentUser")
            localStorage.removeItem("cart")
            localStorage.removeItem("sumproduct")
            localStorage.removeItem("sumprice")
        }
    }
})
export default userSlice.reducer;
export const {userIn,userOut}=userSlice.actions