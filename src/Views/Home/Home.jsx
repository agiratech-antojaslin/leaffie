import React from "react";
import "./Home.css";
import HomeAbout from "./HomeAbout";
import HomeTeam from "./HomeTeam";
import HomeContact from "./HomeContact";
import HomeProducts from "./HomeProducts";
import Navbar from "../../Layout/Navbar/Navbar";
import Footer from "../../Layout/Footer/Footer";

export default function HomeContent() {
  return (
    <section>
      <Navbar />
      <div className="leaffie-header">
        <div className="container leaffie-header_content">
          <div className="row">
            <div className="col-6 leaffie-header_content--left">
              <h2>Bringing Nature Home With Greenary</h2>
              <p>
                Indulge in the traquility of nature with our lush assorment of
                plants. Discover a sanctuary of greenary that will breath life.
              </p>
            </div>
          </div>
        </div>
      </div>
      <HomeAbout />
      <HomeTeam />
      <HomeContact />
      <HomeProducts />
      <Footer />
    </section>
  );
}
