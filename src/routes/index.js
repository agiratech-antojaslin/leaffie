import { React } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Views/Home/Home";
import Register from "../UserComponents/Register/Register";
import Login from "../UserComponents/Login/Login";
import Profile from "../UserComponents/Profile/Profile";
import ProtectedRoute from "../utils/ProtectedRoute";
import NotProtectedRoute from "../utils/NotProtectedRoute";
import Products from "../Views/Products/Products";
import ProductDetails from "../Views/ProductDetails/ProductDetails";
import Cart from "../Views/cart/cart"

export default function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="register" element={<NotProtectedRoute><Register /></NotProtectedRoute>}></Route>
        <Route path="login" element={<NotProtectedRoute><Login /></NotProtectedRoute>}></Route>
        <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>}></Route>
        <Route path="products" element={<Products />}></Route>
        <Route path="product-details/:productID" element={<ProductDetails />}></Route>
        <Route path="my-cart" element={<ProtectedRoute><Cart /></ProtectedRoute>}></Route>
      </Routes>
    </BrowserRouter>
  );
};
