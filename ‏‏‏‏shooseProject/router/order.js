import { Router } from "express";
import {getAllOrder,getOrderNotOut,getOrderById,add,update, updateIsOut}from"../controller/order.js";

const router=Router();

router.get("/",getAllOrder)
router.get("/isNotOut/",getOrderNotOut)
router.get("/:id",getOrderById)
router.put("/:id",update)
router.put("/:id",updateIsOut)
router.post("/",add)

export default router;