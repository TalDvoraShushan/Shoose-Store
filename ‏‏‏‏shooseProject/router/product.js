import { Router } from "express";
import {getAllProduct,getProductById,getProductByIdcategory,deleteById,add,update,totalPages} from "../controller/product.js";
import { checkAdmin } from "../utils/help.js";

const router=Router();

router.get("/",getAllProduct)
router.get("/numpages",totalPages)
router.get("/:id",getProductById)
router.get("/bycategoryid/:id",getProductByIdcategory)
router.put("/:id",checkAdmin,update)
router.post("/",checkAdmin,add)
router.delete("/:id",checkAdmin,deleteById)

export default router;