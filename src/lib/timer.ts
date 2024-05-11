import { readable } from "svelte/store";

export default function (intervalMs: number) {
    return readable(0, (set, update) => {
        const interval = setInterval(() => {
            update((n) => n + 1);
        }, intervalMs)

        return () => clearInterval(interval);
    })
}