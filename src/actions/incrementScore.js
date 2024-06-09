"use server";


import mongoose from "mongoose";
import ScoreCardModel from "@/models/Scorecard";

export async function incrementScore(email) {
    await mongoose.connect(process.env.MONGODB_URI);
    await ScoreCardModel.findOneAndUpdate(
        {email},
        { $inc : { score : 1 }},
        { new : true}
    )
}