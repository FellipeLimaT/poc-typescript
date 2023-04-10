import joi from 'joi';

export const productSchema = joi.object({
    name: joi.string().min(4).required(),
    validity: joi.date().required(),
    amount: joi.number().positive().required(),
    price: joi.number().positive().required()
})