import React from "react";
import Logo from "../assets/images/icons/logo-transparent.png";

export default function Footer() {
  return (
    <footer className="leaffie-footer">
      <div className="container leaffie-footer_content">
        <div className="row leaffie-footer_content--top">
          <div className="col-4 leaffie-footer_content--img">
            <img src={Logo} alt="" />
          </div>
          <div className="col-4 d-flex justify-content-between align-items-center">
            <a href="/">About Us</a>
            <a href="/">Team</a>
            <a href="/">Contact Us</a>
            <a href="/">Products</a>
          </div>
          <div className="col-4 d-flex">
            <form className="d-flex align-items-center justify-content-end">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Email"
              />
              <button className="btn btn-send">Send</button>
            </form>
          </div>
        </div>
        <div className="row leaffie-footer_content--bottom">
          <div className="col-9">
            <p>Copyright @ 2023 all rights powered by Leaffie</p>
          </div>
          <div className="col-3 d-flex justify-content-end">
            <i className="fa fa-instagram" aria-hidden="true"></i>
            <i className="fa fa-linkedin-square" aria-hidden="true"></i>
            <i className="fa fa-facebook-square mr-0" aria-hidden="true"></i>
          </div>
        </div>
      </div>
    </footer>
  );
}
