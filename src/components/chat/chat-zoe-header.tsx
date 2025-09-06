import { useState } from "react";
import type { Zoe } from "@ctypes/room_types";

import "@styles/chat-window.css"

export interface Props{
    zoe:Zoe;
}

export default function ZoeHeader(props:Props){
    const {zoe} = props;

    return (
        <div className="header-zoe">
            <a href="/">
                ==d
            </a>
            <div className="container-zoe">
                <div className="icon-zoe">
                    <img src="\bg\zoe_chat.webp" alt="zoe image" />
                </div>
                <span className="zoe-name">
                    {zoe.nickname ?
                    (
                        <>
                            {zoe.nickname}
                        </>
                    )
                    :
                    (
                        <>
                            {zoe.name}
                        </>
                    )
                    }
                    ❤️
                </span>
            </div>
            <a href="/">
                ...
            </a>
        </div>
    )
}