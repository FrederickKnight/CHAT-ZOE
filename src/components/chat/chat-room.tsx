import type { Message } from "@ctypes/room_types";
import { useGetRoomUser } from "@hooks/useGetRoom";
import { useGetUser } from "@hooks/useGetUser";
import { useState, useEffect, useRef } from "react";

import MessageBubble from "@components/chat/chat-message-bubble";

import { io, Socket } from "socket.io-client";
let socket: Socket;

import "@styles/chat-window.css"
import ZoeHeader from "./chat-zoe-header";

export interface Props {
    uuid: string;
}

export default function ChatRoom(props: Props) {
    const { uuid } = props;
    const URL_PATH = import.meta.env.PUBLIC_URL_HOST;
    const URL_API = import.meta.env.PUBLIC_API_URL;

    const [user, refetchUser] = useGetUser()
    const [roomUser,refetchRoomUser] = useGetRoomUser(uuid)

    const [listMessages,setListMessages] = useState<Message[]>([]);
    const [message,setMessage] = useState("");
    const [page,setPage] = useState(1);

    const containerRef = useRef<HTMLDivElement | null>(null);
    
    
    const getMessages = async (currentPage:number) => {
        try{
            if (!user && !roomUser?.room) return;

            const container = containerRef.current;
            let scrollHeightBefore = container?.scrollHeight;

            const response = await fetch(URL_API + "/message/?filter_field=id_room&filter_value="+roomUser?.room?.id+"&relations=true&limit=20&page="+currentPage+"&order=desc")

            if (response.status === 204){
                return;
            }

            const resjson = await response.json()

            setListMessages(
                prev => [...resjson.response.reverse(),...prev,]
            )

            requestAnimationFrame(() => {
            if (container && scrollHeightBefore) {
                container.scrollTop = container.scrollHeight - scrollHeightBefore;
                }
            });
        }
        catch(error){
            console.log(error)
        }
    };

    useEffect(() => {
        if (!roomUser?.room || page == 1) return;
        getMessages(page);
    }, [page]);


    useEffect(() => {
        if (!roomUser) return;
        setListMessages([])
        setPage(1);
        getMessages(1);

        socket = io(URL_PATH,{ transports: ["websocket"] });

        socket.on("connect", () => {
            socket.emit("join", { user: user, room: roomUser.room?.id });
            scrollBottom()
        });

        socket.on("message",(data) => {
            setListMessages(
                prev => [...prev,{user:data.user, content:data.content}]
            );
        })

        scrollBottom()

        return () =>{
            socket.disconnect()
        };

    },[roomUser?.room?.id])
    
    useEffect(() => {
        scrollBottom()
    },[listMessages.length])

    function scrollBottom(){
        const container = containerRef.current;
        if (container) {
            container.scrollTop = container.scrollHeight;
        }
    }

    const handleScroll = () => {
        const container = containerRef.current;
        if (!container) return;

        if (container.scrollTop === 0){
            setPage(prev => prev + 1);
        }
    };

    const sendMessage = () => {
        if (message.trim() && roomUser?.room) {
            socket.emit("send_zoe_message", { room: roomUser.room.id, content: message, user: user });
            setMessage("");
        }
    };

    return (
        <div className="chat-room_container">
            <div className="chat-room_header">
                { roomUser?.zoe &&
                    <ZoeHeader zoe={roomUser.zoe} />
                }
            </div>
            
            <div className="chat-room_main">
                <div
                ref={containerRef}
                key={roomUser?.room?.id}
                className="main_container-scroll"
                onScroll={handleScroll}
                >
                    {listMessages.map(
                        (m,u) => 
                            <div key={u}>
                                <MessageBubble message={m} />
                            </div>
                    )}
                </div>
            </div>

            <div className="chat-room_footer">
                <input value={message} onChange={e => setMessage(e.target.value)} placeholder="Mensaje"/>
                <button onClick={sendMessage}>Enviar</button>
            </div>
        </div>
    )

}