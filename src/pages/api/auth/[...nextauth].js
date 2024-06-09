import clientPromise from "@/lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth/next";
import GoogleProvider from 'next-auth/providers/google';

export const authOption = {
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_ID,
            clientSecret:process.env.GOOGLE_SECRET
        })
    ],
    adapter:MongoDBAdapter(clientPromise)
}

export default NextAuth(authOption)