/**
 * User Service Interface
 */
interface IUser {
  // Validated Email and Password
  validateEmailAndPassword(email, password): boolean;

  // Get User ID for email
  findUserIdForEmail(email): string;
}

export default IUser;
