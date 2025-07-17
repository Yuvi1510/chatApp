import React from 'react'
import { MdAttachFile, MdSend } from 'react-icons/md'

const ChatPage = () => {
  return (
    <div >
        {/* header  */}
      <header className='fixed  w-full flex justify-around items-center py-4 dark:bg-gray-900'>
        {/* room name container/ */}
        <div>
            <h1 className='text-xl font-semibold'>
                Room: <span>Uchiha Clan</span>
            </h1>
        </div>

        {/* user container  */}
        <div>
             <h1 className='text-xl font-semibold'>
                User: <span>Madara Uchiha</span>
            </h1>
        </div>

        {/* leave room button  */}
        <div>
            <button className='px-4 py-2 bg-red-500 text-lg font-semibold rounded-md'>Leave Room</button>
        </div>
      </header>

        {/* Content box  */}
        <main className='pt-20 border h-screen'>
            hi
        </main>

      {/* input msg container  */}
      <div className='fixed bottom-1 w-full h-16 '>
        <div className='h-full flex items-center border rounded text-xl w-2/3 mx-auto dark:bg-gray-900'>
            <input type="text" placeholder='Type your message here...'
            className='dark:border-gray-700 dark:bg-gray-900 px-3 py-2 rounded h-full w-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            <div className='flex'>
                 <button className='dark:bg-green-600 px-3 py-2 rounded-2xl cursor-pointer mx-2'><MdAttachFile className='h-8 w-17'/></button>
                 <button className='dark:bg-green-600 px-3 py-2 rounded-2xl cursor-pointer mx-2'><MdSend className='h-8 w-17'/></button>

            </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
