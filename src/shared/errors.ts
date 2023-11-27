export class BusinessError extends Error {
    static readonly NOT_FOUND = 'NOT_FOUND';
    static readonly PRECONDITION_FAILED = 'PRECONDITION_FAILED';
    static readonly BAD_REQUEST = 'BAD_REQUEST';
  
    constructor(message: string, public readonly type: string) {
      super(message);
      this.name = 'BusinessError';
    }
  }