const BASE_URL = "http://localhost:8080";

// auth apis
exports.signinApi = `${BASE_URL}/auth/signin`;
exports.signupApi = `${BASE_URL}/auth/signup`;

// product apis
exports.getAllProductsApi = `${BASE_URL}/api/products`;
// api/product/:productId
exports.getProductApi = `${BASE_URL}/api/products`;

// cart apis
exports.fetchCartApi = `${BASE_URL}/cart/fetchCart`;
exports.updateCartApi = `${BASE_URL}/cart/update`;

// address apis
// /addresses/:userId
exports.getAddressesApi = `${BASE_URL}/addresses`;

// order apis
exports.placeOrderApi = `${BASE_URL}/placeOrder`;
// /orders/:userId
exports.getOrdersApi = `${BASE_URL}/orders`;
// /orders/:orderId
exports.getOrderApi = `${BASE_URL}/order`;
