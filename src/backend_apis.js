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
