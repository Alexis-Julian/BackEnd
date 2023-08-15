import mongoose from "mongoose";

const ticketcollection = "tickets"


const Ticket = new mongoose.Schema({
    code:{type:String,unique:true}, 
    purchase_datetime:{
        type:Date,default:Date.now
    },
    amount:{type:Number},
    purchaser:{type:String}
})