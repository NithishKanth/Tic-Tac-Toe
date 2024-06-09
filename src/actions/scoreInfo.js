"use server";

import ScoreCardModel from "@/models/Scorecard";
import { getServerSession } from "next-auth";
import mongoose from "mongoose";
import { authOption } from "@/pages/api/auth/[...nextauth]";

export async function Score(){
    await mongoose.connect(process.env.MONGODB_URI);
    const session = await getServerSession(authOption);
    const email = session?.user?.email || "";
    
    let score = await ScoreCardModel.findOne({email});

    if(!score){
        score = await ScoreCardModel.create({email});
    }
    return (score.toObject());
}