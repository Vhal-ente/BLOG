import express,{ Request,Response } from "express";
import { loginUser, logoutUser, registerUser } from "../controller/userController";
import { auth } from '../middleware/auth';

const router = express.Router()

router.post('/register', registerUser)
router.post('/login',loginUser)
router.get('/logout',logoutUser)
// router.get('/getusers', getusers)

export default router;

