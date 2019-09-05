import { Request, Response } from 'express';
import { inject } from 'inversify';
import {
  controller,
  httpPost,
  interfaces,
  request,
  response
} from 'inversify-express-utils';
import * as jwt from 'jsonwebtoken';
import IDGenerator from '../../../common/config/utils';
import SERVICE_IDENTIFIER from '../../../common/constants/identifiers';
import { ILogger, ISecurity, JWT_KeyType } from '../../../common/interfaces';
import { HttpStatus } from '../../services';

/**
 * Controller for Security Token
 */
@controller('/login')
class SecurityController implements interfaces.Controller {
  public loggerService: ILogger;
  public securityService: ISecurity;

  public constructor(
    @inject(SERVICE_IDENTIFIER.LOGGER) loggerService: ILogger,
    @inject(SERVICE_IDENTIFIER.SECURITY) securityService: ISecurity
  ) {
    this.loggerService = loggerService;
    this.securityService = securityService;
  }

  /**
   * Login Request
   * @param req request
   * @param res response
   */
  @httpPost('/')
  public async login(@request() req: Request, @response() res: Response) {
    const email = req.body.email;
    const password = req.body.password;
    const role = req.body.role;
    const privateKey = await this.securityService.getKey(JWT_KeyType.Private);

    if (this.validateEmailAndPassword(email, password)) {
      const userId = this.findUserIdForEmail(email);
      const expiryTime =
        process.env.TOKEN_EXPIRY_TIME !== undefined
          ? process.env.TOKEN_EXPIRY_TIME
          : '1h';
      const jwtBearerToken = jwt.sign(
        { role: role, email: email },
        privateKey,
        {
          algorithm: 'RS256',
          expiresIn: expiryTime,
          subject: userId
        }
      );

      res.status(HttpStatus.OK).json({
        idToken: jwtBearerToken,
        expiresIn: expiryTime
      });
    } else {
      res.sendStatus(401);
    }
  }

  /**
   * Email validation place holder
   * @param email
   * @param password
   */
  private validateEmailAndPassword(email, password): boolean {
    return true;
  }

  /**
   * Get the user ID based on email provided
   * Dummy implementation for showing the concept
   */
  private findUserIdForEmail(email): string {
    return IDGenerator();
  }
}
export default SecurityController;
