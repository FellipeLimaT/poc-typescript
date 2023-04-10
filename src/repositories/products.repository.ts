import { QueryResult, QueryResultRow } from "pg";
import { db } from "../config/database.js";
import { Product, ProductEntity } from '../protocols'

function selectProducts():
    Promise<QueryResult<ProductEntity>> {
    return db.query(
    `
    SELECT * FROM products;
    `);
}

function selectProductByName(name: string):
    Promise<QueryResult<ProductEntity>> {
    
    return db.query(
    `
    SELECT * FROM products
    WHERE product_name=$1;
    `, [name]);
}

function selectProductById(id: number):
    Promise<QueryResult<ProductEntity>>{
    
    return db.query(
    `
    SELECT * FROM products
    WHERE id=$1;
    `, [id]);
}

function createProduct(
    { name, validity, amount, price }: Product):
    Promise<QueryResult<QueryResultRow>>{
    
    return db.query(
    `
    INSERT INTO products 
    (product_name, validity_date, amount, price)
    VALUES ($1, $2, $3, $4);
    `, [name, validity, amount, price]);    
}

function updateProduct(
    { name, validity, amount, price }: Product,
    id: number):
    Promise<QueryResult<QueryResultRow>> {

    return db.query(
    `
    UPDATE products 
    SET product_name=$1, validity_date=$2, 
    amount=$3, price=$4
    WHERE id=$5;
    `, [name, validity, amount, price, id]);
}
    
function deleteProduct(id: number):
    Promise<QueryResult<QueryResultRow>> {
    
    return db.query(`DELETE FROM products 
    WHERE id=$1;`, [id]);
}

export const productsRepository = {
    selectProducts,
    selectProductByName,
    selectProductById,
    createProduct,
    updateProduct,
    deleteProduct
}