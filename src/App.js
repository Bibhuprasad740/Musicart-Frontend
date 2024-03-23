import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./components/home/HomePage";
import ErrorPage from "./components/error/ErrorPage";
import SignupPage from "./components/auth/signup/SignupPage";
import SigninPage from "./components/auth/signin/SigninPage";
import CartPage from "./components/cart/CartPage";
import CheckoutPage from "./components/checkout/CheckoutPage";
import InvoicesPage from "./components/invoices/InvoicesPage";
import InvoiceDetailsPage from "./components/invoice-details/InvoiceDetailsPage";
import OrderSuccessPage from "./components/order-success/OrderSuccessPage";
import ProductDetailsPage from "./components/product-details/ProductDetailsPage";
import { authProtection, routeProtection } from "./utils/utils";
import Root from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "signup",
        element: <SignupPage />,
        loader: authProtection,
        errorElement: <ErrorPage />,
      },
      {
        path: "signin",
        element: <SigninPage />,
        loader: authProtection,
        errorElement: <ErrorPage />,
      },
      {
        path: "products/:productId",
        element: <ProductDetailsPage />,
        errorElement: <HomePage />,
      },
      {
        path: "cart",
        element: <CartPage />,
        errorElement: <ErrorPage />,
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
        loader: routeProtection,
        errorElement: <ErrorPage />,
      },
      {
        path: "invoices",
        element: <InvoicesPage />,
        loader: routeProtection,
        errorElement: <ErrorPage />,
      },
      {
        path: "invoice/:invoiceId",
        element: <InvoiceDetailsPage />,
        loader: routeProtection,
        errorElement: <ErrorPage />,
      },
      {
        path: "orders/:orderId",
        element: <OrderSuccessPage />,
        loader: routeProtection,
        errorElement: <ErrorPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
