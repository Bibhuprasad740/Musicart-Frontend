import React from "react";
import classes from "./Invoice.module.css";
import invoiceLogo from "../../assets/invoiceLogo.png";

const Invoice = ({ invoice }) => {
  return (
    <div className={classes.invoice}>
      <div className={classes.detailsSection}>
        <img src={invoiceLogo} alt="" />
        <div className={classes.details}>
          <p className={classes.name}>{invoice.name}</p>
          <p className={classes.info}>{invoice.address}</p>
        </div>
      </div>
      <button className={classes.viewButton}>View Invoice</button>
    </div>
  );
};

export default Invoice;
