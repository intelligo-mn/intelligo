import IUser from '../interfaces/iuser';
import IDGenerator from '../../common/config/utils';
import { injectable } from 'inversify';

/**
 * User Service for User Identity and Authentication
 * Placeholder implementation
 */
@injectable()
class UserService implements IUser {
  /**
   * Validated email and password
   * @param email Email
   * @param password Password
   */
  public validateEmailAndPassword(email, password): boolean {
    return true;
  }

  /**
   * Get corresponding user Id for registered user
   * Placeholder function - dummy implementation
   * @param email User email ID
   */
  public findUserIdForEmail(email): string {
    return IDGenerator();
  }
}

export default UserService;
