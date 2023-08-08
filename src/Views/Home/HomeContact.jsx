import React from "react";

export default function HomeContact() {
  return (
    <div className="leaffie-contact-us">
      <h2>Contact Us</h2>
      <div className="leaffie-contact-us_content container">
        <div className="mx-5">
          <p>
            Ea galisum dolorum aut necessitatibus suscipit qui voluptatem
            voluptatem. In consequatur expedita ad voluptatum obcaecati vel
            quisquam optio et soluta suscipit eos enim praesentium ab facilis
            sapiente vel illo sunt. Qui rerum quia aut fuga ipsa non Quis
            officiis aut internos fugiat et adipisci sint non commodi
            blanditiis.Ab cupiditate quia et dolores consectetur cum dolor harum
            non quos ducimus aut nisi molestias nam magni Quis. Est excepturi
            corrupti qui fugit voluptas ab
          </p>
        </div>
        <form className="leaffie-contact-us_content--form">
          <div className="row">
              <div className="col-6">
                <input type="text" className="form-control form-control-lg" placeholder="Name" />
              </div>
              <div className="col-6">
                <input type="text" className="form-control form-control-lg" placeholder="Surname" />
              </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <input type="text" className="form-control form-control-lg" placeholder="Email" />
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12">
              <textarea className="form-control form-control-lg" placeholder="Message" rows="3"></textarea>
            </div>
          </div>
          <div className="text-center mt-3">
            <button className="btn btn-send">Send</button>
          </div>
        </form>
        
      </div>
    </div>
  );
}
