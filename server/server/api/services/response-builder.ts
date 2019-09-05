/**
 * Error Response Builder
 */
export class ErrorResponseBuilder {
  private status: number;
  private source: string;
  private title: string;
  private message: string;
  private detail: string;

  public setTitle(title: string) {
    this.title = title;
    return this;
  }

  get Title() {
    return this.title;
  }

  public setSource(source: string) {
    this.source = source;
    return this;
  }

  get Source() {
    return this.source;
  }

  get Status() {
    return this.status;
  }

  public setStatus(status: number) {
    this.status = status;
    return this;
  }

  get Message() {
    return this.message;
  }

  public setMessage(message: string) {
    this.message = message;
    return this;
  }

  get Detail() {
    return this.detail;
  }

  public setDetail(detail: string) {
    this.detail = detail;
    return this;
  }

  public build(): ErrorResponse {
    return new ErrorResponse(this);
  }
}

// tslint:disable-next-line:max-classes-per-file
export class ErrorResponse {
  private readonly status: number;
  private readonly source: string;
  private readonly title: string;
  private readonly message: string;
  private readonly detail: string;

  constructor(builder: ErrorResponseBuilder) {
    this.status = builder.Status;
    this.source = builder.Source;
    this.title = builder.Title;
    this.message = builder.Message;
    this.detail = builder.Detail;
  }

  get Detail() {
    return this.detail;
  }

  get Message() {
    return this.message;
  }

  get Source() {
    return this.source;
  }

  get Status() {
    return this.status;
  }

  get Title() {
    return this.title;
  }
}

export default new ErrorResponseBuilder();
