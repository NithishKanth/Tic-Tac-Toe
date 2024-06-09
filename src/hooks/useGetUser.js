'use server';

import { authOption } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

const useGetUser =  async () =>{
        const session = await getServerSession(authOption);
        return session?.user;
}
export default useGetUser;