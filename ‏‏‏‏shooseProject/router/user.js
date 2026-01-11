import { Router } from "express";
import { checkAdmin, checkToken } from "../utils/help.js";
import {getAllUsers,getUserById,update,login,addUser} from"../controller/user.js";

const router=Router();

router.get("/",checkAdmin,getAllUsers)
router.get("/:id",checkAdmin,getUserById)
router.put("/:id",checkToken,update)
router.post("/login",login)
router.post("/",addUser)

export default router;