import asyncHandler from "express-async-handler";
import {prisma} from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async(req,res)=>{
    const {title, description, price, address, country, city, facilities, image, userEmail} = req.body.data; // data meins all propaty value is data
    console.log(req.body.data)

    try {
            const residency = await prisma.residency.create({
                data: {
                    title,
                    description,
                    price,
                    address,
                    country,
                    city,
                    facilities,
                    image,
                    owner: { connect: { email: userEmail } },
                },
            });

            res.send({ message: "Residency created successfully", residency });
    } catch (err) {
        if(err.code === "P2002"){
            throw new Error("A Residency with address already there")
        }
        throw new Error(err.message)
    }
})


//function to get all residencies/document
export const getAllResidencies = asyncHandler(async(req,res)=>{
    const residencies = await prisma.residency.findMany({
        orderBy:{
            createAt:"desc"
        }
    })
    res.send(residencies);
})


//function to get specific residency/document
 export const getResidency = asyncHandler(async(req,res)=>{

     const {id}= req.params;
     try{
         const residency = await prisma.residency.findUnique({
             where:{id}// id: id ---- it's es6 syntax in javaScript;
         })
         res.send(residency)
     }
     catch(err){
         throw new Error(err.message)
     }
 })