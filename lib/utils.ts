import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { JWTUser } from '~/actions/auth/actions';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Decodes a JWT token and returns the payload. Returns an object with props
 * header, payload and signature.
 * @param {string} token
 * @returns {object}
 */
export const decodeJWT = function (token: string) {
  var [, encodedPayload] = token.split('.');
  var payload = JSON.parse(base64UrlDecode(encodedPayload)) as JWTUser;
  return payload;
};

/**
 * Decode a base64 url string
 * @param {string} str
 * @returns {string}
 */
const base64UrlDecode = function (str: string) {
  str = str.replace(/_/g, '/');
  str = str.replace(/-/g, '+');
  return atob(str);
};
