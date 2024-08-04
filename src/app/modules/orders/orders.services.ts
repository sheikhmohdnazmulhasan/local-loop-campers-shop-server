import { TUserOrders } from "./orders.interface";

async function createOrderIntoDb(payload: TUserOrders) {

    console.log(payload);
}

export const OrderServices = { createOrderIntoDb }