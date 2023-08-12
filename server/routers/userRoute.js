import express  from "express";
import {getAllBookings, bookVisit, createUser, cancelBooking} from "../controller/userCntrl.js";
const router = express.Router();

router.post("/register", createUser)
router.post("/bookVisit/:id",bookVisit)
router.post("/allBookings", getAllBookings)
router.post("/removeBooking/:id",cancelBooking)



export {router as userRouter};