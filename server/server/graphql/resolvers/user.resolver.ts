import { IOCContainer } from '../../common/config/ioc_config';
import SERVICE_IDENTIFIER from '../../common/constants/identifiers';
import * as jwt from 'jsonwebtoken';
import IUser from '../../api/interfaces/iuser';
import { ISecurity, JWT_KeyType } from '../../common/interfaces';
import { User } from '../../common/models/security.model';

const container = IOCContainer.getInstance().getContainer();
const UserService = container.get<IUser>(SERVICE_IDENTIFIER.USER);
const SecurityService = container.get<ISecurity>(SERVICE_IDENTIFIER.SECURITY);
/**
 * User GraphQL resolver
 */
export default {
  Mutation: {
    login: async (parent, args, context, info) => {
      const email = args.email;
      const role = args.role ? args.role : 'USER';
      const userId = UserService.findUserIdForEmail(email);
      const RSA_PRIVATE_KEY = await SecurityService.getKey(JWT_KeyType.Private);
      const expiryTime =
        process.env.TOKEN_EXPIRY_TIME !== undefined
          ? process.env.TOKEN_EXPIRY_TIME
          : '1h';
      const jwtBearerToken = await jwt.sign(
        { role: role, email: email },
        RSA_PRIVATE_KEY,
        {
          algorithm: 'RS256',
          expiresIn: expiryTime,
          subject: userId
        }
      );
      const user: User = {
        email: email,
        id: userId,
        role: role,
        jwt: jwtBearerToken
      };
      context.user = Promise.resolve(user);
      return Promise.resolve(user);
    }
  }
};
