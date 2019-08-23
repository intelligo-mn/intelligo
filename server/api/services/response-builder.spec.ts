import { ErrorResponseBuilder } from './response-builder';
import { HttpStatus } from './http-status-codes';
import '../../common/env';

describe('Error Response Builder Tests', () => {
  it('can prepare and verify response builder', () => {
    const errorResponse: any = {
      title: 'Test Title',
      status: HttpStatus.NOT_FOUND,
      detail: 'Dummy Stack Trace',
      message: 'Error Message',
      source: 'Error Source'
    };

    const resp = new ErrorResponseBuilder()
      .setTitle('Test Title')
      .setStatus(HttpStatus.NOT_FOUND)
      .setDetail('Dummy Stack Trace')
      .setMessage('Error Message')
      .setSource('Error Source')
      .build();

    expect(resp).toEqual(errorResponse);
  });
});
