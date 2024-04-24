import { userIsAuthenticated } from '$lib/server/users.js';

export function load({ cookies }) {
    let userLoggedIn = cookies.get('user_token') && userIsAuthenticated(cookies.get('user_token') as string);
    let adminLoggedIn = false // TODO: Impl

    return {
        userLoggedIn: userLoggedIn,
        adminLoggedIn: adminLoggedIn
    }
}