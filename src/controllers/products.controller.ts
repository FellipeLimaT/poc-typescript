import { Request, Response } from 'express';
import { Product } from '../protocols/index.js';
import { productsService } from '../services/products.service.js';

async function createProduct(req: Request,
    res: Response):Promise<Response> {
    const product = req.body as Product;

    await productsService.createProduct(product);

    return res.status(201).send('Produto cadastrado');    
}

async function getProducts(req: Request,
    res: Response):Promise<Response> {
    
    const products = await productsService.getProducts();
    
    return res.status(200).send(products);
}

async function updateProduct(req: Request,
    res: Response): Promise<Response> {
    
    const id: number = +req.params.id;

    const product = req.body as Product;

    await productsService.updateProduct(id, product);

    return res.status(200).send('Produto atualizado');
}

async function deleteProduct(req: Request,
    res: Response): Promise<Response> {
    
    const id: number = +req.params.id;

    await productsService.deleteProduct(id);

    return res.status(200).send('Produto removido');
}

export const productsController = {
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct
}