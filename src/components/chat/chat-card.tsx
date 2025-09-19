import { useState } from "react";

import type { Room } from "@ctypes/room_types";
import "@styles/chat-card.css"

export interface Props{
    room:Room
}

export default function ChatCard(props:Props){
    const {room} = props;

    return (
        <a className="card-container zoe-chat"
        href={`/chat/${room.uuid}`}
        >
            Nuestro Chat
        </a>
    )
}