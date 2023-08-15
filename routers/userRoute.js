import express  from "express";
import {
    getAllBookings,
    bookVisit,
    createUser,
    cancelBooking,
    toFav,
    allFavResidencies
} from "../controller/userCntrl.js";
const router = express.Router();

router.post("/register", createUser)
router.post("/bookVisit/:id",bookVisit)
router.post("/allBookings", getAllBookings)
router.post("/removeBooking/:id",cancelBooking)
router.post("/tofav/:rid", toFav)
router.post("/allFav",allFavResidencies)



export {router as userRouter};