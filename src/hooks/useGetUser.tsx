import { useState,useEffect } from "react";

import Cookies from "js-cookie";
import type { User } from "@lib/cookie_session";

export function useGetUser(){
    const [user,setUser] = useState<User | null>(null)

    function refetchUser(){
        const userJson = Cookies.get("user")
        if (userJson) {
            setUser(JSON.parse(userJson))
            console.log(userJson)
        }
    }

    useEffect(() => {
        refetchUser()
    },[])

    return [user,refetchUser] as const;

}