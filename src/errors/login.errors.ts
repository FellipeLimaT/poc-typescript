import { IError } from "../protocols"

function emailConflict():IError {
    return {
        name: "Email Conflict",
        message: "Email already in use",
        status: 409
    }
}

function unprocessableEntity():IError {
    return {
        name: "Unprocessable Entity",
        message: "Couldn't log you in",
        status: 422
    }
}

export const loginErrors = {
    emailConflict,
    unprocessableEntity
}