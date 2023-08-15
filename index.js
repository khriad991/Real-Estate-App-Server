
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import {userRouter} from "./routers/userRoute.js";
import {residencyRouter} from "./routers/residencyRouter.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
    res.send(
        `
    <h1 
        style='background-color: aliceblue; 
        display: flex;
        justify-content: center; 
        align-items: center; 
        width: 100vw;
        height: 100vh; 
        text-transform: capitalize;
        color:indigo;
        font-size: 50px; 
        font-weight: bolder;'>
        Welcome to Our Real State App 
    </h1>`)
})

app.listen(port, (err)=>{
    console.log(`Server is running on port http://localhost:${port}`)
    console.log(err)
})


// all Routes file
app.use("/api/user", userRouter)
app.use("/api/residency", residencyRouter )