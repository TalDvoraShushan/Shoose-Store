import { Router } from "express";
import {getAllcategory}from"../controller/category.js";

const router=Router();

router.get("/",getAllcategory)

export default router;