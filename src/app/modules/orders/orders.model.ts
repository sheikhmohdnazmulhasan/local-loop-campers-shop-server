import { model, Schema } from "mongoose";
import { TOrder, TUser, TUserOrders } from "./orders.interface";

// child
const userSchema = new Schema<TUser>({
    email: { type: String, required: true },
    country: { type: String, required: true },
    city: { type: String, required: true },
    phone: { type: String, required: true },
    post_code: { type: String, required: true },
    name: { type: String, required: true }
});

// child
const orderSchema = new Schema<TOrder>({
    id: { type: String, required: true },
    title: { type: String, required: true },
    img: { type: String, required: true },
    stock: { type: Number, required: true },
    quantity: { type: Number, required: true },
    payable: { type: Number, required: true }
});

// parent
const userOrdersSchema = new Schema<TUserOrders>({
    user: { type: userSchema, required: true },
    orders: { type: [orderSchema], required: true }
});


const Order = model<TUserOrders>('order', userOrdersSchema);
export default Order