import type { APIContext } from "astro";

import { setSessionTokenCookie } from "@lib/cookie_session"
import {generateSessionToken,createSession} from "@lib/cookie_session"
import {validateUser} from "@lib/api_user"

export async function POST(context: APIContext): Promise<Response> {
	const formData = await context.request.formData();
	const username = formData.get("username");
	const password = formData.get("password") as string;
	if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31
	) {
		return new Response("",{
			status:303,
			headers:{
				Location:"/profile/login?error=Invalid username"
			}
		})
    }
	
	const userValidated = await validateUser(context,username,password)
	if(userValidated !== null){
		const session_token = await generateSessionToken();
		const session = await createSession(session_token,userValidated.id);
		setSessionTokenCookie(context,session_token,session.expiresAt);
		
		return new Response("",{
			status:303,
			headers:{
				Location:"/"
			}
		})
	}

	return new Response("",{
		status:303,
		headers:{
			Location:"/profile/login?error=Invalid username or password"
		}
	})
}