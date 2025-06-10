/**
 * Generate a UID2 hash.
 * uid2 = base64url(sha256(salt + lower(trim(email))))
 */
export declare function hash(email: string, salt: string): string;
