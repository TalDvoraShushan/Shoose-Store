import express from "express";
import dotenv from "dotenv";
import cors from "cors"

import productRouter from "./router/product.js";
import userRouter from "./router/user.js";
import orderRouter from "./router/order.js";
import categoryRouter from "./router/category.js";

dotenv.config();

const app=express()

app.use(cors());
app.use(express.json())

app.use("/product",productRouter)
app.use("/user",userRouter)
app.use("/order",orderRouter)
app.use("/category",categoryRouter)

const port=process.env.PORT;

app.listen(port,"localhost",()=>{
    console.log("app is running on port"+ port)
});