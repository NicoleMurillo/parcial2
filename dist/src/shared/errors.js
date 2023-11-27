"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusinessError = void 0;
class BusinessError extends Error {
    constructor(message, type) {
        super(message);
        this.type = type;
        this.name = 'BusinessError';
    }
}
exports.BusinessError = BusinessError;
BusinessError.NOT_FOUND = 'NOT_FOUND';
BusinessError.PRECONDITION_FAILED = 'PRECONDITION_FAILED';
BusinessError.BAD_REQUEST = 'BAD_REQUEST';
//# sourceMappingURL=errors.js.map