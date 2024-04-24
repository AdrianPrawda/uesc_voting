import { redirect } from "@sveltejs/kit";
import { userIsAuthenticated } from "$lib/server/users.js";

export function load({ cookies, url }) {
    if (!cookies.get('user_token')) {
        throw redirect(303, `/?redirectTo=${url.pathname}`);
    }
    if (!userIsAuthenticated(cookies.get('user_token') as string)) {
        console.log("[DEBUG] User not authenticated")
        throw redirect(303, `/?redirectTo=${url.pathname}`)
    }
}