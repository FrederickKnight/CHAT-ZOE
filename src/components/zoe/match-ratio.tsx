import { useState,useEffect } from "react";
import { useGetUser } from "@hooks/useGetUser";

export default function MatchRatio(){
    const URL_PATH = import.meta.env.PUBLIC_API_URL;

    const [user, refetchUser] = useGetUser();
    const [ratio,setRatio] = useState(0)

    async function fetchRatio(id_user:number){
        const response = await fetch(URL_PATH + "/zoe/user/" + id_user + "/match-ratio")
        const response_json = await response.json()

        if (response.status === 200){
            setRatio(response_json.ratio)
        }
        else{
            setRatio(0)
        }
    }

    useEffect(() => {
        if (user){
            fetchRatio(user.id)
        }
    },[user?.id])

    return (
        <div>
            <h2>MATCH</h2>
            <h4>Esta semana tu interaccion cambio</h4>

            <div>
                <div>
                    Mensaje de Zoe (Prox)
                </div>
                <span>
                    {ratio ?
                    (
                        <>
                            {ratio} %
                        </>
                    )
                    :
                    (
                        "0%"
                    )
                    }
                </span>
            </div>
        </div>
    )
}