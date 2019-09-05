import * as express from 'express';
import * as fs from 'fs';
const expressJwt = require('express-jwt');
import { User } from '../models/security.model';

/**
 * JWT Authentication middleware from the REST APIs
 */
const authMiddlewareFactory = () => {
  return (config: User) => {
    return (
      req: express.Request,
      res: express.Response,
      next: express.NextFunction
    ) => {
      (async () => {
        // Enabled if JWT Authentication is turned on
        if (process.env.JWT_AUTH === 'true') {
          const RSA_PUBLIC_KEY = await fs.readFileSync(
            process.env.RSA_PUBLIC_KEY_FILE
          );
          await expressJwt({ secret: RSA_PUBLIC_KEY })(req, res, err => {
            // Check if token is valid
            if (err) {
              res.status(401).json({ message: 'Unauthorized User' });
            } else {
              // If the token is valid, req.user will be set with the JSON object decoded
              const obj: any = req;
              if (
                config.role !== undefined &&
                obj.user.role !== undefined &&
                config.role === obj.user.role
              ) {
                next();
              } else {
                res
                  .status(401)
                  .json({ message: 'Unauthorized role :' + obj.user.role });
              }
            }
          });
        } else {
          next();
        }
      })();
    };
  };
};

/**
 * GraphQL Middleware which will check if the user credentials are proper
 */
const authGraphQLMiddlewareFactory = () => {
  return (req, res, next) => {
    // console.log('Middleware called');

    // If the token is valid, req.user will be set with the JSON object decoded
    const obj: any = req;
    if (obj.user.role !== undefined && 'test' === obj.user.role) {
      next();
    } else {
      res.status(401).end('Unauthorized role');
    }
  };
};

export const checkUser = async (user: any): Promise<any> => {
  if (user.role !== undefined && 'ADMIN' === user.role) {
    return Promise.resolve(user);
  } else {
    return Promise.reject('Unauthorised User');
  }
};

export const getUserRole = ctx => {
  if (process.env.JWT_AUTH === 'true') {
    return Promise.resolve(
      ctx.user && ctx.user.role ? ctx.user.role : 'UNKNOWN'
    );
  } else {
    return Promise.resolve('UNKNOWN');
  }
};

/**
 * GraphQL Context Middleware
 * If Valid JWT token is present the user object is set on the context
 * This functional validates the user information and role
 * @param ctx
 */
export const getAuthenticatedUser = ctx => {
  if (process.env.JWT_AUTH === 'true') {
    return checkUser(ctx.user);
  } else {
    return Promise.resolve(ctx);
  }
};

const authMiddleware = authMiddlewareFactory();
const graphQLAuthMiddleware = authGraphQLMiddlewareFactory();
export { authMiddleware, graphQLAuthMiddleware };
