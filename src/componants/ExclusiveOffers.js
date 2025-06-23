"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Badge, Button } from "react-bootstrap"
import "../styles/ExclusiveOffers.css"
import { exclusiveOffers } from "../assests/assets"



const ExclusiveOffers = () => {
  const [showAll, setShowAll] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const handleToggleView = () => {
    setIsAnimating(true)
    setTimeout(() => {
      setShowAll(!showAll)
      setIsAnimating(false)
    }, 300)
  }

  const displayedOffers = showAll ? exclusiveOffers : exclusiveOffers.slice(0, 3)

  return (
    <section className="exclusive-offers-section py-5">
      <Container>
        {/* Section Header */}
        <div className="section-header mb-5">
          <Row className="align-items-center">
            <Col lg={8}>
              <div className="header-content">
                <h2 className="section-title fw-bold text-dark mb-3">Exclusive Offers</h2>
                <p className="section-description text-muted mb-0">
                  Don't miss out on these limited-time deals and special packages designed to make your stay even more
                  memorable. Book now and save on your next luxury getaway.
                </p>
              </div>
            </Col>
            <Col lg={4} className="text-lg-end text-start mt-3 mt-lg-0">
              <Button
                variant="link"
                className="see-more-btn p-0 text-decoration-none d-flex align-items-center justify-content-lg-end"
                onClick={handleToggleView}
              >
                <span className="me-2 fw-medium">{showAll ? "Show Less" : "See More"}</span>
                <div className="icon-wrapper">
                  <i
                    className={`fa-solid ${
                      showAll ? "fa-chevron-up" : "fa-chevron-right"
                    } transition-icon ${isAnimating ? "rotating" : ""}`}
                  ></i>
                </div>
              </Button>
            </Col>
          </Row>
        </div>

        {/* Offers Cards */}
        <div className={`offers-container ${isAnimating ? "animating" : ""}`}>
          <Row className="g-4">
            {displayedOffers.map((offer, index) => (
              <Col lg={4} md={6} key={offer.id} className="offer-card-col">
                <Card className="offer-card h-100 border-0 shadow-sm">
                  <div className="card-image-wrapper position-relative overflow-hidden">
                    <Card.Img
                      variant="top"
                      src={offer.image || "/placeholder.svg"}
                      className="offer-image"
                      style={{ height: "200px", objectFit: "cover" }}
                    />
                    <div className="image-overlay"></div>

                    {/* Discount Badge */}
                    <Badge className="discount-badge position-absolute">
                      <span className="discount-percent">{offer.priceOff}%</span>
                      <span className="discount-text">OFF</span>
                    </Badge>

                    {/* Expiry Badge */}
                    <div className="expiry-badge position-absolute">
                      <i className="fa-regular fa-clock me-1"></i>
                      <span className="expiry-text">Until {offer.expiryDate}</span>
                    </div>
                  </div>

                  <Card.Body className="p-4">
                    <div className="offer-content">
                      <h5 className="offer-title fw-bold mb-2 text-dark">{offer.title}</h5>
                      <p className="offer-description text-muted mb-3">{offer.description}</p>

                      <div className="offer-actions d-flex justify-content-between align-items-center">
                        <div className="savings-info">
                          <span className="savings-text text-success fw-medium">Save {offer.priceOff}%</span>
                        </div>
                        <Button
                          variant="primary"
                          size="sm"
                          className="claim-btn fw-medium px-3"
                          style={{
                            backgroundColor: "#17a2b8",
                            border: "none",
                            borderRadius: "20px",
                          }}
                        >
                          Claim Offer
                        </Button>
                      </div>
                    </div>
                  </Card.Body>

                  {/* Decorative Elements */}
                  <div className="card-decoration"></div>
                </Card>
              </Col>
            ))}
          </Row>
        </div>

        {/* Show More Cards Animation */}
        {showAll && (
          <Row className="mt-4">
            <Col className="text-center">
              <div className="additional-offers-indicator">
                <Badge bg="light" text="dark" className="px-3 py-2">
                  <i className="fa-solid fa-sparkles me-2"></i>
                  Showing all {exclusiveOffers.length} exclusive offers
                </Badge>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  )
}

export default ExclusiveOffers
