import React, { useState } from "react";
import classes from "./HomePage.module.css";
import MobileHeader from "../MobileHeader";
import DesktopHeader from "../DesktopHeader";
import NavigationSection from "../NavigationSection";
import BannerSection from "./BannerSection";

import feedback from "../../assets/feedback.png";

import { CiSearch } from "react-icons/ci";
import { IoGrid } from "react-icons/io5";
import { IoGridOutline } from "react-icons/io5";
import { TiThList } from "react-icons/ti";
import { TiThListOutline } from "react-icons/ti";

import Product from "../reusables/Product";
import FeedbackForm from "./FeedbackForm";
import { useDispatch, useSelector } from "react-redux";
import { uiActions } from "../../store/uiSlice";

const size = 25;

const HomePage = () => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const products = useSelector((state) => state.product.products);
  const isLoadingProducts = useSelector((state) => state.product.isLoading);

  const showGrid = useSelector((state) => state.ui.showGrid);
  const toggleLayoutHandler = () => {
    dispatch(uiActions.toggleLayout());
  };

  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const toggleShowFeedbackFormHandler = () => {
    setShowFeedbackForm((state) => !state);
  };
  const closeFeedbackForm = () => {
    setShowFeedbackForm(false);
  };

  const [headphoneType, setHeadphoneType] = useState(null);
  const [headphoneCompany, setHeadphoneCompany] = useState(null);
  const [headphoneColor, setHeadphoneColor] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [sortType, setSortType] = useState("featured");

  const headphoneTypeChangeHandler = (event) => {
    setHeadphoneType(event.target.value);
  };
  const headphoneCompanyChangeHandler = (event) => {
    setHeadphoneCompany(event.target.value);
  };
  const headphoneColorChangeHandler = (event) => {
    setHeadphoneColor(event.target.value);
  };
  const priceRangeChangeHandler = (event) => {
    setPriceRange(event.target.value);
  };
  const sortTypeChangeHandler = (event) => {
    setSortType(event.target.value);
  };

  return (
    <div className={classes.home}>
      <section className={classes.headerSection}>
        <div className={classes.mobile}>
          <MobileHeader />
        </div>
        <div className={classes.desktop}>
          <DesktopHeader />
        </div>
      </section>
      {isLoadingProducts ? (
        <div></div>
      ) : (
        <div className={classes.main}>
          <NavigationSection />
          <BannerSection />

          {/* search bar */}
          <div className={classes.searchBar}>
            <CiSearch size={size} />
            <input
              className={classes.searchInput}
              type="text"
              placeholder="Search by product name"
            />
          </div>

          {/* Filters section */}
          <div className={classes.filterSection}>
            <div className={classes.filters}>
              {/* layout buttons */}
              {showGrid ? (
                <div className={classes.layoutButtons}>
                  <IoGrid size={size} className={classes.layoutButton} />
                  <TiThListOutline
                    onClick={toggleLayoutHandler}
                    size={size}
                    className={classes.layoutButton}
                  />
                </div>
              ) : (
                <div className={classes.layoutButtons}>
                  <IoGridOutline
                    onClick={toggleLayoutHandler}
                    size={size}
                    className={classes.layoutButton}
                  />
                  <TiThList size={size} className={classes.layoutButton} />
                </div>
              )}
              <select
                className={classes.filter}
                name="headphonetype"
                onChange={headphoneTypeChangeHandler}
                value={headphoneType}
              >
                <option value="" selected disabled hidden>
                  Headphone Type
                </option>
                <option value="featured">Featured</option>
                <option value="inear">In-ear headphone</option>
                <option value="onear">On-ear headphone</option>
                <option value="overear">Over-ear headphone</option>
              </select>
              <select
                className={classes.filter}
                name="company"
                onChange={headphoneCompanyChangeHandler}
                value={headphoneCompany}
              >
                <option value="" selected disabled hidden>
                  Company
                </option>
                <option value="featured">Featured</option>
                <option value="jbl">JBL</option>
                <option value="sony">SONY</option>
                <option value="boat">BOAT</option>
                <option value="zebronics">ZEBRONICS</option>
                <option value="marshall">MARSHALL</option>
                <option value="ptron">PTRON</option>
              </select>
              <select
                className={classes.filter}
                name="color"
                onChange={headphoneColorChangeHandler}
                value={headphoneColor}
              >
                <option value="" selected disabled hidden>
                  Color
                </option>
                <option value="featured">Featured</option>
                <option value="black">Black</option>
                <option value="blue">Blue</option>
                <option value="white">White</option>
                <option value="red">Red</option>
              </select>
              <select
                className={classes.filter}
                name="price"
                onChange={priceRangeChangeHandler}
                value={priceRange}
              >
                <option value="" selected disabled hidden>
                  Price
                </option>
                <option value="featured">Featured</option>
                <option value="0-1000">₹0-₹1,000</option>
                <option value="1000-2000">₹1,000-₹10,000</option>
                <option value="10000-20000">₹10,000-₹20,000</option>
              </select>
            </div>

            <div className={classes.sort}>
              <select
                className={classes.sortFilter}
                onChange={sortTypeChangeHandler}
                value={sortType}
              >
                <option value="" selected disabled hidden>
                  Sort by: Featured
                </option>
                <option value="featured">Featured</option>
                <option value="PriceLowest">Price:Lowest</option>
                <option value="PriceHighest">Price:Highest</option>
                <option value="a-z">Name:(A-Z)</option>
                <option value="z-a">Name:(Z-A)</option>
              </select>
            </div>
          </div>

          {/* Products */}
          <div
            className={showGrid ? classes.productsGrid : classes.productsList}
          >
            {products.map((product) => (
              <Product
                key={product._id}
                product={product}
                isGridView={showGrid}
              />
            ))}
          </div>
          {/* Feedback Section */}
          {auth.user && (
            <div className={classes.feedbackSection}>
              <img
                onClick={toggleShowFeedbackFormHandler}
                src={feedback}
                alt="feedback.png"
              />
              {showFeedbackForm && <FeedbackForm onClose={closeFeedbackForm} />}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
