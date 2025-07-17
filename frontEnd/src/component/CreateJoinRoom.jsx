import React from 'react'
import speak from "../assets/speak.png";


const CreateJoinRoom = () => {
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
            <input type="text" id='name' className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded 
            focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>

        {/* room id div  */}
        <div>
            <label htmlFor="roomId" className='block font-medium mb-2'>
               Room Id / New Room Id
            </label>
            <input type="text" id='roomId' className='w-full dark:bg-gray-600 px-4 py-2 border dark:border-gray-300 rounded 
            focus:outline-none focus:ring-2 focus:ring-blue-500' />
        </div>

        {/* button div  */}
        <div className='flex justify-center pt-3 '>
            <button className='mx-4 px-3 py-2 dark:bg-blue-500 hover:dark:bg-blue-800 rounded-xl'>Join Room</button>
            <button className='mx-4 px-3 py-2 dark:bg-orange-500 hover:dark:bg-orange-800 rounded-xl'>Create Room</button>
        </div>
      </div>
    </div>
  )
}

export default CreateJoinRoom
