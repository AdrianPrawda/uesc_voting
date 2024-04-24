import { logoutUser } from '$lib/server/users.js';
import { redirect } from '@sveltejs/kit';

export function load({ cookies }) {
    if (cookies.get('user_token')) {
        logoutUser(cookies.get('user_token') as string);
        cookies.delete('user_token', { path: '/' });
    }
    throw redirect(303, '/');
}