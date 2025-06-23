import React from 'react';
import '../styles/AboutIntro.css';

const AboutIntro = () => {
  return (
    <section className="about-intro d-flex align-items-center">
      <div className="overlay"></div>
      <div className="container text-center text-white content">
        <h2 className="mb-3">Welcome to SKY 365</h2>
        <p className="lead">
          SKY 365 is a luxury hotel where comfort meets elegance. Enjoy your stay with premium services, breathtaking views, and unforgettable moments.
        </p>
      </div>
    </section>
  );
};

export default AboutIntro;
