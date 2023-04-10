import { QueryResult } from 'pg'
import { db } from '../config/database.js'
import { User, UserEntity } from '../protocols'

function createUser(
    { name, email, password }: User):
    Promise<QueryResult> {
    
    return db.query(
    `
    INSERT INTO users 
    (name, email, password)
    VALUES ($1, $2, $3);
    `, [name, email, password])
}

function findByEmail(email: string):
    Promise<QueryResult<UserEntity>>    {
    
    return db.query(
    `
    SELECT * FROM users
    WHERE email=$1;
    `, [email])
}

export const loginRepository = {
    createUser,
    findByEmail
}