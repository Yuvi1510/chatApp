import React, { useState } from 'react'
import speak from "../assets/speak.png";
import toast from 'react-hot-toast';
import { createNewRoom, joinRoomApi } from '../services/RoomService';
import useChatContext from '../context/ChatContext';
import { useNavigate } from 'react-router';

const CreateJoinRoom = () => {

  const {roomId, setRoomId, currentUser , setCurrentUser, connected, setConnected} = useChatContext();
  const navigate = useNavigate();

  const [details, setDetails] = useState(
    {
      roomId:"",
      username:""
    }
  );

  const handleInputChange = (ev)=>{
    setDetails({...details, [ev.target.name]: ev.target.value})
  }

  // console.log(details);

  const validateForm = ()=>{
    if(details.roomId=="" || details.username==""){
      toast.error("Invalid inputs!");
      return false;
    }else{
      return true;
    }
  }

  const joinRoom = async(ev) =>{
      if(validateForm()){
         try {
           const response = await joinRoomApi(details.roomId);
          toast.success("Room Joined");
          setRoomId(details.roomId);
          setCurrentUser(details.username)
          setConnected(true);
          navigate("/chat");
         } catch (error) {
          toast.error("Room not found");
          console.log(error);
         }
      }
    }
    
   const createRoom = async (ev) =>{
    if(validateForm()){
      
      try{
        const response = await createNewRoom(details.roomId);
        console.log(response);
        toast.success("Room created");

        // set current user and room id
        setRoomId(details.roomId);
        setCurrentUser(details.username);
        setConnected(true);
        navigate("/chat")
      }catch (error){
        console.log(error)
        toast.error(error?.response?.data)
      }
    }

  }

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='flex flex-col gap-5 p-8 w-full max-w-md rounded-2xl dark:bg-gray-800'>
        <div>
          <img className='w-25 mx-auto' src={speak} alt="chatIcon" />
        </div>
        <h1 className='text-2xl font-semibold text-center'>Join Room / Create Room ..</h1>
        
        {/* name div  */}
        <div>
            <label htmlFor="name" className='block font-medium mb-2'>
                Your name
            </label>
            <input onChange={handleInputChange} value={details.username} type="text" name='username' id='name' className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded 
            focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>

        {/* room id div  */}
        <div>
            <label htmlFor="roomId" className='block font-medium mb-2'>
               Room Id / New Room Id
            </label>
            <input onChange={handleInputChange} value={details.roomId} type="text" name='roomId' id='roomId' className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded 
            focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>

        {/* button div  */}
        <div className='flex justify-center pt-3 '>
            <button onClick={joinRoom} className='mx-4 px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-xl'>Join Room</button>
            <button onClick={createRoom} className='mx-4 px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-xl'>Create Room</button>
        </div>
      </div>
    </div>
  )
}

export default CreateJoinRoom
