import type { APIContext } from "astro";
import {registerUser} from "@lib/api_user"

import { setSessionTokenCookie } from "@lib/cookie_session"
import {generateSessionToken,createSession} from "@lib/cookie_session"

export async function POST(context:APIContext) : Promise<Response>{
    const formdata = await context.request.formData();
    const username = formdata.get("username");
    if (
		typeof username !== "string" ||
		username.length < 3 ||
		username.length > 31
	) {
		return new Response("Invalid username", {
			status: 400
		});
	}

    const password = formdata.get("password") as string;
    if (typeof password !== "string" || password.length < 6 || password.length > 255) {
		return context.redirect(`/signup?error=Invalid password`);

	}

    const user = await registerUser(context,username,password)
	console.log(user)

	if(user !== null){
		const session_token = await generateSessionToken();
		const session = await createSession(session_token,user.id);
		setSessionTokenCookie(context,session_token,session.expiresAt);
		return context.redirect("/")
	}

	return context.redirect(`/signup?error=Username is already taken`);
}