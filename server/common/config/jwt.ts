const expressJwt = require('express-jwt');
import * as fs from 'fs';

/**
 * Setup JWT configuration
 */
const configJWT = async (): Promise<any> => {
  let result: any = {};
  if (process.env.JWT_AUTH === 'true') {
    const RSA_PUBLIC_KEY = await fs.readFileSync(
      process.env.RSA_PUBLIC_KEY_FILE
    );

    result = await expressJwt({
      secret: RSA_PUBLIC_KEY,
      credentialsRequired: false
    });
  }
  return result;
};

export default configJWT;
