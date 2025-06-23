
import { useState } from "react"
import { Container, Row, Col, Card, Button, Modal, Badge, Carousel } from "react-bootstrap"
import "../styles/FeaturedSection.css"
import { featuredHotels } from "./FeaturedHotel"
import { facilityIcons } from "../assests/assets"
import { roomCommonData } from "../assests/assets"

import { useNavigate } from "react-router-dom"

const FeaturedSection = () => {
  const [selectedHotel, setSelectedHotel] = useState(null)
  const [showModal, setShowModal] = useState(false)

   const navigate = useNavigate();

  const handleViewDetails = (hotel) => {
    setSelectedHotel(hotel)
    setShowModal(true)
  }

  const handleCloseModal = () => {
    setShowModal(false)
    setSelectedHotel(null)
  }

  const renderStars = (rating) => {
    const stars = []
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 !== 0

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fa-solid fa-star text-warning"></i>)
    }

    if (hasHalfStar) {
      stars.push(<i key="half" className="fa-solid fa-star-half-stroke text-warning"></i>)
    }

    const emptyStars = 5 - Math.ceil(rating)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<i key={`empty-${i}`} className="fa-regular fa-star text-warning"></i>)
    }

    return stars
  }

  const handleShowRooms=()=>{
    navigate('/all-rooms')
  }

  return (
    <section className="featured-section py-5 bg-light">
      <Container>
        {/* Section Header */}
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h2 className="display-5 fw-bold text-dark mb-3">Featured Hotels</h2>
            <p className="lead text-muted">
              Discover our handpicked selection of premium hotels offering exceptional comfort, world-class amenities,
              and unforgettable experiences in the most sought-after destinations.
            </p>
          </Col>
        </Row>

        {/* Hotel Cards */}
        <Row className="g-4">
          {featuredHotels.map((hotel) => (
            <Col lg={4} md={6} key={hotel.id}>
              <Card className="hotel-card h-100 shadow-sm border-0">
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={hotel.image}
                    className="hotel-image"
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <Badge bg="dark" className="position-absolute top-0 end-0 m-3 px-3 py-2">
                    ${hotel.price}/night
                  </Badge>
                </div>

                <Card.Body className="d-flex flex-column">
                  <div className="mb-2">
                    <h5 className="card-title fw-bold mb-1">{hotel.name}</h5>
                    <p className="text-muted mb-2">
                      <i className="fa-solid fa-location-dot me-1"></i>
                      {hotel.location}
                    </p>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-flex">{renderStars(hotel.rating)}</div>
                      <span className="fw-medium text-dark">{hotel.rating}</span>
                      <span className="text-muted">(245 reviews)</span>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex flex-wrap gap-1">
                      {hotel.facilities.slice(0, 3).map((facility, index) => (
                        <Badge key={index} bg="light" text="dark" className="px-2 py-1">
                          <img className="me-1" src={facilityIcons[facility]} />
                          {facility}
                        </Badge>
                      ))}
                      {hotel.facilities.length > 3 && (
                        <Badge bg="info" className="px-2 py-1">
                          +{hotel.facilities.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="mt-auto">
                    <Button
                      variant="primary"
                      className="w-100 fw-medium"
                      onClick={() => handleViewDetails(hotel)}
                      style={{
                        backgroundColor: "#17a2b8",
                        border: "none",
                        borderRadius: "8px",
                      }}
                    >
                      View Details
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Hotel Details Modal */}
      <Modal show={showModal} onHide={handleCloseModal} size="xl" centered className="hotel-details-modal">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-3">{selectedHotel?.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body className="p-0">
          {selectedHotel && (
            <Container fluid className="p-4">
              <Row>
                {/* Image Carousel */}
                <Col lg={8} className="mb-4">
                  <Carousel className="rounded-3 overflow-hidden">
                    {selectedHotel.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <img
                          className="d-block w-100"
                          src={image || "/placeholder.svg"}
                          alt={`${selectedHotel.name} - Image ${index + 1}`}
                          style={{ height: "400px", objectFit: "cover" }}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                </Col>

                {/* Hotel Info */}
                <Col lg={4}>
                  <div className="hotel-info">
                    <div className="mb-3">
                      <h4 className="fw-bold mb-2">{selectedHotel.name}</h4>
                      <p className="text-muted mb-2">
                        <i className="fa-solid fa-location-dot me-2"></i>
                        {selectedHotel.address}
                      </p>
                      <div className="d-flex align-items-center gap-2 mb-3">
                        <div className="d-flex">{renderStars(selectedHotel.rating)}</div>
                        <span className="fw-bold">{selectedHotel.rating}</span>
                        <span className="text-muted">(245 reviews)</span>
                      </div>
                    </div>

                    <div className="price-section mb-4 p-3 bg-light rounded-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="text-muted">Price per night</span>
                        <span className="fs-3 fw-bold text-primary">${selectedHotel.price}</span>
                      </div>
                    </div>

                    <div className="hotel-details mb-4">
                      <h6 className="fw-bold mb-3">Hotel Information</h6>
                      <div className="row g-3">
                        <div className="col-6">
                          <small className="text-muted">Check-in</small>
                          <div className="fw-medium">{selectedHotel.checkIn}</div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Check-out</small>
                          <div className="fw-medium">{selectedHotel.checkOut}</div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Total Rooms</small>
                          <div className="fw-medium">{selectedHotel.rooms}</div>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Established</small>
                          <div className="fw-medium">{selectedHotel.established}</div>
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-100 fw-medium"
                      style={{
                        backgroundColor: "#17a2b8",
                        border: "none",
                        borderRadius: "8px",
                      }}
                      onClick={handleShowRooms}
                    >
                      Look Rooms
                    </Button>
                  </div>
                </Col>
              </Row>

              {/* Description */}
              <Row className="mt-4">
                <Col>
                  <h5 className="fw-bold mb-3">About This Hotel</h5>
                  <p className="text-muted mb-4">{selectedHotel.description}</p>
                </Col>
              </Row>

              {/* Facilities */}
              <Row className="mb-4">
                <Col>
                  <h5 className="fw-bold mb-3">Facilities & Amenities</h5>
                  <div className="d-flex flex-wrap gap-3">
                    {selectedHotel.facilities.map((facility, index) => (
                      <div key={index} className="facility-item d-flex align-items-center gap-2 p-3 bg-light rounded-3">
                       <img src={facilityIcons[facility]} alt={facility} width={20} height={20} />
                        <span className="fw-medium">{facility}</span>
                      </div>
                    ))}
                  </div>
                </Col>
              </Row>

              {/* Room Common Data */}
              <Row>
                <Col>
                  <h5 className="fw-bold mb-3">Why Choose This Hotel</h5>
                  <Row className="g-3">
                    {roomCommonData.map((item, index) => (
                      <Col md={6} key={index}>
                        <div className="d-flex gap-3 p-3 bg-light rounded-3">
                          <div className="fs-4">
                            <img src={item.icon} alt="hotel common" />
                            </div>
                          <div>
                            <h6 className="fw-bold mb-1">{item.title}</h6>
                            <small className="text-muted">{item.description}</small>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Col>
              </Row>
            </Container>
          )}
        </Modal.Body>
      </Modal>
    </section>
  )
}

export default FeaturedSection
