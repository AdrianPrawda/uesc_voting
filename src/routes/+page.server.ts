import { fail, redirect } from '@sveltejs/kit';
import { createUser, loginUser, userIsAuthenticated } from '$lib/server/users';

export function load({ cookies }) {
    if (cookies.get('user_token') && userIsAuthenticated(cookies.get('user_token') as string)) {
        redirect(303, '/vote');
    }
}

export const actions = {
    login: async ({ cookies, request }) => {
        const data = await request.formData();

        // validate input
        if (!data.has('username') || data.get('username') === '') {
            return fail(422, {
                error: 'Username cannot be empty',
                error_type: 'user'
            })
        }

        if (data.has('pin') && data.get('pin') !== '') {
            if (!(data.get('pin') as string).match("/^[0-9]+$/g")) {
                return fail(422, {
                    error: 'Pin may only contain numbers',
                    error_type: 'pin'
                })
            }
        }

        // attempt to login user
        const token = loginUser(data.get('username') as string, data.get('pin') as string | undefined);
        if (token === undefined) {
            return fail(401, {
                error: 'Username or PIN wrong',
                error_type: 'auth'
            })
        }

        // set cookie and redirect
        cookies.set('user_token', token, { path: '/' })
        redirect(303, '/vote')
    },

    create: async ({ cookies, request }) => {
        const data = await request.formData();

        // validate input
        if (!data.has('username') || data.get('username') === '') {
            return fail(422, {
                error: 'Username cannot be empty',
                error_type: 'user'
            })
        }

        if (data.has('pin') && data.get('pin') !== '') {
            if (!(data.get('pin') as string).match("/^[0-9]+$/g")) {
                return fail(422, {
                    error: 'Pin may only contain numbers',
                    error_type: 'pin'
                })
            }

            if (!data.has('pin2') || data.get('pin') !== data.get('pin2')) {
                return fail(422, {
                    error: 'Pin must match repeated pin',
                    error_type: 'pin'
                })
            }
        }

        // attempt to create user
        const token = createUser(data.get('username') as string, data.get('pin') as string | undefined);
        if (token === undefined) {
            return fail(422, {
                error: 'Username already exists',
                error_type: 'create'
            })
        }

        // set cookie and redirect
        cookies.set('user_token', token, { path: '/' })
        redirect(303, '/vote');
    }
}