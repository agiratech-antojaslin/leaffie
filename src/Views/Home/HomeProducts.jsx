import React from "react";
import Plant1 from "../../assets/images/plant-1.avif";
import Plant2 from "../../assets/images/plant-2.webp";
import Plant3 from "../../assets/images/plant-3.jpeg";
import Plant4 from "../../assets/images/plant-4.jpg";
import axios from "axios";
import homeProducts from "../../localData/products-home.json";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ActionCreators } from "../../redux/actions";

// const baseURL = "https://64ce6ec30c01d81da3eed0a8.mockapi.io/api/products?page=1&limit=4";
// const mockApi = "http://localhost:3000/products-home.json";
const baseURL = "http://localhost:8000/api/product/getProductsByCategory/64d1fb0c3664878d9b52911f";
export default function HomeProducts() {
  const [products, setProducts] = React.useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state) => state.AuthReducer.isAuthenticated
  );
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setProducts(response.data.data);
    });
  }, []);

  const addToCart = (product) => {
    if (isAuthenticated) {
      product.quantity = 1;
      if (localStorage.getItem("myCart") != null) {
        let products = JSON.parse(localStorage.getItem("myCart"));
        let inProduct = products.some((cartProduct) => {
          return product._id === cartProduct._id;
        });
        console.log("In product: ", inProduct);
        if (inProduct) {
          products.forEach((cartProduct) => {
            if (product._id === cartProduct._id) {
              cartProduct.quantity++;
            }
          });
          console.log("Products: ", products);
          localStorage.setItem("myCart", JSON.stringify(products));
          dispatch(ActionCreators.addCart(products, product.quantity, product.price * product.quantity));
        } else {
          products.push(product)
          localStorage.setItem("myCart", JSON.stringify(products));
          dispatch(ActionCreators.addCart(products, product.quantity, product.price * product.quantity));
        }
      } else {
        localStorage.setItem("myCart", JSON.stringify([product]));
        dispatch(ActionCreators.addCart([product], product.quantity, product.price * product.quantity));
      }
      navigate("/my-cart");
    } else {
      navigate("/login");
    }
  };


  if (!products) return null;

  return (
    <div className="leaffie-products">
      <h2>Products</h2>
      <div className="leaffie-products_content container">
        <div className="row">
          {products.map((product) => (
            <div className="col-3">
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
                  <Link to={"product-details/" + product._id}><img className="card-img-top" src={product.image} alt="Card cap" /></Link>
                </div>
                <div className="card-body p-0">
                  <h5 className="text-center my-1">{product.productName}</h5>
                  <div className="card-text text-center my-1">
                    {product.description}
                  </div>
                  <a href="/" className="btn btn-primary d-block">
                    &#8377; {product.price}
                  </a>
                </div>
              </div>
            </div>
          ))}

          {/* <div className="col-3">
            <div className="card p-3 card-product">
              <div className="card-img">
                <div className="card-img-icons">
                  <i className="fa fa-heart-o cursor-pointer"></i>
                  <i className="fa fa-shopping-cart cursor-pointer"></i>
                </div>
                <img className="card-img-top" src={Plant2} alt="Card cap" />
              </div>
              <div className="card-body p-0">
                <p className="card-text text-center my-3">
                  Some quick example text to build on the card title.
                </p>
                <a href="/" className="btn btn-primary d-block">
                  25$
                </a>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card p-3 card-product">
              <div className="card-img">
                <div className="card-img-icons">
                  <i className="fa fa-heart-o cursor-pointer"></i>
                  <i className="fa fa-shopping-cart cursor-pointer"></i>
                </div>
                <img className="card-img-top" src={Plant3} alt="Card cap" />
              </div>
              <div className="card-body p-0">
                <p className="card-text text-center my-3">
                  Some quick example text to build on the card title.
                </p>
                <a href="/" className="btn btn-primary d-block">
                  25$
                </a>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="card p-3 card-product">
              <div className="card-img">
                <div className="card-img-icons">
                  <i className="fa fa-heart-o cursor-pointer"></i>
                  <i className="fa fa-shopping-cart cursor-pointer"></i>
                </div>
                <img className="card-img-top" src={Plant4} alt="Card cap" />
              </div>
              <div className="card-body p-0">
                <p className="card-text text-center my-3">
                  Some quick example text to build on the card title.
                </p>
                <a href="/" className="btn btn-primary d-block">
                  25$
                </a>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
