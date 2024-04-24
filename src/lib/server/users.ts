interface User {
    name: string,
    pin?: string
}

// UUID -> User
const users = new Map<string, User>();

export function createUser(name: string, pin?: string): string | undefined {
    // check if user with identical username aleady exists
    for (const v of users.values()) {
        if (v.name === name) {
            return undefined;
        }
    }

    let uuid = crypto.randomUUID();
    users.set(uuid, { name: name, pin: pin });
    return uuid;
}

export function loginUser(name: string, pin?: string): string | undefined {
    for (const [k, v] of users.entries()) {
        if (v.name === name && v.pin === pin) {
            return k;
        }
    }
    return undefined;
}

export function getUser(uuid: string): string | undefined {
    return users.get(uuid)?.name;
}

export function deleteUser(uuid: string): boolean {
    return users.delete(uuid)
}

export function userExists(uuid: string): boolean {
    return users.has(uuid);
}