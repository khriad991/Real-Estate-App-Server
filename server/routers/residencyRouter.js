import express from "express";
import {createResidency, getAllResidencies, getResidency} from "../controller/redenCntrl.js";
const router = express.Router();

router.post("/create", createResidency);
router.get("/allresd", getAllResidencies);
router.get('/:id',getResidency);






export {router as residencyRouter};