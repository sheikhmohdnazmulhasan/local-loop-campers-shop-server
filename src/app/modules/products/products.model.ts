import mongoose, { Schema } from "mongoose";
import { TProducts } from "./products.interface";

const productsSchema = new Schema<TProducts>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    images: { type: [String], required: true },
});

const Product = mongoose.model<TProducts>('product', productsSchema)