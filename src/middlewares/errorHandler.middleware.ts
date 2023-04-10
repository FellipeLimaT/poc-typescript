import { Request, Response, NextFunction } from "express";
import { IError } from "../protocols";

export function errorHandlerMiddleware(
    error: IError,
    req: Request,
    res: Response,
    next: NextFunction): Response {
    
    console.log(error);
    return res.status(error.status).send(error.message);
}
