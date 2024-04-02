import React, { useState } from "react";
import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cartSlice";

import { MdDelete } from "react-icons/md";
import Modal from "../reusables/Modal";
import { toast } from "react-hot-toast";

const CartItem = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const [showModal, setShowModal] = useState(false);
  const quantityChangeHandler = (event) => {
    setQuantity(event.target.value);
    dispatch(
      cartActions.changeQuantity({
        item: product,
        quantity: parseInt(event.target.value),
      })
    );
  };

  const deleteCartItem = () => {
    dispatch(
      cartActions.deleteItemFromCart({
        id: product._id,
        quantity: product.quantity,
        price: product.price,
      })
    );
    setShowModal(false);
    toast.success("Product Deleted successfully!");
  };

  let initialTouchX;

  const touchStartHandler = (event) => {
    initialTouchX = event.touches[0].clientX;
  };

  const touchMoveHandler = (event) => {
    const currentTouchX = event.touches[0].clientX;
    const touchDistance = currentTouchX - initialTouchX;

    const isLeftSwipe = touchDistance < 0;

    const deletionThreshold = 50;
    const absTouchDistance = Math.abs(touchDistance);
    if (isLeftSwipe && absTouchDistance >= deletionThreshold) {
      setShowModal(true);
    }
  };

  return (
    <div
      className={classes.cartItem}
      onTouchStart={touchStartHandler}
      onTouchMove={touchMoveHandler}
    >
      <div className={classes.imageSection}>
        {showModal && (
          <Modal>
            <div className={classes.container}>
              <img src={product.imageUrls[0]} alt="" />
              <div className={classes.detailsBox}>
                <p className={classes.deleteText}>
                  Delete this item from cart?
                </p>
                <button
                  className={classes.cancelButton}
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className={classes.confirmButton}
                  onClick={deleteCartItem}
                >
                  Yes Delete
                </button>
              </div>
            </div>
          </Modal>
        )}
        {/* image */}
        <section className={classes.imageContainer}>
          <img src={product.imageUrls[0]} alt="" />
        </section>
      </div>
      <div className={classes.detailsSection}>
        {/* details */}
        <section className={classes.detailsContainer}>
          <p className={classes.heading}>{product.name}</p>
          <span>Color: </span>
          <span className={classes.details}>{product.color}</span>
          <p>In Stock</p>
        </section>
        {/* price */}
        <section className={classes.priceSection}>
          <p className={classes.heading}>Price</p>
          <p className={classes.heading}>{`₹ ${product.price}`}</p>
        </section>

        {/* quantity */}
        <section className={classes.quantitySection}>
          <p className={classes.heading}>Quantity</p>
          <select
            value={quantity}
            className={classes.quantity}
            onChange={quantityChangeHandler}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
        </section>

        {/* total */}
        <section className={classes.totalSection}>
          <p className={classes.heading}>Total</p>
          <p className={classes.heading}>{`₹ ${product.price * quantity}`}</p>
        </section>
        <div
          className={classes.deleteButton}
          onClick={() => setShowModal(true)}
        >
          <MdDelete size={25} />
        </div>
      </div>
    </div>
  );
};

export default CartItem;
