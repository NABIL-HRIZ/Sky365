import React from "react";
import "../styles/Footer.css";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer px-3 px-md-5 pt-5 w-100 bg-light text-muted">
      <div className="container border-bottom pb-4">
        <div className="row g-4 justify-content-between">

          {/* Logo & Description */}
          <div className="col-md-6">

              <a className="navbar-brand fw-bold fs-1 text-info" href="/">
          SKY <i className="fa-solid fa-hotel"></i> 365
        </a>

            
            <p className="small">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
              It has been the industry's standard dummy text since the 1500s.
            </p>
            <div className="social-icons mt-3">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaInstagram /></a>
              <a href="#"><FaLinkedinIn /></a>
            </div>
          </div>

          {/* Links & Contact Info */}
          <div className="col-md-5 d-flex justify-content-md-end gap-5">
            <div>
              <h6 className="fw-semibold text-dark mb-3">Company</h6>
              <ul className="list-unstyled small">
                <li><a href="/" className="text-muted text-decoration-none">Home</a></li>
                <li><a href="/hotels" className="text-muted text-decoration-none">Hotels</a></li>
                <li><a href="/experiences" className="text-muted text-decoration-none">Experiences</a></li>
                <li><a href="/about" className="text-muted text-decoration-none">About</a></li>
              </ul>
            </div>
            <div>
              <h6 className="fw-semibold text-dark mb-3">Get in touch</h6>
              <ul className="list-unstyled small">
                <li className="mb-2">+1-212-456-7890</li>
                <li>contact@example.com</li>
              </ul>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Text */}
      <div className="text-center py-3 small copyright">
        &copy; 2024 Company name. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
