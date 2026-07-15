import crypto from 'crypto';

/**
 * Compares two strings in a timing-safe manner to prevent timing attacks.
 * @param a First string (e.g. token from client)
 * @param b Second string (e.g. hashed/stored token)
 */
export function safeCompare(a: string, b: string): boolean {
  if (typeof a !== 'string' || typeof b !== 'string') {
    return false;
  }
  
  const aBuf = Buffer.from(a);
  const bBuf = Buffer.from(b);
  
  if (aBuf.length !== bBuf.length) {
    return false;
  }
  
  return crypto.timingSafeEqual(aBuf, bBuf);
}
