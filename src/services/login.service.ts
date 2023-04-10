import { loginErrors } from "../errors/login.errors.js";
import { User } from "../protocols";
import { loginRepository } from '../repositories/login.repository.js'
import { authRepository } from "../repositories/auth.repository.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

async function signUp(
    { name, email, password }: User):
    Promise<void> {

    const { rowCount: userFound } = await loginRepository.findByEmail(email);

    if (userFound) throw loginErrors.emailConflict();

    const hash = await bcrypt.hash(password, 10);

    await loginRepository.createUser({
        name, email, password: hash
    });

}

async function signIn({ email, password }: User):
    Promise<string> {
    
    const { rows: [user] } = await loginRepository.findByEmail(email);

    if (!user) throw loginErrors.unprocessableEntity();

    if (user && bcrypt.compareSync(password, user.password)) {

        const { rows: [session] } = await authRepository.findByUserId(user.id);
        
        if (session) {
            jwt.verify(
                session.token, process.env.SECRET_JWT,
                (error, decoded) => {
                    if (error)
                        console.log(error);
            });
            return session.token;
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email
        }, process.env.SECRET_JWT || 'secret');

        jwt.verify(token, process.env.SECRET_JWT,
            (error, decoded) => {
                if (error)
                console.log(error.message);
        });

        await authRepository.createSession(user.id, token);

        return token;
    } else {
        throw loginErrors.unprocessableEntity();
    }
}

export const loginService = {
    signUp,
    signIn
}