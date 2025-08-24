import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";

import Cookies from "js-cookie";

import type { User } from "@lib/cookie_session";

let socket: Socket;

interface Message{
    user:User;
    msg:String;
}

export default function ChatTest(){

    const [user,setUser] = useState<User | null>(null)
    const [messages,setMessages] = useState<Message[]>([])
    const [message,setMessage] = useState("")
    const room = "room_1"
    const URL_PATH = import.meta.env.PUBLIC_URL_HOST;

    useEffect(() => {
        const userJson =  Cookies.get("user")
        if (userJson) setUser(JSON.parse(userJson))
    },[])

    useEffect(() => {
        console.log("iniciado")
        if (!user) return;

        socket = io(URL_PATH,{ transports: ["websocket"] });

        socket.on("connect", () => {
            socket.emit("join", { user: user, room });
        });

        socket.on("message",(data) => {
            setMessages(
                prev => [...prev,{user:data.user, msg:data.msg}]
            );
        })

        return () =>{
            socket.disconnect()
        };

    },[user])

    const sendMessage = () => {
        if (message.trim()) {
            socket.emit("send_room_message", { room: room, msg: message, user });
            setMessage("");
        }
    };

    return (
        <div>
            Bienvenido {user?.username}
            <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Mensaje"/>
            <button onClick={sendMessage}>Enviar</button>
            <div>
                {messages.map(
                    (m,u) => 
                        <div key={u}>
                            {m.msg}
                        </div>
                )}
            </div>
        </div>
    );
}