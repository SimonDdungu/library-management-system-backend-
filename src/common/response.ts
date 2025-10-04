import { Response } from 'express'


const sendSuccessMessage = (res: Response, data?: any) => {
    const response = {
        statusCode: 200,
        message: "Authorized, Successfully retrieved data.",
        data: data || {}
    };
    res.status(response.statusCode).send(response);
}

const handleErrorResponse = (res: Response, status: number, error: any, message?: string) => {
    let errorMessage = error.message;
    if (error.isJoi) {
        errorMessage = error.details[0].message ;
    }

    const response = {
        statusCode: status || 500,
        message: message || "Internal Server Error",
        error: errorMessage,
    }
    res.status(response.statusCode).send(response);
}

export { sendSuccessMessage, handleErrorResponse }