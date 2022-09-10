
export const callDirection = {
    INCOMING: 0,
    OUTGOING: 1
};

export const callState = {
    CALL_STATE_START: -2,
    CALL_STATE_RINGING: 1,
    CALL_STATE_OFFHOOK: 2,
    CALL_STATE_IDLE: 0
};

export const orderStatus = {
    NONE: 'none',
    PENDING: 'pending',
    COURIER_PENDING: 'courier-pending',
    COURIER_ACCEPTED: 'courier-accepted',
    COURIER_DELIVERED: 'courier-delivered',
    DELIVERED: 'delivered',
    REJECTED: 'rejected'
};



export const webPermission = {
    RINGING_CALL: 'ringing-call', // gelyan janlar
    ACCEPTED_CALL: 'accepted-call', // Kabul edilen janlar
    REJECTED_CALL: 'rejected-call', // Goyberilen janlar
    CUSTOMERS: 'customer', // Musderiler
    COURIER: 'courier', // Eltip berijiler
    STAFF: 'staff', // moderator, admin
    SELL_POINTS: 'sell-points', // satysh nokatlary
    FIELDS: 'fields', // gurleyish tony, gurleyish aheni we sh.m
    OPERATOR: 'operator', // operatorlar
    ORDERS: 'orders', // sargytlar
    INBOX: 'inbox', // hatlar
};

export const loginType = {
    LOGIN: 1,
    LOGOUT: 0
};


export const callStatus = {
    ACCEPTED: 2,
    REJECTED: 3,
    ACCEPTED_AFTER_REJECTED: 4
};

export const translateStatus = (status) => {
    if (status === "none") {
        return "Status ýok";
    }
    if (status === "pending") {
        return "Garaşylýar";
    }
    if (status === "courier-pending") {
        return "Eltip berijä ugradyldy";
    }
    if (status === "courier-accepted") {
        return "Eltip beriji kabul etdi";
    }
    if (status === "courier-delivered") {
        return "Eltip beriji eltip berdi";
    }
    if (status === "delivered") {
        return "Sargyt tamamlandy";
    }
    if (status === "rejected") {
        return "Sargyt ýatyryldy";
    }
};

export const tables = {
    customer: "customer",
    customer_interested_product: "customer_interested_product",
    user_role: "user_role",
    speak_tone: "speak_tone",
    speak_accent: "speak_accent",
    speak_mode: "speak_mode",
    sell_point: "sell_point",
    role_permission: "role_permission",
    focus_word: "focus_word",
    customer_status: "customer_status",
    cancel_reason: "cancel_reason",
    courier: "courier",
    users: "users",
    inbox: "inbox",
    customer_order: "customer_order",
    customer_order_address_history: "customer_order_address_history",
    customer_order_courier_history: "customer_order_courier_history",
    customer_order_date_history: "customer_order_date_history",
    customer_order_delivery_price: "customer_order_delivery_price",
    customer_order_location_history: "customer_order_location_history",
    customer_order_product: "customer_order_product",
    customer_order_product_status_history: "customer_order_product_status_history",
    customer_order_status_history: "customer_order_status_history",
    phone_call: "phone_call"
}


export const syncDirection = {
    OFFLINE_TO_ONLINE: "offline_to_online",
    ONLINE_TO_OFFLINE: "online_to_offline"
}

// LIMIT $1 OFFSET ($2 - 1) * $1;