declare namespace App {
	interface Locals {
		session: import("./lib/cookie_session").Session | null;
		user: import("./lib/cookie_session").User | null;
	}
}