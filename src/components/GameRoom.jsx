"use client";


import { incrementScore } from '@/actions/incrementScore';
import { database } from '@/app/firebaseConfig';
import { ref,get, update, remove } from 'firebase/database';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const GameRoom = ({room,id,user}) => {

  const router  = useRouter();

  const [ Room,setRoom ] = useState(room);  
  const [ loading,setLoading ] = useState(false);
  const [hasIncremented, setHasIncremented] = useState(false);
  const [noWinner, setNoWinner] = useState("");

  useEffect(() => {
    const IncrementScore = async ()=>{
      if (Room.winner && hasIncremented) {
        const { winner, createdBy, joinedBy } = Room;
        await incrementScore(
          winner.includes("x") ? createdBy[0].email : joinedBy[0].email
        )
        setHasIncremented(false); 
      }
    }
    IncrementScore();
  }, [hasIncremented]);

  useEffect(()=>{
    if(Room.exit){
      router.push("/");
    }
    const FetchData = async ()=>{
      const slot = await get(RoomRef);
      setRoom(slot.val());
      if((slot.val())?.indexArr){
        setHasIncremented(true);
      }
    }
    FetchData();
  },[room]);

  useEffect(() => {
    if (!loading && Room) {
      const handleCheck= async ()=>{
        const { pos }  = Room;
        if(pos[0].val===pos[1].val && pos[1].val===pos[2].val && (pos[1].val==="x" || pos[1].val==="o")){
          await update(ref(database,`Games/${id.id}`),{...Room,winner:pos[1].val,gameover:true,indexArr:[0,1,2]});
        }
        if(pos[3].val===pos[4].val && pos[4].val===pos[5].val && (pos[5].val==="x" || pos[5].val==="o")){
          await update(ref(database,`Games/${id.id}`),{...Room,winner:pos[5].val,gameover:true,indexArr:[3,4,5]});
        }
        if(pos[6].val===pos[7].val && pos[7].val===pos[8].val && (pos[7].val==="x" || pos[7].val==="o")){
          await update(ref(database,`Games/${id.id}`),{...Room,winner:pos[7].val,gameover:true,indexArr:[6,7,8]});
        }

        if(pos[0].val===pos[3].val && pos[3].val===pos[6].val && (pos[6].val==="x" || pos[6].val==="o")){
          await update(ref(database,`Games/${id.id}`),{...Room,winner:pos[6].val,gameover:true,indexArr:[0,3,6]});
        }
        if(pos[1].val===pos[4].val && pos[4].val===pos[7].val && (pos[7].val==="x" || pos[7].val==="o")){
          await update(ref(database,`Games/${id.id}`),{...Room,winner:pos[7].val,gameover:true,indexArr:[1,4,7]});
        }
        if(pos[2].val===pos[5].val && pos[8].val===pos[5].val && (pos[5].val==="x" || pos[5].val==="o")){
          await update(ref(database,`Games/${id.id}`),{...Room,winner:pos[5].val,gameover:true,indexArr:[2,5,8]});
        }


        if(pos[0].val===pos[4].val && pos[4].val===pos[8].val && (pos[8].val==="x" || pos[8].val==="o")){
          await update(ref(database,`Games/${id.id}`),{...Room,winner:pos[8].val,gameover:true,indexArr:[0,4,8]});
        }
        if(pos[2].val===pos[4].val && pos[4].val===pos[6].val && (pos[6].val==="x" || pos[6].val==="o")){
          await update(ref(database,`Games/${id.id}`),{...Room,winner:pos[6].val,gameover:true,indexArr:[2,4,6]});
        }
      }
      handleCheck();
    }
  }, [loading, Room]);

  const RoomRef = ref(database,`Games/${id.id}`);

  const handlePlace = async (id) =>{
    if(Room.gameover){
      if(Room?.winner.includes("")){
        setNoWinner("No One Won the Match")
      }
      return;
    }
    setLoading(true);
    const newPos = Room.pos.map((area)=>(area.id===id)?{...area,val:Room.turn}:area);

    const newTurn = ((Room.turn.includes("x"))?"o":"x");

    const ch = await get(RoomRef);
    const values = (ch.val());

    const newPower = ((Room.power.includes(Room.joinedBy[0].name))?Room.createdBy[0].name:Room.joinedBy[0].name);
    await update(RoomRef,{...values,pos:newPos,turn:newTurn,power:newPower})

    get(RoomRef)
      .then((data)=>{
        setRoom(data.val());
        setLoading(false);
      })
  }

  return (
    <div className='w-screen h-screen p-2 flex flex-col items-center gap-5'>
      <div className='text-[40px] text-center p-3'>
        Tic-Tac-Toe
      </div>

      {(Room.winner) && <div className='text-3xl flex gap-2 border-2 border-black px-8 py-3 rounded-[10px]'>
        {(Room.winner==="x")?
          <div>{Room?.createdBy[0].name}</div>
          :
          <div>{Room?.joinedBy[0].name}</div>
        }
         is the Winner!
      </div>}

      {(noWinner) && <div>ja</div>}

      <div className={`board`}
      >
        {Room.pos.map((box,index)=>{
          const {id,val} = box;
          return(
            <div className={
              `place ${(val==="" && Room.power.includes(user.name))?"cursor-pointer":""} 
              ${((Room?.indexArr)?.indexOf(index)!==-1 && Room.gameover)?
                ((user.name).includes(Room.power))?"bg-red-700":"bg-green-700"
                :
                ""
              }
              `
            }
              onClick={()=>{
                if(!Room.power.includes(user.name)) return
                if(val.includes("x") || val.includes("o")){
                  return
                } 
                handlePlace(id);
              }} 
            >
              {(val.includes("x")?
                  <Image src={'/x_icon.svg'} alt='x' width={10} height={10} className='w-full'/>
                    :
                  <></>
              )}
              {(val.includes("o")?
                  <Image src={'/o_icon.svg'} alt='o' width={10} height={10} className='w-full'/>
                    :
                  <></>
              )}
            </div>
          )
        })}
      </div>
      <div className='border-2 border-black rounded-[10px] p-3 flex items-center justify-center gap-3 flex-wrap flex-col lg:flex-row'>
        <div className={`border-2 border-black rounded-[5px] p-2 flex items-center gap-2 ${(Room.turn.includes('o')?" bg-green-700":"")}`}>
          <div>{Room.joinedBy[0].name}</div>
          <Image src={'/o_icon.svg'} width={35} height={35} alt='X'/>
          {(user?.name?.includes(Room.joinedBy[0].name)) && <div className='bg-black text-white px-3 py-1 rounded-[10px]'>You</div>}
        </div>
        <div>Vs</div>
        <div className={`border-2 border-black rounded-[5px] p-2 flex items-center gap-2 ${(Room.turn.includes('x')?" bg-green-700":"")}`}>
          <div>{Room.createdBy[0].name}</div>
          <Image src={'/x_icon.svg'} width={35} height={35} alt='X'/>
          {(user.name.includes(Room.createdBy[0].name)) && <div className='bg-black text-white px-3 py-1 rounded-[10px]'>You</div>}
        </div>
      </div>
    </div>
  )
}

export default GameRoom