import express from "express";
import {User} from "../models/user.js"
import {login , getAllUsers , register , getMyProfile , logout} from "../controllers/user.js"
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router()

router.get("/all" , getAllUsers)

router.post("/new" , register)

router.post("/login" , login) 

router.get("/logout" , logout)

router.get("/me" , isAuthenticated , getMyProfile) //Whenever "next" is called in isAuthenticated then getMyProfile is called otherwise not 
// .put(updateUser)
// .delete(deleteUser)


// router.get("/userid/special" , specialFunc)

// router.get("/userid/:id" , getUserDetails)


export default router