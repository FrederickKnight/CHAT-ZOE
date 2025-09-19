import { useState } from "react";
import type { Zoe } from "@ctypes/room_types";

import "@styles/chat-window.css"

export interface Props{
    zoe:Zoe;
}

export default function ZoeHeader(props:Props){
    const {zoe} = props;
    const [menuOpen,setMenuOpen] = useState(false)

    return (
        <div className="header-zoe">
            <div className="container-arrow-zoe">
                <a href="/">
                    <img src="/icons/arrow-left.svg" alt="<--" />
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
            </div>
            <div className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
                <img src="/icons/dots.svg" alt="..." />
            </div>

            {menuOpen &&
                <div className="menu-options">
                    <button onClick={() => alert("Proximamente")}>Afectometro</button>
                    <button onClick={() => alert("Proximamente")}>Personalizar Fondo de Pantalla</button>
                    <button onClick={() => alert("Proximamente")}>Reportar Problema</button>
                </div>
            }
        </div>
    )
}