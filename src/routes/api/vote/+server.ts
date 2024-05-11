import { respond } from "$lib/api.js";
import { countries } from "$lib/countries.js";
import { getAuthenticatedUsername, userIsAuthenticated } from "$lib/server/users.js";
import { getVotes, voteAll, type Vote } from "$lib/server/votes";

export async function POST({ request, cookies }) {
    let id = cookies.get('user_token') ?? '';

    if (userIsAuthenticated(id)) {
        const req = await request.json();

        if (inputDataIsValid(req)) {
            let votes = req as Vote[];
            let user = getAuthenticatedUsername(id)
            console.log(`Username: ${user}`)
            if (user) {
                voteAll(user, votes);
                console.log("DEBUG: voteAll completed!")
                return respond(200);
            }
            return respond(401);
        }
        return respond(400);
    }
    return respond(401);
}

export async function GET({ cookies }) {
    const id = cookies.get('user_token') ?? '';
    if (userIsAuthenticated(cookies.get('user_token') ?? '')) {
        return respond(200, getVotes(getAuthenticatedUsername(id) ?? ''));
    }
    return respond(401);
}

function inputDataIsValid(data: any): boolean {
    if (!Array.isArray(data)) return false;

    data.forEach(element => {
        if (!("country" in element) || typeof (element.country) != "string" || !countries.includes(element.country)) {
            return false;
        }
        if (!("rank" in element) || typeof (element.rank) != "number") {
            console.log("D1")
            return false;
        }
        if (!("score" in element) || typeof (element.score) != "number") {
            console.log("D2")
            return false;
        }
    });

    return true;
}