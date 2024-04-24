interface User {
    pin?: string
    id: string
}

// Username -> User
const users = new Map<string, User>();
// Login Token -> Username
const loggedIn = new Map<string, string>();

// automatically logges user in and returns login token if creation is sucessfull.
// Returns undefined if user already exists.
export function createUser(username: string, pin?: string): string | undefined {
    if (users.has(username)) {
        return undefined;
    }

    let id = crypto.randomUUID();
    users.set(username, { pin: pin, id: id })

    let token = loginUser(username, pin);
    return token;
}

// logges user in and returns login token. Returns undefined if unsucessfull.
export function loginUser(username: string, pin?: string): string | undefined {
    // check if user is already logged in
    for (const [user_token, user] of loggedIn.entries()) {
        if (user === username) {
            return user_token;
        }
    }
    // check if user creds are valid
    if (users.has(username) && users.get(username)?.pin === pin) {
        let token = crypto.randomUUID();
        loggedIn.set(token, username);
        return token;
    }
    return undefined;
}

export function userIsAuthenticated(token: string): boolean {
    return loggedIn.has(token);
}

export function logoutUser(token: string) {
    loggedIn.delete(token);
}

export function deleteUser(username: string) {
    let token = '';
    for (const [user_token, user] of loggedIn.entries()) {
        if (user === username) {
            token = user_token;
            break;
        }
    }
    loggedIn.delete(token);
    users.delete(username);
}

export function getUsername(id: string): string | undefined {
    for (const [username, user] of users.entries()) {
        if (user.id === id) {
            return username;
        }
    }
    return undefined;
}

export function userExists(username: string): boolean {
    return users.has(username);
}

export function logoutAllUsers() {
    loggedIn.clear();
}

export function deleteAllUsers() {
    logoutAllUsers();
    users.clear();
}