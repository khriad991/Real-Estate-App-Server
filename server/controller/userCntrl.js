import asyncHandler from 'express-async-handler';
import {prisma } from '../config/prismaConfig.js';

export const createUser = asyncHandler(async(req,res)=>{
    let  {email} =req.body
    const UserExists = await prisma.user.findUnique({where:{email:email}})
    if(!UserExists){
        const user = await prisma.user.create({ data: req.body })
        res.send({
            message: "User Registered Successfully",
            user:user,
        })
    }else res.status(201).send({message:"User Already Exists"})

})

// function to book a visit to read
export const bookVisit = asyncHandler(async (req,res)=>{
    const {email, date } = req.body
    const {id} = req.params;

    try{
        const alreadyBooked = await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits:true}
        })

        if(alreadyBooked.bookedVisits.some((visit)=>visit.id === id)){
            res.status(400).json({
                message:"This Residency is already booked by you"
            })
        }
        else{
                await prisma.user.update({
                    where:{email},
                    data: {
                        bookedVisits : {push :{id, date}}
                    }
                })

                res.send("your visit is booked successfully")
        }



    }
    catch(err){
        throw new Error(err.message)
    }


})


// function to get all bookings
export const getAllBookings = asyncHandler(async (req,res)=>{
    const {email} = req.body

    try{
        const bookings = await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits:true},
        })
        res.status(200).send(bookings)
    }
    catch(err){
        throw new Error(err.message)
    }

})

//function to cancel the booking
export const cancelBooking = asyncHandler(async (req,res)=>{
    const { email } = req.body;
    const { id } = req.params;
    try{
        const user = await prisma.user.findUnique({
            where: { email: email },
            select: { bookedVisits: true },
        });
        const index = user.bookedVisits.findIndex((visit) => visit.id === id);
        if (index === -1) {
            res.status(404).json({ message: "Booking not found" });
        }
        else {
            user.bookedVisits.splice(index, 1);
            await prisma.user.update({
                where: { email },
                data: {bookedVisits: user.bookedVisits},
            });
            res.send("Booking cancelled successfully");
        }
    }
    catch(err){
        throw new Error(err.message )
    }

})

// fuction to add favarite bookiing list

export const toFav = asyncHandler(async (req,res)=>{
    const {email}= req.body;
    const {id} = req.params;
    try{


    }
    catch(err){
        throw new Error(err.message);
    }
})

