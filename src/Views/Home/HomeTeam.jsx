import React from "react";
import Team1 from "../../assets/images/garderner-3.avif";
import Team2 from "../../assets/images/garderner-6.jpg";
import Team3 from "../../assets/images/garderner-5.webp";

export default function HomeTeam() {
  return (
    <div className="leaffie-our-team">
      <h2>Our Team</h2>
      <div className="leaffie-our-team_content container">
        <div className="row">
          <div className="col-4">
            <img src={Team1} alt="" />
            <h5 className="mb-0">Gwen Stacy</h5>
          </div>
          <div className="col-4">
            <img src={Team2} alt="" />
            <h5 className="mb-0">Kristin Watson</h5>
          </div>
          <div className="col-4">
            <img src={Team3} alt="" />
            <h5 className="mb-0">Marwin McKinney</h5>
          </div>
        </div>
      </div>
    </div>
  );
}
