import React, { useState } from "react";
import Navbar from "../../Layout/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";
import Plant1 from "../../assets/images/plant-1.avif";
import Plant2 from "../../assets/images/plant-2.webp";
import Plant3 from "../../assets/images/plant-3.jpeg";
import Plant4 from "../../assets/images/plant-4.jpg";
import axios from "axios";
import "./Products.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ActionCreators } from "../../redux/actions";

//const baseURL = "https://64ce6ec30c01d81da3eed0a8.mockapi.io/api/products";
const baseURL = "http://localhost:8000/api/product/getProductsByCategory/";

export default function Products() {
  const [products, setProducts] = React.useState(null);
  const [category, setCategory] = useState("64d1f7ad3664878d9b52911b");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showAddCart, setAddCart] = useState(false);
  const [addProduct, setAddProduct] = useState("");
  const isAuthenticated = useSelector(
    (state) => state.AuthReducer.isAuthenticated
  );

  React.useEffect(() => {
    axios.get(baseURL + category).then((response) => {
      setProducts(response.data.data);
    });
  }, [category]);

  const changeCategory = (categoryID) => {
    axios.get(baseURL + categoryID).then((response) => {
      setProducts(response.data.data);
    });
  };

  const addToCart = (product) => {
    if (isAuthenticated) {
      product.quantity = 1;
      if (localStorage.getItem("myCart") != null) {
        let products = JSON.parse(localStorage.getItem("myCart"));
        let inProduct = products.some((cartProduct) => {
          return product._id === cartProduct._id;
        });
        if (inProduct) {
          products.forEach((cartProduct) => {
            if (product._id === cartProduct._id) {
              cartProduct.quantity++;
            }
          });
          localStorage.setItem("myCart", JSON.stringify(products));
          dispatch(
            ActionCreators.addCart(
              products,
              product.quantity,
              product.price * product.quantity
            )
          );
        } else {
          products.push(product);
          localStorage.setItem("myCart", JSON.stringify(products));
          dispatch(
            ActionCreators.addCart(
              products,
              product.quantity,
              product.price * product.quantity
            )
          );
        }
      } else {
        localStorage.setItem("myCart", JSON.stringify([product]));
        dispatch(
          ActionCreators.addCart(
            [product],
            product.quantity,
            product.price * product.quantity
          )
        );
      }
      navigate("/my-cart");
    } else {
      navigate("/login");
    }
  };

  if (!products)
    return (
      <div>
        <Navbar />
        <div className="loader-container">
          <div className="loader"></div>
        </div>
        <Footer />
      </div>
    );
  return (
    <div>
      <Navbar />
      <div className="container leaffie-products">
        <div className="row">
          <div className="col-3"></div>
          <div className="col-9">
            {showAddCart ? (
              <div
                className="alert alert-success alert-dismissible fade show mt-3"
                role="alert"
              >
                <strong>{addProduct}</strong> Added to the cart!
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                  onClick={() => setAddCart(false)}
                ></button>
              </div>
            ) : null}
          </div>
        </div>
        <div className="row my-3">
          <div className="col-3 leaffie-products_categories">
            <div
              className="nav flex-column nav-pills me-3"
              id="v-pills-tab"
              role="tablist"
              aria-orientation="vertical"
            >
              <button
                className="nav-link active"
                id="v-pills-home-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="true"
                onClick={() => setCategory("64d1f7ad3664878d9b52911b")}
              >
                Flowering Plants
              </button>
              <button
                className="nav-link"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="false"
                onClick={() => setCategory("64d1f7e33664878d9b52911d")}
              >
                Foliage Plants
              </button>
              <button
                className="nav-link"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="false"
                onClick={() => setCategory("64d1fb0c3664878d9b52911f")}
              >
                Trending Plants
              </button>
              <button
                className="nav-link"
                id="v-pills-settings-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-home"
                type="button"
                role="tab"
                aria-controls="v-pills-home"
                aria-selected="false"
                onClick={() => changeCategory("64d1fb2b3664878d9b529121")}
              >
                Herb Plants
              </button>
            </div>
          </div>
          <div className="col-9">
            <div className="tab-content" id="v-pills-tabContent">
              <div
                className="tab-pane fade show active leaffie-products_list"
                id="v-pills-home"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
              >
                <div className="row">
                  {products.map((product) => (
                    <div className="col-4">
                      <div className="card p-3 card-product">
                        <div className="card-img">
                          <div className="card-img-icons">
                            <i className="fa fa-heart-o cursor-pointer"></i>
                            <i
                              className="fa fa-shopping-cart cursor-pointer"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title="Add to cart"
                              onClick={() => addToCart(product)}
                            ></i>
                          </div>
                          <Link to={"/product-details/" + product._id}>
                            <img
                              className="card-img-top"
                              src={product.image}
                              alt="Card cap"
                            />
                          </Link>
                        </div>
                        <div className="card-body p-0">
                          <h5 className="text-center my-1">
                            {product.productName}
                          </h5>
                          <p className="card-text text-center my-1">
                            {product.description}
                          </p>
                          <a href="/" className="btn btn-primary d-block">
                            &#8377; {product.price}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
