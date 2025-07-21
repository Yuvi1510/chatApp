import React, { useState, useRef, useEffect } from 'react'
import { MdAttachFile, MdSend } from 'react-icons/md'
import madara from "../assets/madara.jpg";
import useChatContext from '../context/ChatContext';
import SockJS from 'sockjs-client';
import { url } from '../config/AxiosHelper';
import { Stomp , Client} from '@stomp/stompjs';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router';
import { getAllChats } from '../services/ChatService';

const ChatPage = () => {

  const {roomId, currentUser, connected, setConnected} = useChatContext();

  const navigate = useNavigate();

  useEffect(()=>{
    if(!connected){
      navigate("/");
    }
  },[roomId, currentUser, connected])

  const [messages , setMessages] = useState([]);
const [input, setInput] = useState("");
const [stompClient, setStompClient] = useState(null)
// const [roomId, setRoomId] = useState("")
const inputRef = useRef(null)
const chatBoxRef = useRef(null);
// const [currentUser, setCurrentUser] = useState("yuvraj")


// load messages when page inits
    useEffect(()=>{
      const loadMessages = async()=>{
       try {
        const msgs = await getAllChats(roomId);
        setMessages(msgs.data);
       } catch (error) {
        console.log(error);
       }
      }
      loadMessages();
    },[]);

// init stomp client
//subscribe
useEffect(()=>{
  const connectWebSocket = () =>{
    // sock js
    const socket = new SockJS(`${url}/chat`);
    const client = Stomp.over(socket);

    client.connect({},()=>{
      setStompClient(client);
      toast.success("Connected");

      client.subscribe(`/topic/room/${roomId}`,(msg)=>{
        console.log(msg);
        const newMessage = JSON.parse(msg.body);
        setMessages((prev)=>[...prev, newMessage]);
      })

    })

}
if(connected){
  connectWebSocket();
  console.log("web socket called")
}

},[roomId])


// handle send msg
const sendMessage = async ()=>{
  if(stompClient && connected && input.trim() ){
    console.log(input);
    stompClient.send(`/app/sendMessage/${roomId}`, {}, JSON.stringify({  content:input, sender: currentUser, roomId: roomId }),{});
    setInput("");
  }

}

// scroll the div if it is filled with chats
useEffect(()=>{
  if(chatBoxRef.current){
    chatBoxRef.current.scroll({
      top: chatBoxRef.current.scrollHeight,
    behavior: "smooth",
    })
  }
},[messages])


// handle logout
const logout = () =>{
  stompClient.disconnect();
  setConnected(false)
  navigate("/")
}

  return (
    <div >
        {/* header  */}
      <header className='fixed  w-full flex justify-around items-center py-4 dark:bg-gray-900'>
        {/* room name container/ */}
        <div>
            <h1 className='text-xl font-semibold'>
                Room: <span>{roomId}</span>
            </h1>
        </div>

        {/* user container  */}
        <div>
             <h1 className='text-xl font-semibold'>
                User: <span>{currentUser}</span>
            </h1>
        </div>

        {/* leave room button  */}
        <div>
            <button onClick={logout} className='px-4 py-2 cursor-pointer bg-red-500 text-lg font-semibold rounded-md'>Leave Room</button>
        </div>
      </header>

        {/* Content box  */}
        <main className='py-20  h-screen '>
           <div ref={chatBoxRef} className='h-full w-2/3 mx-auto p-3  dark:bg-gray-700 overflow-auto px-6'>
            {
              messages?.map((message, index)=>{
               return <div key={index} className={`flex ${currentUser == message.sender? "justify-end":"justify-start"} 
               mb-3 `}>
                  <div className='bg-purple-400 px-4 py-2 flex gap-1 rounded-2xl max-w-md'>
                    <img className='w-10 h-10 aspect-square rounded-full' src={madara} alt="" />
                    <div>
                    <h1 className='uppercase font-semibold mb-1/2'>{message.sender}</h1>
                    <p>{message.timeStamp}</p>
                    <p className='text-white break-words max-w-[360px] '>{message.content}</p>
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
            <input onKeyDown={(e)=>{
              if(e.key === "Enter"){
                sendMessage();
              }
            }} value={input} onChange={(ev)=> setInput(ev.target.value)} type="text" placeholder='Type your message here...'
            className='dark:border-gray-700 dark:bg-gray-900 px-3 py-2 rounded h-full w-full mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            <div className='flex'>
                 <button className='dark:bg-green-600 px-3 py-2 rounded-2xl cursor-pointer mx-2'><MdAttachFile className='h-8 w-17'/></button>
                 <button onClick={sendMessage} className='dark:bg-green-600 px-3 py-2 rounded-2xl cursor-pointer mx-2'><MdSend className='h-8 w-17'/></button>

            </div>
        </div>
      </div>
    </div>
  )
}

export default ChatPage
