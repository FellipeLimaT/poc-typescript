import { productsRepository } from "../repositories/products.repository.js";
import { productsErrors } from "../errors/products.errors.js";

export async function checkProduct(id: number):
    Promise<void> {

    const { rows: [productFound] } = await productsRepository.selectProductById(id);

    if (!productFound) throw productsErrors.productNotFound();
}