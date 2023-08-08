import React, { useEffect, useState } from "react";
import Navbar from "../../Layout/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";
import Plant from "../../assets/images/product-detail.webp";
import { useDispatch, useSelector } from "react-redux";
import "./cart.css";
import { ActionCreators } from "../../redux/actions";

export default function Cart() {
  let cartItems = JSON.parse(localStorage.getItem("myCart"));
  const [cart, setCart] = useState(cartItems);
  const [emptyCart, setEmptyCart] = React.useState(true);
  const dispatch = useDispatch();
  const myCart = useSelector((state) => state.cartReducer.cart);
  const [cartTotal, setCartTotal] = useState(myCart.total);
  useEffect(() => {
    if (cartItems) {
      setEmptyCart(false);
    }
  });
  const onRemoveCart = (cartItem) => {
    cartItems.forEach((item) => {
      if (item.id === cartItem.id) {
        cartItems.splice(cartItems.indexOf(item), 1);
        localStorage.setItem("myCart", JSON.stringify(cartItems));
        let cartTtl = cartTotal - (cartItem.price * cartItem.qty);
        dispatch(ActionCreators.removeCart(cartItems, cartItem.qty, cartItem.price * cartItem.qty));
        setCartTotal(cartTtl);
        setCart(cartItems);
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
                          <img className="product-img" src={Plant} alt="" />
                          <div className="product-details">
                            <div className="product-name">{item.name}</div>
                            <p className="product-description">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      </th>
                      <td className="align-middle">{item.price}$</td>
                      <td className="align-middle">{item.qty}</td>
                      <td className="align-middle">{item.price * item.qty}$</td>
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
                Cart Total: {myCart.total}$
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
