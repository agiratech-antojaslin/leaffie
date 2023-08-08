import React from "react";
import Plant1 from "../../assets/images/plant-1.avif";
import Plant2 from "../../assets/images/plant-2.webp";
import Plant3 from "../../assets/images/plant-3.jpeg";
import Plant4 from "../../assets/images/plant-4.jpg";
import axios from "axios";
import homeProducts from "../../localData/products-home.json";
import { Link, useNavigate } from "react-router-dom";

// const baseURL = "https://64ce6ec30c01d81da3eed0a8.mockapi.io/api/products?page=1&limit=4";
// const mockApi = "http://localhost:3000/products-home.json";
export default function HomeProducts() {
  const [products, setProducts] = React.useState(null);
  const navigate = useNavigate();
  React.useEffect(() => {
    axios.get("./products-home.json").then((response) => {
      setProducts(response.data.payload);
    });
  }, []);

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
                    ></i>
                  </div>
                  <Link to={"product-details/" + product.id}><img className="card-img-top" src={product.image} alt="Card cap" /></Link>
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
