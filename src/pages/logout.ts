import type { APIRoute } from "astro";
import { invalidateSession } from "@lib/cookie_session";
import { deleteSessionTokenCookie } from "@lib/cookie_session"


export const POST: APIRoute = async (context) => {
	const session = context.locals.session
	if (!session) {
		return new Response("Unauthorized", {
			status: 401
		});
	}

	await invalidateSession(session.id)
	deleteSessionTokenCookie(context)
	
	return context.redirect("/login", 302);
};