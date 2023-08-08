import React from "react";
import "./Home.css";
import Garderner from "../../assets/images/garderner-2.avif";

export default function HomeAbout() {
  return (
    <div className="leaffie-about-us">
      <h2>About Us</h2>
      <div className="leaffie-about-us_content container">
        <div className="row mx-5">
          <div className="col-sm-4 leaffie-about-us_content--left">
            <img src={Garderner} alt="" />
          </div>
          <div className="col-sm-8 leaffie-about-us_content--right">
            <div className="row">
              <div className="col-6">
                <div className="about-box d-flex align-items-center">
                  <i className="fa fa-home"></i>
                  <h5 className="mb-0">Easy Accessibility</h5>
                </div>
              </div>
              <div className="col-6">
                <div className="about-box d-flex align-items-center">
                  <i className="fa fa-recycle"></i>
                  <h5 className="mb-0">Clear Environment</h5>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-6">
                <div className="about-box d-flex align-items-center">
                  <i className="fa fa-pagelines"></i>
                  <h5 className="mb-0">Plenty of Variety</h5>
                </div>
              </div>
              <div className="col-6">
                <div className="about-box d-flex align-items-center">
                  <i className="fa fa-heartbeat"></i>
                  <h5 className="mb-0">Healthy Life</h5>
                </div>
              </div>
            </div>
            <div className="row mt-4">
              <div className="col-12">
                <div className="about-desc">
                  <h2>Why Leaffie</h2>
                  <p>
                    Lorem ipsum dolor sit amet. Et veritatis repellat ea magni
                    asperiores et quos earum in laudantium eius. Id impedit vero
                    aut voluptatem possimus id natus voluptatum et consectetur
                    ipsa nam explicabo eveniet est culpa temporibus sit deleniti
                    neque! Rem Quis voluptates est sint ullam eum quidem sequi
                    sit accusantium quia 33 voluptatem sunt. Hic nobis
                    temporibus est eaque architecto At ullam quis sit totam
                    voluptatibus. Ea nostrum adipisci non animi consequatur ut
                    inventore ipsum vel illum nobis in nihil illo aut temporibus
                    voluptates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
