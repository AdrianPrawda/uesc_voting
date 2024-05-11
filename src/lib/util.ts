export function moveElement<T>(array: T[], fromIndex: number, toIndex: number): T[] {
    const element = array.splice(fromIndex, 1)[0];
    array.splice(toIndex, 0, element);
    return array;
}