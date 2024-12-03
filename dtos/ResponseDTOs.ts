export interface ResponseDTO<T> {
    success: boolean;
    data: T | null;
    message: string;
}

export const createResponse = <T>(success: boolean, data: T | null, message: string): ResponseDTO<T> => ({
    success,
    data,
    message,
});