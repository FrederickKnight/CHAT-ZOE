import {
	validateSessionToken,
	setSessionTokenCookie,
	deleteSessionTokenCookie
} from "@lib/cookie_session";

import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
	const token = context.cookies.get("session")?.value ?? null;
	if (token === null) {
		context.locals.user = null;
		context.locals.session = null;
		return next();
	}
	const { session, user } = await validateSessionToken(token);
	
	if (session !== null) {
		setSessionTokenCookie(context, token, session.expiresAt);
	} else {
		deleteSessionTokenCookie(context);
	}

	context.locals.session = session;
	context.locals.user = user;

	if (user !== null){
		context.cookies.set(
			"user", JSON.stringify(user),
			{
				path : "/",
				httpOnly: false,
				expires : session.expiresAt,
				sameSite: "lax"
			}
		)
	}

	return next();
});