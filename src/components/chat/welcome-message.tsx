import { useState,useEffect } from "react";
import { useGetUser } from "@hooks/useGetUser";

import "@styles/chat-card.css"

export default function WelcomeMessage(){
    const URL_PATH = import.meta.env.PUBLIC_API_URL;

    const [user, refetchUser] = useGetUser();
    const [message,setMessage] = useState("");
    
    async function fetchWelcomeMessage(id_user:number){
        const response = await fetch(URL_PATH + "zoe/user/"+id_user+"/welcome-message")
        const response_message = await response.text()
        
        setMessage(response_message)
    }

    useEffect(() => {
        if (user){
            fetchWelcomeMessage(user.id)
        }
    },[user?.id])

    return (
        <div className="card-container">
            {message ?
            (
                message
            )
            :
            (
                "Bienvenido"
            )
            }
        </div>
    )
}