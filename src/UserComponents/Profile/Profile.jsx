import React from "react";
import Navbar from "../../Layout/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";
import { useSelector } from "react-redux";
import "./Profile.css";

export default function Profile() {
  const user = useSelector((state) => state.AuthReducer.user);
  return (
    <div>
      <Navbar />
      <div className="container leaffie-profile">
        <div className="row leaffie-profile--content">
          <div className="col-12 leaffie-profile--title">
            <h3>My Account</h3>
            <div className="row mt-3">
              <div className="col-6 leaffie-profile_left">
                <h5 className="mb-4">Profile Details</h5>
                <h6>{user.username}</h6>
                <p>{user.email}</p>
                <h6 className="mt-3">Shipping Address</h6>
                <p>{user.address}</p>
                <h6 className="mt-3">Contact</h6>
                <p>{user.phone}</p>
              </div>
              <div className="col-6 leaffie-profile_right">
                <h5 className="mb-4">Order History</h5>
                <div className="row">
                  <div className="col-12">
                    <p>No orders found</p>
                  </div>
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
