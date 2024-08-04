import { Types } from "mongoose";

export interface TUser {
    email: string;
    country: string;
    city: string;
    phone: string;
    post_code: string;
    name: string;
}

export interface TOrder {
    id: Types.ObjectId;
    title: string;
    img: string;
    stock: number;
    quantity: number;
    payable: number;
    value?: number;
}

export interface TOthers {
    track: number;
    status: string;
}

export interface TUserOrders {
    user: TUser;
    orders: TOrder[];
    others: TOthers;
}

