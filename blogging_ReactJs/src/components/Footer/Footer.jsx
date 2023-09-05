import React from "react";

function Footer() {
  return (
    <footer className=" text-white text-center py-4 mt-5" style={{backgroundColor:"#131726"}}>
      <div className="">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <h4>Stay Connected</h4>
            <p>Follow us on social media for updates and more.</p>
            <ul className="list-inline">
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <i className="fab fa-facebook-f"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li className="list-inline-item">
                <a href="#" className="text-white">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="mt-3">
        <p>&copy; 2023 Your Blog Website</p>
      </div>
    </footer>
  );
}

export default Footer;
