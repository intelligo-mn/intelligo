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
import * as bcrypt from 'bcrypt-nodejs';
import IDGenerator from '../../../common/config/utils';
import SERVICE_IDENTIFIER from '../../../common/constants/identifiers';
import { ILogger, ISecurity, JWT_KeyType } from '../../../common/interfaces';
import { HttpStatus } from '../../services';
import { User } from '../../../common/models/user.model';

/**
 * Controller for Security Token
 */
@controller('/login')
class SecurityController implements interfaces.Controller {
  public loggerService: ILogger;
  public securityService: ISecurity;
  public constructor(
    @inject(SERVICE_IDENTIFIER.LOGGER) loggerService: ILogger,
    @inject(SERVICE_IDENTIFIER.SECURITY) securityService: ISecurity,

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
    try {
      const user: any = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send({
          success: false,
          message: 'User not found'
        });
      }

      const matchPasswords = await bcrypt.compare(password, user.password);
      if (!matchPasswords) {
        return res.status(401).send({
          success: false,
          message: 'Not authorized'
        });
      }

      const privateKey = await this.securityService.getKey(JWT_KeyType.Private);
      const expiryTime =
        process.env.TOKEN_EXPIRY_TIME !== undefined
          ? process.env.TOKEN_EXPIRY_TIME
          : '1h';
      const jwtBearerToken = jwt.sign(
        { role: role, email: email },
        privateKey,
        {
          algorithm: 'RS256',
          expiresIn: expiryTime
        }
      );
      res.status(HttpStatus.OK).json({
        idToken: jwtBearerToken,
        expiresIn: expiryTime
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString()
      });
    }
  }

  /**
   * Register Request
   * @param req request
   * @param res response
   */
  @httpPost('/register')
  public async register(@request() req: Request, @response() res: Response) {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const lastName = req.body.lastName;
    try {
      const hash = await bcrypt.hash(password, 10);

      const user = new User({
        name,
        lastName,
        email,
        password: hash
      });

      const newUser = await user.save();

      res.status(201).send({
        success: false,
        message: 'User Successfully created',
        data: newUser
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.toString()
      });
    }
  }
}
export default SecurityController;
