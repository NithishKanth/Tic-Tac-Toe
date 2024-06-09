"use client"

import React, { useEffect, useState } from 'react'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Image from 'next/image'
import { parseFullName } from 'parse-full-name';
import { useRouter } from 'next/navigation';
import { Score } from '@/actions/scoreInfo';

const User = ({session}) => {
    const [score,setScore] = useState(0);

    const name = session?.user?.name || '';
    const { first:firstName } = parseFullName(name);
    const router = useRouter();
    useEffect(()=>{
        const getScore = async()=>{
            const value = (await Score());
            setScore(value.score);
        }
        getScore();
    },[session]);
  return (
    <div className='flex items-center gap-3'>
        <div className='bg-white px-4 py-2 rounded-xl text-black flex items-center gap-2'>
            <Image src={'/star.svg'} width={30} height={30}/>
            <div>{score}</div>
        </div>
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className='bg-white px-4 py-2 rounded-xl text-black flex items-center gap-1'>
                    <Image src={session?.user.image} width={30} height={30} className='rounded-full'/>
                    <div>{firstName}</div>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white">
                <DropdownMenuItem className="text-red-800 font-semibold" onClick={()=>{
                    router.push("/api/auth/signout?callbackUrl=/")
                }}>LogOut</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  )
}

export default User