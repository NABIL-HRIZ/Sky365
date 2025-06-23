import React from 'react';
import '../styles/AboutHistory.css';

const AboutHistory = () => {
  return (
    <section className="about-history py-5">
      <div className="container row mx-auto align-items-center">
        <div className="col-md-6">
          <h3>Our History</h3>
          <p>
            Since 1998, SKY 365 has been a symbol of hospitality excellence. From a small boutique inn to a leading 5-star destination, our journey is built on trust, innovation, and exceptional service
             Since 1998, SKY 365 has been a symbol of hospitality excellence. From a small boutique inn to a leading 5-star destination, our journey is built on trust, innovation, and exceptional service
              Since 1998, SKY 365 has been a symbol of hospitality excellence. From a small boutique inn to a leading 5-star destination, our journey is built on trust, innovation, and exceptional service
               Since 1998, SKY 365 has been a symbol of hospitality excellence. From a small boutique inn to a leading 5-star destination, our journey is built on trust, innovation, and exceptional service.
          </p>
        </div>
        <div className="col-md-6 d-flex flex-wrap gap-2">
          <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800" alt="Hotel 1" className="history-img" />
          <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800" alt="Hotel 2" className="history-img" />
          <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800" alt="Hotel 3" className="history-img" />
        </div>
      </div>
    </section>
  );
};

export default AboutHistory;
