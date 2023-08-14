import React, { useState } from "react";
import Navbar from "../../Layout/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";
import { useParams, useNavigate, Link } from "react-router-dom";
import Plant from "../../assets/images/product-detail.webp";
import axios from "axios";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreators } from "../../redux/actions";
import * as bootstrap from "bootstrap";
import { Toast } from "bootstrap";
// import { useState } from "react";
// import { useRef } from "react";

// const baseURL = "https://64ce6ec30c01d81da3eed0a8.mockapi.io/api/products/";
const baseURL = "http://localhost:8000/api/product/getOne/";

export default function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.AuthReducer.isAuthenticated
  );
  const [product, setProduct] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [inCart, setCart] = React.useState(false);
  const [showAddCart, setAddCart] = useState(false);
  const [showRemoveCart, setRemoveCart] = useState(false);

  var [toast, setToast] = React.useState(false);
  const toastRef = React.useRef();

  React.useEffect(() => {
    // var myToast = toastRef.current;
    // var bsToast = bootstrap.Toast.getInstance(myToast);
    // console.log("BS Toast", bsToast);
    // console.log("My Toast", myToast);
    // if (!bsToast) {
    //     bsToast = new Toast(myToast, {autohide: false})
    //     bsToast.hide()
    //     setToast(false)
    // }
    // else {
    //     toast ? bsToast.show() : bsToast.hide()
    // }
    axios.get(baseURL + params.productID).then((response) => {
      setProduct(response.data.data);
      isInCart(response.data.data);
    });
  }, []);

  const showToast = () => {};

  const isInCart = (product) => {
    if (localStorage.getItem("myCart") != null) {
      let products = JSON.parse(localStorage.getItem("myCart"));
      products.forEach((cartProduct) => {
        if (product._id === cartProduct._id) {
          setCart(true);
          return;
        }
      });
    }
  };

  const addToCart = () => {
    if (isAuthenticated) {
      product.quantity = parseInt(quantity);
      if (localStorage.getItem("myCart") != null) {
        let products = JSON.parse(localStorage.getItem("myCart"));
        products.push(product);
        localStorage.setItem("myCart", JSON.stringify(products));
        dispatch(
          ActionCreators.addCart(
            products,
            product.quantity,
            product.price * product.quantity
          )
        );
        setCart(true);
        setAddCart(true);
        setRemoveCart(false);
      } else {
        localStorage.setItem("myCart", JSON.stringify([product]));
        dispatch(
          ActionCreators.addCart(
            [product],
            product.quantity,
            product.price * product.quantity
          )
        );
        setCart(true);
        setAddCart(true);
        setRemoveCart(false);
      }
    } else {
      navigate("/login");
    }
  };

  const removeFromCart = () => {
    if (isAuthenticated) {
      if (localStorage.getItem("myCart") != null) {
        let products = JSON.parse(localStorage.getItem("myCart"));
        products.forEach((cartProduct) => {
          if (product._id === cartProduct._id) {
            products.splice(products.indexOf(cartProduct), 1);
            setCart(false);
            console.log("Product quantity: ", cartProduct.quantity);
            dispatch(
              ActionCreators.removeCart(
                products,
                cartProduct.quantity,
                cartProduct.price * cartProduct.quantity
              )
            );
            localStorage.setItem("myCart", JSON.stringify(products));
            return;
          }
        });
        setAddCart(false);
        setRemoveCart(true);
      }
    } else {
      navigate("/login");
    }
  };

  const onQualityChange = (e) => {
    setQuantity(e.target.value);
  };

  if (!product) return null;
  return (
    <div>
      <Navbar />
      <div className="container leaffie-product-details">
        <div className="row my-5 leaffie-product-details_content">
          <div className="col-6 leaffie-product-details_left">
            <img src={product.image} alt="" />
          </div>
          <div className="col-6 leaffie-product-details_right">
            <h3>{product.productName}</h3>
            <p>{product.price} $</p>
            <div className="d-flex">
              <input
                type="number"
                className="form-control form-control-lg w-25"
                placeholder="Quantity"
                value={quantity}
                onInput={(e) => onQualityChange(e)}
              />
              {inCart ? (
                <button
                  className="btn btn-cart-remove"
                  onClick={() => removeFromCart()}
                >
                  Remove from cart
                </button>
              ) : (
                <button className="btn btn-cart" onClick={() => addToCart()}>
                  Add to cart
                </button>
              )}
            </div>
            {showAddCart ? (
              <div
                className="alert alert-success alert-dismissible fade show mt-3"
                role="alert"
              >
                <strong>{product.productName}</strong> Added to the cart!
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setAddCart(false)}
                ></button>
              </div>
            ) : null}

            {showRemoveCart ? (
              <div
                className="alert alert-danger alert-dismissible fade show mt-3"
                role="alert"
              >
                <strong>{product.productName}</strong> Removed from the cart!
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setRemoveCart(false)}
                ></button>
              </div>
            ) : null}
          </div>
          <div className="col-6"></div>
          <div className="col-6 leaffie-product-details_right">
            <Link to="/products">Continue Shopping</Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
