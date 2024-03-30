import React, { useEffect, useState } from "react";
import classes from "./InvoicesPage.module.css";
import DesktopHeader from "../DesktopHeader";
import NavigationSection from "../NavigationSection";
import MobileHeader from "../MobileHeader";
import BackButton from "../reusables/BackButton";
import axios from "axios";
import { useSelector } from "react-redux";
import { getOrdersApi } from "../../backend_apis";
import Invoice from "./Invoice";

const InvoicesPage = () => {
  const user = useSelector((state) => state.auth.user);
  const token = useSelector((state) => state.auth.token);

  const [invoices, setInvoices] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchInvoices = async () => {
      setIsLoading(true);
      try {
        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${getOrdersApi}/${user._id}`, {
          headers,
        });
        setInvoices(response.data);
      } catch (error) {
        console.log("Error in fetching invoices..", error);
      }
      setIsLoading(false);
    };
    fetchInvoices();
  }, [user._id, token]);
  return (
    <div className={classes.invoicesPage}>
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
        <BackButton backTo="Products" redirectTo="/" />
        <p className={classes.heading}>My Invoices</p>
        {isLoading ? (
          <div></div>
        ) : invoices.length === 0 ? (
          <div className={classes.noProduct}>
            <p>No invoices found!</p>
          </div>
        ) : (
          <div className={classes.invoicesSection}>
            {invoices.map((invoice) => (
              <Invoice invoice={invoice} key={invoice._id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoicesPage;
