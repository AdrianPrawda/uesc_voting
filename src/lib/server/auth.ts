import { error, type Cookies } from "@sveltejs/kit";
import { userIsAuthenticated } from "./users";

const USER_TOKEN = 'user_token';
const ADMIN_TOKEN = 'admin_token';

export function withUserAuthentication(cookies: Cookies, onSuccess: () => void, onFailure: () => void = () => { error(404, { message: 'Not found' }) }) {
    if (userIsAuthenticated(cookies.get(USER_TOKEN) ?? '')) {
        onSuccess();
    } else {
        onFailure();
    }
}