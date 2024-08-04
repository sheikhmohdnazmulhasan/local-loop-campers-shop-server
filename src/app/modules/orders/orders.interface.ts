
export interface TUser {
    email: string;
    country: string;
    city: string;
    phone: string;
    post_code: string;
    name: string;
}

export interface TOrder {
    id: string;
    title: string;
    img: string;
    stock: number;
    quantity: number;
    payable: number;
}

export interface TUserOrders {
    user: TUser;
    orders: TOrder[];
}

