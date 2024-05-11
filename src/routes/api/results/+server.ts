import { respond } from "$lib/api.js";
import { userIsAuthenticated } from "$lib/server/users.js";
import { aggregatedResult } from "$lib/server/votes";

export function GET({ cookies }) {
    if (userIsAuthenticated(cookies.get('user_token') ?? '')) {
        const results = aggregatedResult();
        return respond(200, results);
    }
    return respond(401);
}