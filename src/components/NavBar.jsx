import { getServerSession } from "next-auth";
import { authOption } from "@/pages/api/auth/[...nextauth]";
import Link from "next/link";
import User from "./User";

const NavBar = async () => {
  const session = await getServerSession(authOption);
  return (
    <div className='w-full bg-[#0d0a38] py-5 flex text-white sm:justify-between px-8 items-center sticky top-0 justify-center z-50'>
        <div className='text-3xl text-center'>Tic-Tac-Toe</div>
        <div className='sm:flex sm:gap-8 sm:text-[20px] hidden'>
            {(session)?
              <User session={session}/>
                :
              <Link href={'/api/auth/signin'} className='bg-white text-black px-5 py-2 rounded-xl'>Login</Link>
            }
        </div>
    </div>
  )
}

export default NavBar