'use client'

import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import { useRouter } from 'next/navigation';
import { database } from '@/app/firebaseConfig';
import { players } from '@/constants';
import { get, ref, update } from 'firebase/database'; 
import useGetUser from '@/hooks/useGetUser';

const Hero = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [number,setNumber] = useState("");
  const [message,setMessage] = useState("");
  const roomref = ref(database, 'Games');
  const [user,setUser] = useState({});

  useEffect(()=>{
    const Fetch = async ()=>{
      const user = await useGetUser();
      setUser(user);
    }
    Fetch();
  },[]);

  const CreateRoom = async () => {
    setIsLoading(true);
    try {
      let number = Math.floor(1000 + Math.random() * 9000);
      let roomExists = true;

      while (roomExists) {
        const slots = await get(roomref);
        if (slots.exists()) {
          const rooms = Object.entries(slots.val()).filter((room) => room[0] == number).flat();
          if (rooms.length === 0) {
            roomExists = false;
          } else {
            number = Math.floor(1000 + Math.random() * 9000);
          }
        } else {
          roomExists = false;
        }
      }
      const newRoomRef = ref(database, `Games/${number}`);
      await update(newRoomRef, {...players,createdBy:[{...user}],power:user.name});
      router.push(`/room/${number}`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };


  const JoinRoom = async ()=>{
    const slot = await get(roomref);
    if(slot.exists()){
      const room = Object.entries(slot.val())
                      .filter((room) => room[0] == number).flat();
      if(room.length===0){
        setMessage("No Room Found");
      }else{
        const {player2} = room[1];
        if(!player2){
          const newRoomRef = ref(database,`Games/${number}`);
          const oldValue = (await get(newRoomRef)).val();
          await update(newRoomRef, {...oldValue,player2:true,joinedBy:[{...user}]});
          router.push(`room/${number}`);
        }else{
          setMessage("Room Full");
        }
      }
    }
  }

  return (
    <div className='flex hero py-6'>
      <div className='flex items-start flex-col justify-center px-20 herotext'>
        <div className='text-[50px] p1'>Challenge your Friend</div>
        <div className='text-[50px] p1'>With</div>
        <div className='text-[50px] mb-9 p1'>
          <span className='text-[#0d0a38] font-bold'>X</span>
          <span className='text-red-700 font-bold'>O</span> Game
        </div>
        <input type="text"  
          className='w-full border-2 border-black rounded-2xl px-3 py-2 text-2xl mb-3' 
          placeholder='Enter the Room Number'
          value={number}
          onChange={(e)=>{
            setNumber(e.target.value);
          }}
        />
        {message && <div className='text-2xl py-3'>{message}</div>}
        <div className='flex gap-3'>
          <button 
            className='bg-[#0d0a38] text-white py-3 px-7 rounded-xl' 
            onClick={CreateRoom} 
            disabled={isLoading}
          >
            {isLoading ? 'Creating Room...' : 'Play a game'}
          </button>
          <button className='bg-red-800 text-white py-3 px-7 rounded-xl' onClick={()=>{
            JoinRoom();
          }}>
            Join a Room
          </button>
        </div>
      </div>
      <div className='flex-1 flex justify-center items-center mb-3'>
        <Banner />
      </div>
    </div>
  );
};

export default Hero;
