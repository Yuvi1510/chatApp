import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatProvider = ({children}) =>{
    const [roomId, setRoomId] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [connected, setConnected] = useState(false);

    return <ChatContext.Provider value={{roomId, setRoomId, currentUser, setCurrentUser, connected, setConnected}} >
        {children}
    </ChatContext.Provider>
}

const useChatContext = () => useContext(ChatContext); // this will allow
// me to use the values in context provider in the children wrapped wiht
// ChatProvider

export default  useChatContext;