import React, { useCallback, useEffect, useState } from "react";
import classes from "./InvoiceDetailsPage.module.css";
import MobileHeader from "../MobileHeader";
import DesktopHeader from "../DesktopHeader";
import NavigationSection from "../NavigationSection";
import BackButton from "../reusables/BackButton";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { getOrderApi, getProductApi } from "../../backend_apis";

const InvoiceDetailsPage = () => {
  const { invoiceId } = useParams();
  const token = useSelector((state) => state.auth.token);
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [invoice, setInvoice] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      setIsLoading(true);

      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${getOrderApi}/${invoiceId}`, {
          headers,
        });

        const fetchedData = response.data;
        setTotalPrice(fetchedData.price.cartTotal);
        setInvoice(fetchedData);
      } catch (error) {
        console.log("Error fetching order:", error);
      }

      setIsLoading(false);
    };
    fetchInvoice();
  }, [invoiceId, token]);

  const fetchProducts = useCallback(async () => {
    setIsFetchingProducts(true);

    try {
      const productPromises = invoice.products.map(async (productItem) => {
        const response = await axios.get(`${getProductApi}/${productItem}`);
        return {
          ...response.data,
        };
      });

      const fetchedProducts = await Promise.all(productPromises);
      // console.log(fetchedProducts);
      setProducts(fetchedProducts);
    } catch (error) {
      console.log("Error fetching products:", error);
    }

    setIsFetchingProducts(false);
  }, [invoice.products, setIsFetchingProducts, setProducts]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts, invoice]);

  return (
    <div className={classes.invoiceDetailsPage}>
      <section className={classes.headerSection}>
        <div className={classes.mobile}>
          <MobileHeader />
        </div>
        <div className={classes.desktop}>
          <DesktopHeader />
        </div>
      </section>
      <div className={classes.main}>
        <NavigationSection />
        <BackButton backTo="Cart" redirectTo="/cart" />
        <div className={classes.invoiceMain}>
          <div className={classes.invoiceHeader}>
            <p className={classes.headerTitle}>Invoice</p>
          </div>

          {/* invoice details */}
          {isLoading || isFetchingProducts ? (
            <p>Loading...</p>
          ) : (
            <div className={classes.detailsMain}>
              {/* product details */}
              <div className={classes.productsSection}>
                {/* info box for address */}
                <section className={classes.infoBox}>
                  <p className={classes.redHeading}>1. Delivery Address</p>
                  <div>
                    <p className={classes.name}>{invoice.name}</p>
                    <textarea
                      disabled={true}
                      className={classes.userAddress}
                      placeholder="Enter your address"
                      name="address"
                      rows="3"
                      value={invoice.address}
                    ></textarea>
                  </div>
                </section>
                {/* divider */}
                <div className={classes.divider}></div>

                {/*info box for payment */}
                <section className={classes.infoBox}>
                  <p className={classes.redHeading}>2. Payment Method</p>
                  <div className={classes.paymentBox}>
                    <p>{invoice.paymentMode}</p>
                  </div>
                </section>
                {/* divider */}
                <div className={classes.divider}></div>

                {/* info box for Review items */}
                <section className={classes.reviewBox}>
                  <p className={classes.redHeading}>
                    3. Review items and delivery
                  </p>
                  <div>
                    <div className={classes.imageSection}>
                      {products.map((product) => (
                        <img
                          className={
                            selectedProduct?._id !== product._id
                              ? classes.image
                              : `${classes.image} ${classes.selected}`
                          }
                          src={product.imageUrls[0]}
                          key={product._id}
                          onClick={() => setSelectedProduct(product)}
                          alt=""
                        />
                      ))}
                    </div>

                    {/* selected item details */}
                    {selectedProduct && (
                      <div style={{ marginTop: "20px" }}>
                        <p className={classes.heading}>
                          {selectedProduct.name}
                        </p>
                        <p className={classes.detailsKey}>
                          {`Color: ${selectedProduct.color} | Quantity: ${selectedProduct.quantity}`}
                        </p>
                        <p className={classes.detailsKey}>
                          Estimated Delivery:
                        </p>
                        <p className={classes.detailsKey}>
                          Monday - Free Standard Delivery
                        </p>
                      </div>
                    )}
                  </div>
                </section>
                {/* divider */}
                <div className={classes.divider}></div>
              </div>

              {/* price details */}
              <div className={classes.priceSection}>
                <div className={classes.detailsSection}>
                  {/* total mrp */}
                  <p className={classes.heading}>Order Summary</p>
                  <div className={classes.detailsBox}>
                    <p className={classes.detailsKey}>Total MRP</p>
                    <p className={classes.detailsValue}>{`₹ ${totalPrice}`}</p>
                  </div>

                  {/* discount on mrp */}
                  <div className={classes.detailsBox}>
                    <p className={classes.detailsKey}>Discount on MRP</p>
                    <p className={classes.detailsValue}>₹ 0</p>
                  </div>

                  {/* convinience fee */}
                  <div className={classes.detailsBox}>
                    <p className={classes.detailsKey}>Convenience Fee</p>
                    <p className={classes.detailsValue}>₹ 45</p>
                  </div>

                  {/* divider */}
                  <div className={classes.divider}></div>

                  {/* total price */}
                  <div className={classes.totalBox}>
                    <p className={classes.detailsKey}>Total Price</p>
                    <p className={classes.detailsValue}>
                      {`₹ ${totalPrice + 45}`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InvoiceDetailsPage;
