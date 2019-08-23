import { inject, injectable } from 'inversify';
import { ISecurity, JWT_KeyType } from '../interfaces';
import ILogger from '../interfaces/ilogger';
import SERVICE_IDENTIFIER from '../constants/identifiers';
import * as fs from 'fs';

/**
 * Security Service
 */
@injectable()
class SecurityService implements ISecurity {
  public loggerService: ILogger;
  // Generated using https://gist.github.com/ygotthilf/baa58da5c3dd1f69fae9
  private RSA_PRIVATE_KEY: any;
  private RSA_PUBLIC_KEY: any;

  public constructor(
    @inject(SERVICE_IDENTIFIER.LOGGER) loggerService: ILogger
  ) {
    this.loggerService = loggerService;
  }
  public async getKey(keyType: JWT_KeyType) {
    let result: any;
    switch (keyType) {
      case JWT_KeyType.Public:
        {
          if (this.RSA_PUBLIC_KEY === undefined) {
            this.RSA_PUBLIC_KEY = await fs.readFileSync(
              process.env.RSA_PUBLIC_KEY_FILE
            );
          }
          result = this.RSA_PUBLIC_KEY;
        }
        break;
      case JWT_KeyType.Private:
        {
          if (this.RSA_PRIVATE_KEY === undefined) {
            this.RSA_PRIVATE_KEY = await fs.readFileSync(
              process.env.RSA_PRIVATE_KEY_FILE
            );
          }
          result = this.RSA_PRIVATE_KEY;
        }
        break;
      default:
        throw new Error('Unknown Key Type');
    }
    return result;
  }
}

export default SecurityService;
