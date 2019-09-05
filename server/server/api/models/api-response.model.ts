/**
 * HTTP API Response
 * Based on the JSON API specification
 * http://jsonapi.org/format/#content-negotiation
 */
export interface APIResponse {
  data?: any;
  errors?: any;
  meta?: any;
  status?: any;
}
