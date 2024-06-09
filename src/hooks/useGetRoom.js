import { useEffect, useState } from "react";
import { get,ref,onValue } from 'firebase/database';
import { database } from "@/app/firebaseConfig";

const useGetRoom = ({id}) =>{
    const [room,setRoom] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        const FetchRoom = async () =>{
            try {
                setLoading(true);
                const RoomRef = ref(database,`Games/${id}`);
                const slots = await get(RoomRef);
                setRoom([{...slots.val()}]);
                await onValue(RoomRef,(value)=>{
                    if(value.exists()){
                    setRoom([{...value.val()}]);
                    }
                })
            } catch (error) {
                console.log(error);
            }finally{
                setLoading(false);
            }
        }
        FetchRoom();
    },[id]);
    return { room,loading };
}
export default useGetRoom;