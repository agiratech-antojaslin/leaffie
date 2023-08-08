import React from "react";
import Navbar from "../../Layout/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";
import { useParams, useNavigate } from "react-router-dom";
import Plant from "../../assets/images/product-detail.webp";
import axios from "axios";
import "./ProductDetails.css";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreators } from "../../redux/actions";

const baseURL = "https://64ce6ec30c01d81da3eed0a8.mockapi.io/api/products/";

export default function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.AuthReducer.isAuthenticated)
  const [product, setProduct] = React.useState(null);
  const [quantity, setQuantity] = React.useState(1);
  const [inCart, setCart] = React.useState(false);

  React.useEffect(() => {
    axios.get(baseURL + params.productID).then((response) => {
      setProduct(response.data);
      isInCart(response.data);
    });
  });

  const isInCart = (product) => {
    if(localStorage.getItem('myCart') != null) {
      let products = JSON.parse(localStorage.getItem('myCart'));
      products.forEach(cartProduct => {
        if(product.id === cartProduct.id) {
          setCart(true);
          return;
        }
      });
    }
  }

  const addToCart = () => {
    if(isAuthenticated) {
      product.qty = parseInt(quantity);
      if(localStorage.getItem('myCart') != null) {
        let products = JSON.parse(localStorage.getItem('myCart'));
        products.push(product);
        localStorage.setItem('myCart', JSON.stringify(products));
        dispatch(
          ActionCreators.addCart(products, product.qty, product.price * product.qty)
        );
        setCart(true);
      } else {
        localStorage.setItem('myCart', JSON.stringify([product]));
        dispatch(
          ActionCreators.addCart([product], product.qty, product.price * product.qty)
        );
        setCart(true);
      }
    } else {
      navigate('/login')
    }
  }

  const removeFromCart = () => {
    if(isAuthenticated) {
      if(localStorage.getItem('myCart') != null) {
        let products = JSON.parse(localStorage.getItem('myCart'));
        products.forEach(cartProduct => {
          if(product.id === cartProduct.id) {
            products.splice(products.indexOf(cartProduct), 1);
            setCart(false);
            dispatch(
              ActionCreators.removeCart(products, product.qty, product.price * product.qty)
            );
            localStorage.setItem('myCart', JSON.stringify(products));
            return;
          }
        });
      }
    } else {
      navigate('/login')
    }
  }

  const onQualityChange = (e) => {
    setQuantity(e.target.value);
  }


  if (!product) return null;
  return (
    <div>
      <Navbar />
      <div className="container leaffie-product-details">
        <div className="row my-5 leaffie-product-details_content">
          <div className="col-6 leaffie-product-details_left">
            <img src={Plant} alt="" />
          </div>
          <div className="col-6 leaffie-product-details_right">
            <h3>{product.name}</h3>
            <p>{product.price} $</p>
            <div className="d-flex">
              <input
                type="number"
                className="form-control form-control-lg w-25"
                placeholder="Quantity"
                value={quantity}
                onInput={(e) => onQualityChange(e)}
              />
              {inCart 
              ? <button className="btn btn-cart-remove" onClick={() => removeFromCart()}>Remove from cart</button>
              : <button className="btn btn-cart" onClick={() => addToCart()}>Add to cart</button>
              }
              
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
