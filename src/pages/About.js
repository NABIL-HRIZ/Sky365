import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { 
  FaStar, 
  FaAward, 
  FaUsers, 
  FaMapMarkerAlt, 
  FaClock, 
  FaShieldAlt, 
  FaWifi, 
  FaCar,
  FaDumbbell,
  FaSpa
} from 'react-icons/fa';

import '../styles/About.css'
const About = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="hero-about-section d-flex align-items-center">
        <div className="hero-about-overlay"></div>
        <Container className="hero-about-content">
          <Row className="justify-content-center text-center">
            <Col lg={8}>
              <h1 className="display-3 fw-bold mb-4">About SKY 365 Hotel</h1>
              <p className="lead fs-4">
                Experience luxury and comfort in the heart of the city with our world-class hospitality
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* History Section */}
      <section className="section-padding">
        <Container>
          <Row className="align-items-center">
            <Col lg={6}>
              <h2 className="display-4 fw-bold text-dark mb-4">Our Story</h2>
              <p className="fs-5 text-muted mb-4">
                Founded in 1985, SKY 365  Hotel has been a beacon of luxury and hospitality for nearly four decades. 
                What started as a small family-owned establishment has grown into one of the city's most prestigious hotels.
              </p>
              <p className="fs-5 text-muted mb-4">
                Our commitment to excellence has earned us numerous awards and the trust of thousands of guests worldwide. 
                We pride ourselves on creating unforgettable experiences that blend traditional hospitality with modern amenities.
              </p>
              <Row className="text-center mt-5">
                <Col md={4}>
                  <h3 className="display-5 fw-bold text-primary">38+</h3>
                  <p className="text-muted">Years of Excellence</p>
                </Col>
                <Col md={4}>
                  <h3 className="display-5 fw-bold text-primary">50K+</h3>
                  <p className="text-muted">Happy Guests</p>
                </Col>
                <Col md={4}>
                  <h3 className="display-5 fw-bold text-primary">25+</h3>
                  <p className="text-muted">Awards Won</p>
                </Col>
              </Row>
            </Col>
            <Col lg={6}>
              <img 
                src="https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=800" 
                alt="Hotel History" 
                className="img-fluid rounded shadow-lg"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Why Choose Us Section */}
      <section className="section-padding stats-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-4 fw-bold text-dark mb-4">Why Choose Royal Haven?</h2>
              <p className="fs-4 text-muted">
                We offer unmatched luxury, exceptional service, and unforgettable experiences
              </p>
            </Col>
          </Row>
          
          <Row>
            <Col lg={3} md={6} className="mb-4">
              <Card className="feature-card h-100 text-center p-4">
                <Card.Body>
                  <div className="icon-circle">
                    <FaAward size={30} color="#1e40af" />
                  </div>
                  <Card.Title className="h4 fw-bold">Award Winning</Card.Title>
                  <Card.Text className="text-muted">
                    Recognized globally for our exceptional service and luxury accommodations
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <Card className="feature-card h-100 text-center p-4">
                <Card.Body>
                  <div className="icon-circle">
                    <FaMapMarkerAlt size={30} color="#1e40af" />
                  </div>
                  <Card.Title className="h4 fw-bold">Prime Location</Card.Title>
                  <Card.Text className="text-muted">
                    Located in the heart of the city with easy access to major attractions
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <Card className="feature-card h-100 text-center p-4">
                <Card.Body>
                  <div className="icon-circle">
                    <FaClock size={30} color="#1e40af" />
                  </div>
                  <Card.Title className="h4 fw-bold">24/7 Service</Card.Title>
                  <Card.Text className="text-muted">
                    Round-the-clock concierge and customer service for all your needs
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>

            <Col lg={3} md={6} className="mb-4">
              <Card className="feature-card h-100 text-center p-4">
                <Card.Body>
                  <div className="icon-circle">
                    <FaShieldAlt size={30} color="#1e40af" />
                  </div>
                  <Card.Title className="h4 fw-bold">Safe & Secure</Card.Title>
                  <Card.Text className="text-muted">
                    State-of-the-art security systems ensuring your safety and privacy
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Amenities Section */}
      <section className="section-padding">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-4 fw-bold text-dark mb-4">Premium Amenities</h2>
              <p className="fs-4 text-muted">Everything you need for a perfect stay</p>
            </Col>
          </Row>
          
          <Row>
            <Col lg={3} md={6} className="mb-3">
              <div className="amenity-item">
                <FaWifi size={24} color="#1e40af" className="me-3" />
                <span className="fw-semibold">Free High-Speed WiFi</span>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-3">
              <div className="amenity-item">
                <FaCar size={24} color="#1e40af" className="me-3" />
                <span className="fw-semibold">Complimentary Parking</span>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-3">
              <div className="amenity-item">
                <FaDumbbell size={24} color="#1e40af" className="me-3" />
                <span className="fw-semibold">Fitness Center</span>
              </div>
            </Col>
            <Col lg={3} md={6} className="mb-3">
              <div className="amenity-item">
                <FaSpa size={24} color="#1e40af" className="me-3" />
                <span className="fw-semibold">Spa & Wellness</span>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Gallery Section */}
      <section className="section-padding stats-section">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="display-4 fw-bold text-dark mb-4">Hotel Gallery</h2>
              <p className="fs-4 text-muted">Take a glimpse of our luxurious facilities</p>
            </Col>
          </Row>
          
          <Row>
            <Col lg={4} md={6} className="mb-4">
              <div className="gallery-item">
                <img 
                  src="https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Luxury Room" 
                  className="img-fluid w-100"
                  style={{height: '250px', objectFit: 'cover'}}
                />
                <div className="gallery-overlay">
                  <h5 className="text-white fw-bold">Deluxe Rooms</h5>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <div className="gallery-item">
                <img 
                  src="https://images.pexels.com/photos/70441/pexels-photo-70441.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Restaurant" 
                  className="img-fluid w-100"
                  style={{height: '250px', objectFit: 'cover'}}
                />
                <div className="gallery-overlay">
                  <h5 className="text-white fw-bold">Fine Dining</h5>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <div className="gallery-item">
                <img 
                  src="https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Swimming Pool" 
                  className="img-fluid w-100"
                  style={{height: '250px', objectFit: 'cover'}}
                />
                <div className="gallery-overlay">
                  <h5 className="text-white fw-bold">Swimming Pool</h5>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <div className="gallery-item">
                <img 
                  src="https://images.pexels.com/photos/1134176/pexels-photo-1134176.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Spa" 
                  className="img-fluid w-100"
                  style={{height: '250px', objectFit: 'cover'}}
                />
                <div className="gallery-overlay">
                  <h5 className="text-white fw-bold">Luxury Spa</h5>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <div className="gallery-item">
                <img 
                  src="https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Conference Room" 
                  className="img-fluid w-100"
                  style={{height: '250px', objectFit: 'cover'}}
                />
                <div className="gallery-overlay">
                  <h5 className="text-white fw-bold">Event Spaces</h5>
                </div>
              </div>
            </Col>
            
            <Col lg={4} md={6} className="mb-4">
              <div className="gallery-item">
                <img 
                  src="https://images.pexels.com/photos/271618/pexels-photo-271618.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Hotel Lobby" 
                  className="img-fluid w-100"
                  style={{height: '250px', objectFit: 'cover'}}
                />
                <div className="gallery-overlay">
                  <h5 className="text-white fw-bold">Grand Lobby</h5>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Call to Action */}
      <section className="section-padding cta-section">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="display-4 fw-bold mb-4">Ready to Experience Luxury?</h2>
              <p className="fs-4 mb-5 opacity-75">
                Book your stay with us and create memories that will last a lifetime
              </p>
              <Button className="btn-custom fs-5">
                Book Now
              </Button>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default About;