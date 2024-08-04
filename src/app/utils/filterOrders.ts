import { TOrder } from "../modules/orders/orders.interface";

const filterOrders = (orders: TOrder[]) => {

    return orders.map(order => {
        return {
            id: order.id,
            quantity: order.quantity,
            img: order.img,
            value: order.payable,
            title: order.title
        };
    });
};

export default filterOrders;