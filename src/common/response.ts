import { Response } from 'express'


const sendSuccessMessage = (res: Response, data?: any) => {
    const response = {
        statusCode: 200,
        data: data || {}
    };
    res.status(response.statusCode).send(response);
}

const sendErrorMessage = (res: Response, error: any) => {
    let message = error.message;
    if (error.isJoi) {
        message = error.details[0].message;
    }

    const response = {
        statusCode: 400,
        message: message
    }
    res.status(response.statusCode).send(response);
}

export { sendSuccessMessage, sendErrorMessage }