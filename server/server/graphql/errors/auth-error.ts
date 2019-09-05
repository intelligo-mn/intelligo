import { createError } from 'apollo-errors';

/**
 * Create un authorized error
 * @param authCode Authorization Code
 */
export const UnAuthorizedError = createError('UnAuthorizedError', {
  message: 'Authorization User Error'
});
