import { model, Schema } from "mongoose";
import { TOrder, TOthers, TUser, TUserOrders } from "./orders.interface";

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
    id: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true },
    img: { type: String, required: true },
    value: { type: Number, required: true },
    title: { type: String, required: true },
});

// child
const othersSchema = new Schema<TOthers>({
    track: { type: Number, required: true },
    status: { type: String, required: true }
})

// parent
const userOrdersSchema = new Schema<TUserOrders>({
    user: { type: userSchema, required: true },
    orders: { type: [orderSchema], required: true },
    others: { type: othersSchema, required: true }
}, { timestamps: true });



const Order = model<TUserOrders>('Order', userOrdersSchema);
export default Order