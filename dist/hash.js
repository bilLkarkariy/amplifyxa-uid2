import { createHash } from 'crypto';
/**
 * Generate a UID2 hash.
 * uid2 = base64url(sha256(salt + lower(trim(email))))
 */
export function hash(email, salt) {
    if (!email)
        throw new Error('email required');
    const normalised = email.trim().toLowerCase();
    const h = createHash('sha256').update(salt + normalised).digest();
    return h.toString('base64url');
}
