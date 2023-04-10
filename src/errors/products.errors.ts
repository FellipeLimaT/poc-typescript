import { IError } from "../protocols"

function duplicatedProducts():IError {
    return {
        name: "Duplicated products name",
        message:"Produto já cadastrado" ,
        status: 409
    }
}

function productNotFound(): IError{
    return {
        name: "Product not found",
        message: "Produto inexistente",
        status: 404
    }
}
export const productsErrors = {
    duplicatedProducts,
    productNotFound
}