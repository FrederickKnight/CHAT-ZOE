const API_URL = import.meta.env.PUBLIC_API_URL + "auth/user/";

import type { APIContext } from "astro";
import type {User} from "@lib/cookie_session"


export async function registerUser(context:APIContext,username:string,password:string): Promise<User|null> {

    const response = await fetch(API_URL+"user-zoe",{
		method:"POST",
		headers:{
			"Content-Type":"application/json",
		},
		body:JSON.stringify({"username":username,"password":password})
	})
	const response_json = await response.json()

    if(response_json?.error !== undefined){
        // username already exist
        return null
    }
    
    if(response_json.metadata.type !== "User"){
        // is not an user
        return null
    }

    const created_user: User = {
        id: response_json.response[0].id,
        username: response_json.response[0].username
    };

    context.locals.user = created_user
    return created_user
}

export async function validateUser(context:APIContext,username:string,password:string): Promise<User|null>{
    const response = await fetch(API_URL+"user-validation",{
		method:"POST",
		headers:{
			"Content-Type":"application/json",
		},
		body:JSON.stringify({"username":username,"password":password}) // pasar info de post form
	})

    const response_json = await response.json()
    
    if (response.status === 200 && response_json.response[0].username === username){
        
        const user:User = {
            id:response_json.response[0].id,
            username:response_json.response[0].username
        }
        return user
    }
    return null
}