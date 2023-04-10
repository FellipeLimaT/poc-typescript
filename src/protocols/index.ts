export type UserEntity = {
    id: number,
    name?: string,
    email: string,
    password: string
}

export type User = Omit<UserEntity, "id">

export type Session = {
    id: number,
    user_id: number,
    token: string
}

export type ProductEntity = {
    id: number,
    name: string,
    validity: Date,
    amount: number,
    price: number
}

export type Product = Omit<ProductEntity, "id">

export interface IError extends Error {
    status: number
}
