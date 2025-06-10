import { hash } from './hash.js';

/**
 * Verify an email against a UID2 with a set of salts (bucket + retro compat array)
 */
export function verify(email: string, uid2: string, salts: string[]): boolean {
  return salts.some((salt) => hash(email, salt) === uid2);
}
