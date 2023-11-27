export declare class BusinessError extends Error {
    readonly type: string;
    static readonly NOT_FOUND = "NOT_FOUND";
    static readonly PRECONDITION_FAILED = "PRECONDITION_FAILED";
    static readonly BAD_REQUEST = "BAD_REQUEST";
    constructor(message: string, type: string);
}
