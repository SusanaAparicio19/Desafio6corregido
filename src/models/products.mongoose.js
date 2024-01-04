import { Schema,model } from 'mongoose'

const productSchema = new Schema({
    _id: { type: String, required: true },
    category: { type: String, required: true },
    object: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true },
    stock: { type: String, required: true },
    status: { type: String, required: true },
    price: { type: String, required: true },    
},{
    strict:'throw',
    versionKey: false,
})


export const dbProducts = model('products', productSchema)

