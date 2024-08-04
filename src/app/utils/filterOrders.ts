import { TOrder } from "../modules/orders/orders.interface";

const filterOrders = (orders: TOrder[]) => {

    return orders.map(order => {
        return {
            id: order.id,
            quantity: order.quantity
        };
    });
};

export default filterOrders;