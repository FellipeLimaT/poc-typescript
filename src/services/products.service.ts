import { productsErrors } from "../errors/products.errors.js";
import { Product, ProductEntity } from "../protocols";
import { productsRepository } from "../repositories/products.repository.js";
import { checkProduct } from '../utils/index.js';

async function createProduct(
    { name, validity, amount, price }: Product):
    Promise<void> {

    const { rowCount: productFound } = await productsRepository.selectProductByName(name);

    if (productFound) throw productsErrors.duplicatedProducts();

    await productsRepository.createProduct({
        name, validity, amount, price
    });
}

async function getProducts(): Promise<ProductEntity[]> {

    const { rows: products } = await productsRepository.selectProducts();
    
    return products;
}

async function updateProduct(id: number,
    { name, validity, price, amount }: Product):
    Promise<void> {

    await checkProduct(id);

    await productsRepository.
        updateProduct({
            name, validity, amount, price
        }, id);
}

async function deleteProduct(id: number):
    Promise<void> {
    
    await checkProduct(id);

    await productsRepository.deleteProduct(id);
}

export const productsService = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}