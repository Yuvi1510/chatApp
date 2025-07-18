import React, { useState, useRef } from 'react'
import { MdAttachFile, MdSend } from 'react-icons/md'
import madara from "../assets/madara.jpg";

const ChatPage = () => {

  const [messages , setMessages] = useState([
    {
      content: "hello guys",
      sender: "yuvraj"
    },
    {
      content: "hello how are you",
      sender: "dijaya"
    },
    {
      content: "all mighty push",
      sender: "pain"
    },
    {
      content: "you are still so aanoying",
      sender: "sasuke"
    },
    {
      content: "hhhhhhhhhhhh",
      sender: "yuvraj"
    },
    {
      content: "i am the king",
      sender: "kelly"
    },
    {
      content: "i am the king",
      sender: "kelly"
    },
    {
      content: "i am the king",
      sender: "kelly"
    },
    {
      content: "i am the king",
      sender: "kelly"
    },
    {
      content: "i am the king",
      sender: "kelly"
    },
    {
      content: "i am the king",
      sender: "kelly"
    },
    {
      content: "i am the king",
      sender: "kelly"
    },
    {
      content: "i thought you are queen",
      sender: "yuvraj"
    },
  ]);
const [input, setInput] = useState("");
const [stompClient, setStompClient] = useState(null)
const [roomId, setRoomId] = useState("")
const inputRef = useRef(null)
const chatBoxRes = useRef(null);
const [currentUser, setCurrentUser] = useState("yuvraj")


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
        <main className='py-20  h-screen '>
           <div className='h-full w-2/3 mx-auto p-3  dark:bg-gray-700 overflow-auto px-6'>
            {
              messages?.map((message, index)=>{
               return <div key={index} className={`flex ${currentUser == message.sender? "justify-end":"justify-start"} 
               mb-3 `}>
                  <div className='bg-purple-400 px-4 py-2 flex gap-1 rounded-2xl max-w-lg'>
                    <img className='w-10 aspect-square rounded-full' src={madara} alt="" />
                    <div>
                    <h1 className='uppercase font-semibold mb-1/2'>{message.sender}</h1>
                    <p>{message.content}</p>
                    </div>
                  </div>
                </div>
              })
            }
           </div>
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
