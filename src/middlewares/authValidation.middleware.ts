import {Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { authErrors } from "../errors/auth.errors.js";
import { authRepository } from "../repositories/auth.repository.js";

export async function authValidation(
    req: Request, res: Response, next: NextFunction):
    Promise<void>{
    
    const { authorization } = req.headers;
    
    const token = authorization?.replace('Bearer ', '');

    if (!token) throw authErrors.tokenError();

    jwt.verify(token, process.env.SECRET_JWT,
        (error, decoded) => {
            if (error) throw authErrors.invalidToken();
        });
    
    const { rows: [session] } = await authRepository.findByToken(token);
    
    if (!session) throw authErrors.sessionError();    
    
    next();
}