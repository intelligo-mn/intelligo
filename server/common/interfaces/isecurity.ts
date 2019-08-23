export enum JWT_KeyType {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

/**
 * Security Service Interface
 * Reads the RSA private key and provides the value
 */
export interface ISecurity {
  getKey(keyType: JWT_KeyType);
}
