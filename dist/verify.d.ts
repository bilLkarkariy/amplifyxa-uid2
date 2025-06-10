/**
 * Verify an email against a UID2 with a set of salts (bucket + retro compat array)
 */
export declare function verify(email: string, uid2: string, salts: string[]): boolean;
