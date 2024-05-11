import { json } from "@sveltejs/kit";

type APIResponseCode = 200 | 201 | 202 | 400 | 401 | 403 | 404 | 409 | 415 | 429 | 500 | 501 | 503;

//const apiResponseCodes = [200, 201, 202, 400, 401, 403, 404, 409, 415, 429, 500, 501, 503];

// TODO: Remove status in json body
export function respond(status: APIResponseCode, data?: any): Response {
    if (data) {
        return json({ data: data, status: status }, { status: status });
    }
    return json({ status: status }, { status: status });
}

/*
export function request(json: string, validator: (data: any) => boolean = () => { return true }): { data: any, status: APIResponseCode | -1, dataValid: boolean, error: boolean } {
    try {
        let resp = JSON.parse(json);
        if (!("status" in resp) || typeof (resp.status) !== "number" || !apiResponseCodes.includes(resp.status)) {
            return { data: null, status: -1, dataValid: false, error: true };
        }

        if ("data" in resp) {
            return { data: resp.data, status: resp.status, dataValid: validator(resp.data), error: false };
        } else {
            return { data: null, status: resp.status, dataValid: true, error: false };
        }
    } catch (_) {
        return { data: null, status: -1, dataValid: false, error: true };
    }
}

export async function request(url: string, validator: (data: any) => boolean = () => { return true; }): { data: any, status: APIResponseCode | -1, dataValid: boolean, error: boolean } {
    const resp = await fetch(url, {
        method: "POST",
        headers: {

        }
    });

    try {
        let parsed = JSON.parse(resp.text
    }
}

export async function send(url: string)
*/