import React, { useEffect, useState } from "react";
import Navbar from "../../Layout/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";
import Plant from "../../assets/images/product-detail.webp";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import { ActionCreators } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  let cartItems = JSON.parse(localStorage.getItem("myCart"));
  const [cart, setCart] = useState(cartItems);
  const [emptyCart, setEmptyCart] = React.useState(true);
  const [showRemoveCart, setRemoveCart] = useState(false);
  const [removeProduct, setRemoveProduct] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myCart = useSelector((state) => state.cartReducer.cart);
  const [cartTotal, setCartTotal] = useState(myCart.total);
  useEffect(() => {
    if (cartItems) {
      setEmptyCart(false);
    }
  });
  const onRemoveCart = (cartItem) => {
    cartItems.forEach((item) => {
      if (item._id === cartItem._id) {
        cartItems.splice(cartItems.indexOf(item), 1);
        localStorage.setItem("myCart", JSON.stringify(cartItems));
        let cartTtl = cartTotal - cartItem.price * cartItem.qty;
        dispatch(
          ActionCreators.removeCart(
            cartItems,
            cartItem.quantity,
            cartItem.price * cartItem.quantity
          )
        );
        setCartTotal(cartTtl);
        setCart(cartItems);
        setRemoveProduct(cartItem.productName);
        setRemoveCart(true);
        if (cartItems && cartItems?.length > 0) {
          setEmptyCart(false);
        } else {
          setEmptyCart(true);
        }
        return;
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container leaffie-cart">
        <div className="row leaffie-cart_content my-3">
          <div className="col-12 leaffie-cart--title">
            <h3 className="text-center">Your Cart Items ({myCart.count})</h3>
          </div>
          <div className="col-12">
            {showRemoveCart ? (
              <div
                className="alert alert-danger alert-dismissible fade show mt-3"
                role="alert"
              >
                <strong>{removeProduct}</strong> Removed from the cart!
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
          <div className="col-12 leaffie-cart--table">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {emptyCart ? (
                  <tr className="text-center">
                    <td colspan="5">Your cart is empty!</td>
                  </tr>
                ) : (
                  cart.map((item) => (
                    <tr>
                      <th>
                        <div className="product d-flex">
                          <img
                            className="product-img"
                            src={item.image}
                            alt=""
                            onClick={() =>
                              navigate("/product-details/" + item._id)
                            }
                          />
                          <div className="product-details">
                            <div className="product-name">
                              {item.productName}
                            </div>
                            <p className="product-description">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </th>
                      <td className="align-middle">&#8377; {item.price}</td>
                      <td className="align-middle">{item.quantity}</td>
                      <td className="align-middle">
                        &#8377; {item.price * item.quantity}
                      </td>
                      <td className="align-middle">
                        <button
                          className="btn btn-cart-remove"
                          onClick={() => onRemoveCart(item)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            {emptyCart ? null : (
              <div className="leaffie-cart-total">
                Cart Total: &#8377; {myCart.total}
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
