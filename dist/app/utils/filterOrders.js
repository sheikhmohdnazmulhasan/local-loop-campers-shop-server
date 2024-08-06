"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filterOrders = (orders) => {
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
exports.default = filterOrders;
