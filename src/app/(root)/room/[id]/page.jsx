"use client";

import GameRoom from '@/components/GameRoom';
import useGetRoom from '@/hooks/useGetRoom'
import useGetUser from '@/hooks/useGetUser';
import { useParams } from 'next/navigation';

import React, { useEffect, useState } from 'react'

const page = () => {

  const [user,setUser]  = useState([]);
  useEffect(()=>{
    const Fetch = async ()=>{
      const user = await useGetUser();
      setUser(user);
    }
    Fetch();
  },[])
  const id = useParams();
  const { room,loading } =  useGetRoom(id);
  if(loading){
    return <div className='w-screen h-screen flex items-center justify-center text-[50px]'>Loading...</div>
  }
  const { player1 , player2 } = room[0];
  if(player1!==player2){
    return <div className='w-screen h-screen flex items-center justify-center text-[50px] text-center'>Waiting for<br></br> the other player....<br></br>Room Number: {id.id}</div>
  }else{
    return(
      <GameRoom 
        room={room[0]} 
        id={id}
        user={user}
      />
    )
  }
}

export default page