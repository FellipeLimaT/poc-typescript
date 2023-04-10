import { IError } from "../protocols";

function tokenError(): IError{
    return {
        name: "Token Error",
        message: "Sem token",
        status: 401
    }
}

function invalidToken(): IError{
    return {
        name: "Invalid Token",
        message: "Token inválido",
        status: 401
    }
}

function sessionError(): IError{
    return {
        name: "Session Error",
        message: "Usuário não autenticado",
        status: 401
    }
}

export const authErrors = {
    tokenError,
    invalidToken,
    sessionError
}