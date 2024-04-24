import { describe, expect, test, afterEach } from 'vitest';
import * as Users from './users';

afterEach(() => {
    Users.deleteAllUsers();
})

describe('User creation', () => {
    test('Create new user without pin', () => {
        let token = Users.createUser('foo');

        expect(token).not.toBeUndefined();
        expect(token).not.toStrictEqual('');
    })

    test('Create new user with pin', () => {
        let token = Users.createUser('foo', '1234');

        expect(token).not.toBeUndefined();
        expect(token).not.toStrictEqual('')
    })

    test('Fail to create non-unique user without pin', () => {
        Users.createUser('foo');
        expect(Users.createUser('foo')).toBeUndefined();
    })

    test('Fail to create non-unique user with pin', () => {
        Users.createUser('foo', '1234');
        expect(Users.createUser('foo', '5678')).toBeUndefined();
    })
})

describe('User login', () => {
    test('Login valid user without pin', () => {
        Users.createUser('foo');
        let token = Users.loginUser('foo');

        expect(token).not.toBeUndefined();
        expect(token).not.toStrictEqual('');
    })

    test('Login valid user with pin', () => {
        Users.createUser('foo', '1234');
        let token = Users.loginUser('foo', '1234');

        expect(token).not.toBeUndefined();
        expect(token).not.toStrictEqual('');
    })

    test('Login already logged in user', () => {
        let expected = Users.createUser('foo')
        let token = Users.loginUser('foo');

        expect(token).toStrictEqual(expected);
        expect(token).not.toStrictEqual('');
        expect(token).not.toBeUndefined();
    })

    test('Fail to login unknown user', () => {
        expect(Users.loginUser('foo')).toBeUndefined();
    })

    test('fail to login known user using a wrong pin', () => {
        Users.createUser('foo', '1234');
        expect(Users.loginUser('foo', '5678'));
    })
})

describe('User authentication', () => {
    test('Authenticated user', () => {
        let token = Users.createUser('foo');
        Users.loginUser('foo');
        expect(Users.userIsAuthenticated(token as string)).toBe(true);
    })

    test('Unauthenticated user', () => {
        let token = crypto.randomUUID();
        expect(Users.userIsAuthenticated(token)).toBe(false);
    })
})

describe('User logout', () => {
    test('Successfully logout user', () => {
        let token = Users.createUser('foo');
        Users.logoutUser(token as string);
        expect(Users.userIsAuthenticated(token as string)).toBe(false);
    })

    test('Successfully logout multiple users', () => {
        let token_foo = Users.createUser('foo');
        let token_bar = Users.createUser('bar');

        Users.logoutAllUsers();

        expect(Users.userIsAuthenticated(token_foo as string)).toBe(false);
        expect(Users.userIsAuthenticated(token_bar as string)).toBe(false);
    })
})

describe('User deletion', () => {
    test('Successfully delete one user', () => {
        Users.createUser('foo');
        Users.deleteUser('foo');
        expect(Users.userExists('foo')).toBe(false);
    })

    test('Successfully delete multiple users', () => {
        let token_foo = Users.createUser('foo');
        let token_bar = Users.createUser('bar');

        Users.deleteAllUsers();

        expect(Users.userExists('foo')).toBe(false);
        expect(Users.userIsAuthenticated(token_foo as string)).toBe(false);
        expect(Users.userExists('bar')).toBe(false);
        expect(Users.userIsAuthenticated(token_bar as string)).toBe(false);
    })
})
