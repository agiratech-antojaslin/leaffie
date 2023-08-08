import React from "react";
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

const baseURL = "https://64ce6ec30c01d81da3eed0a8.mockapi.io/api/products";

export default function Products() {
  const [products, setProducts] = React.useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(
    (state) => state.AuthReducer.isAuthenticated
  );

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setProducts(response.data);
    });
  }, []);

  const addToCart = (product) => {
    if (isAuthenticated) {
      product.qty = 1;
      if (localStorage.getItem("myCart") != null) {
        let products = JSON.parse(localStorage.getItem("myCart"));
        let inProduct = products.filter((cartProduct) => {
          return product.id === cartProduct.id;
        });
        if (inProduct.length > 0) {
          products.forEach((cartProduct) => {
            if (product.id === cartProduct.id) {
              cartProduct.qty++;
            }
          });
          localStorage.setItem("myCart", JSON.stringify(products));
          dispatch(ActionCreators.addCart(products, product.qty, product.price * product.qty));
        } else {
          products.push(product)
          localStorage.setItem("myCart", JSON.stringify(products));
          dispatch(ActionCreators.addCart(products, product.qty, product.price * product.qty));
        }
      } else {
        localStorage.setItem("myCart", JSON.stringify([product]));
        dispatch(ActionCreators.addCart([product], product.qty, product.price * product.qty));
      }
      navigate("/my-cart");
    } else {
      navigate("/login");
    }
  };

  if (!products) return null;
  return (
    <div>
      <Navbar />
      <div
        className="toast"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="toast-header">
          <strong className="me-auto">Cart Item Added!</strong>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div className="toast-body">Hello, world! This is a toast message.</div>
      </div>
      <div className="container leaffie-products">
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
              >
                Flowering Plants
              </button>
              <button
                className="nav-link"
                id="v-pills-profile-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-profile"
                type="button"
                role="tab"
                aria-controls="v-pills-profile"
                aria-selected="false"
              >
                Gardening Plants
              </button>
              <button
                className="nav-link"
                id="v-pills-messages-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-messages"
                type="button"
                role="tab"
                aria-controls="v-pills-messages"
                aria-selected="false"
              >
                Foliage Plants
              </button>
              <button
                className="nav-link"
                id="v-pills-settings-tab"
                data-bs-toggle="pill"
                data-bs-target="#v-pills-settings"
                type="button"
                role="tab"
                aria-controls="v-pills-settings"
                aria-selected="false"
              >
                Trending Plants
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
                          <Link to={"/product-details/" + product.id}>
                            <img
                              className="card-img-top"
                              src={Plant2}
                              alt="Card cap"
                            />
                          </Link>
                        </div>
                        <div className="card-body p-0">
                          <h5 className="text-center my-1">{product.name}</h5>
                          <p className="card-text text-center my-1">
                            {product.description}
                          </p>
                          <a href="/" className="btn btn-primary d-block">
                            {product.price}$
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="tab-pane fade leaffie-products_list"
                id="v-pills-profile"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
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
                            ></i>
                          </div>
                          <img
                            className="card-img-top"
                            src={Plant4}
                            alt="Card cap"
                          />
                        </div>
                        <div className="card-body p-0">
                          <h5 className="text-center my-1">{product.name}</h5>
                          <p className="card-text text-center my-1">
                            {product.description}
                          </p>
                          <a href="/" className="btn btn-primary d-block">
                            {product.price}$
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="tab-pane fade leaffie-products_list"
                id="v-pills-messages"
                role="tabpanel"
                aria-labelledby="v-pills-messages-tab"
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
                            ></i>
                          </div>
                          <img
                            className="card-img-top"
                            src={Plant1}
                            alt="Card cap"
                          />
                        </div>
                        <div className="card-body p-0">
                          <h5 className="text-center my-1">{product.name}</h5>
                          <p className="card-text text-center my-1">
                            {product.description}
                          </p>
                          <a href="/" className="btn btn-primary d-block">
                            {product.price}$
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div
                className="tab-pane fade leaffie-products_list"
                id="v-pills-settings"
                role="tabpanel"
                aria-labelledby="v-pills-settings-tab"
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
                            ></i>
                          </div>
                          <img
                            className="card-img-top"
                            src={Plant3}
                            alt="Card cap"
                          />
                        </div>
                        <div className="card-body p-0">
                          <h5 className="text-center my-1">{product.name}</h5>
                          <p className="card-text text-center my-1">
                            {product.description}
                          </p>
                          <a href="/" className="btn btn-primary d-block">
                            {product.price}$
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
