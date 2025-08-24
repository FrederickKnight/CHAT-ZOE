import type { APIContext } from "astro";

const API_URL = import.meta.env.PUBLIC_API_URL + "auth/user/";

export function setSessionTokenCookie(context: APIContext, token: string, expiresAt: Date): void {
	context.cookies.set("session", token, {
		httpOnly: true,
		sameSite: "lax",
		expires: expiresAt,
		path: "/"
	});
}

export function deleteSessionTokenCookie(context: APIContext): void {
	context.cookies.set("session", "", {
		httpOnly: true,
		sameSite: "lax",
		maxAge: 0,
		path: "/"
	});
}


export async function generateSessionToken(): Promise<string>{
	const response = await fetch(API_URL+"session-token")
	const token_json = await response.json()
	return token_json.token
}

export async function createSession(token:string,userId:number): Promise<Session>{

	const response = await fetch(API_URL+"create-session/"+userId,{
		method:"POST",
		headers:{
			'Accept': 'application/json',
			"Content-Type":"application/json",
		},
		body:JSON.stringify({"token":token})
	})
	const session_json = await response.json()
	const session: Session = {
		id: session_json.session,
		userId,
		expiresAt: new Date(session_json.expires_at*1000)
	};
	return session
}

export async function validateSessionToken(token:string):Promise<SessionValidationResult> {
	const response = await fetch(API_URL+"session-validation",{
		method:"POST",
		headers:{
			"Content-Type":"application/json",
		},
		body:JSON.stringify({"token":token})
	})
	const response_json = await response.json()


	if (response_json.session === null){
		const session = null
		const user= null
		return {session,user}
	}
	const session: Session = {
		id: response_json.session.session,
		userId: response_json.session.id_user,
		expiresAt: new Date(response_json.session.expires_at*1000)
	};

	const user: User = {
		id:response_json.user.id,
		username:response_json.user.username
	}

	return {session,user}
	
}

export async function invalidateSession(sessionId:string){
	const response = await fetch(API_URL+"session-invalidation",{
		method:"POST",
		headers:{
			"Content-Type":"application/json",
		},
		body:JSON.stringify({"session":sessionId})
	})
	
}

export type SessionValidationResult =
	| { session: Session; user: User }
	| { session: null; user: null };

export interface Session {
	id: string;
	userId: number;
	expiresAt: Date;
}

export interface User {
	id: number;
	username:string;
}