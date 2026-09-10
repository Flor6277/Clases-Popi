// JSON in a script element must not contain a literal HTML closing tag.
export function serializeJson(value: unknown): string {
    return JSON.stringify(value).replace(/</g, "\\u003c");
}
