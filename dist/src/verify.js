import { hash } from './hash.js';
/**
 * Verify an email against a UID2 with a set of salts (bucket + retro compat array)
 */
export function verify(email, uid2, salts) {
    return salts.some((salt) => hash(email, salt) === uid2);
}
