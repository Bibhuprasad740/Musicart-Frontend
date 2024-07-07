// const BASE_URL = "http://localhost:8080";
const BASE_URL = "https://musicart-backend-1pqc94gdd.vercel.app";

/*============================= auth apis ================================== */

exports.signinApi = `${BASE_URL}/auth/signin`;
exports.signupApi = `${BASE_URL}/auth/signup`;

/*============================= products apis ================================== */

// all products
exports.getAllProductsApi = `${BASE_URL}/products/all`;
// products/<productId>
exports.getProductApi = `${BASE_URL}/products`;

/*============================= cart apis ================================== */

exports.fetchCartApi = `${BASE_URL}/cart/fetchCart`;
exports.updateCartApi = `${BASE_URL}/cart/update`;

/*============================= address apis ================================== */

// /addresses/<userId>
exports.getAddressesApi = `${BASE_URL}/addresses`;
/*============================= order apis ================================== */

// place order
exports.placeOrderApi = `${BASE_URL}/orders/placeOrder`;

// /orders/user/<userId>
exports.getOrdersApi = `${BASE_URL}/orders/user`;

// /orders/<orderId>
exports.getOrderApi = `${BASE_URL}/orders`;

/*============================= feedback apis ================================== */

// feedabck api
exports.submitFeedbackApi = `${BASE_URL}/feedback/submit`;
