"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Container, Row, Col, Card, Badge, Button, Carousel, Modal } from "react-bootstrap"
import { useUser } from "@clerk/clerk-react"
import "../styles/RoomDetails.css"
import { roomsDummyData, facilityIcons, roomCommonData } from "../assests/assets"

const RoomDetails = () => {
  const { roomId } = useParams()
  const navigate = useNavigate()
  const { user, isSignedIn } = useUser()
  const [room, setRoom] = useState(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showImageModal, setShowImageModal] = useState(false)
  const [loading, setLoading] = useState(true)

  // Booking form states
  const [checkInDate, setCheckInDate] = useState("")
  const [checkOutDate, setCheckOutDate] = useState("")
  const [guests, setGuests] = useState(1)
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [bookingLoading, setBookingLoading] = useState(false)

  useEffect(() => {
    // Simulate API call to fetch room details
    const fetchRoomDetails = () => {
      const foundRoom = roomsDummyData.find((r) => r._id === roomId)
      if (foundRoom) {
        setRoom(foundRoom)
      }
      setLoading(false)
    }

    fetchRoomDetails()
  }, [roomId])

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const calculateNights = () => {
    if (!checkInDate || !checkOutDate) return 0
    const checkIn = new Date(checkInDate)
    const checkOut = new Date(checkOutDate)
    const timeDiff = checkOut.getTime() - checkIn.getTime()
    const nights = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return nights > 0 ? nights : 0
  }

  const calculateTotalPrice = () => {
    const nights = calculateNights()
    const roomTotal = room.pricePerNight * nights
    const serviceFee = 20
    const taxes = 15
    return roomTotal + serviceFee + taxes
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

  const handleImageClick = (index) => {
    setSelectedImageIndex(index)
    setShowImageModal(true)
  }

  const validateBookingForm = () => {
    if (!isSignedIn) {
      alert("Please sign in to make a booking")
      return false
    }

    if (!checkInDate || !checkOutDate) {
      alert("Please select check-in and check-out dates")
      return false
    }

    const checkIn = new Date(checkInDate)
    const checkOut = new Date(checkOutDate)
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    if (checkIn < today) {
      alert("Check-in date cannot be in the past")
      return false
    }

    if (checkOut <= checkIn) {
      alert("Check-out date must be after check-in date")
      return false
    }

    if (guests < 1 || guests > 4) {
      alert("Number of guests must be between 1 and 4")
      return false
    }

    return true
  }

  const generateBookingId = () => {
    return "BK" + Date.now().toString().slice(-6)
  }

  const generateConfirmationCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    let result = ""
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  const handleBookNow = () => {
    if (!validateBookingForm()) {
      return
    }

    setShowBookingModal(true)
  }

  const confirmBooking = async () => {
    setBookingLoading(true)

    try {
      // Create booking object
      const newBooking = {
        id: generateBookingId(),
        roomId: room._id,
        userId: user.id,
        hotel: {
          name: room.hotel.name,
          address: room.hotel.address,
          city: room.hotel.city,
          contact: room.hotel.contact,
          image: room.images[0],
        },
        room: {
          type: room.roomType,
          images: room.images,
        },
        checkIn: checkInDate,
        checkOut: checkOutDate,
        guests: guests,
        nights: calculateNights(),
        pricePerNight: room.pricePerNight,
        totalAmount: calculateTotalPrice(),
        status: "confirmed",
        bookingDate: new Date().toISOString(),
        confirmationCode: generateConfirmationCode(),
        paymentMethod: "Credit Card",
        isPaid: true,
      }

      // Get existing bookings from localStorage
      const existingBookings = JSON.parse(localStorage.getItem("userBookings") || "[]")

      // Add new booking
      const updatedBookings = [newBooking, ...existingBookings]

      // Save to localStorage
      localStorage.setItem("userBookings", JSON.stringify(updatedBookings))

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setBookingLoading(false)
      setShowBookingModal(false)

      // Show success message
      alert(`Booking confirmed! Your confirmation code is: ${newBooking.confirmationCode}`)

      // Navigate to bookings page
      navigate("/bookings")
    } catch (error) {
      console.error("Booking error:", error)
      setBookingLoading(false)
      alert("There was an error processing your booking. Please try again.")
    }
  }

  if (loading) {
    return (
      <div className="loading-container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading room details...</p>
        </div>
      </div>
    )
  }

  if (!room) {
    return (
      <div className="error-container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <i className="fa-solid fa-exclamation-triangle fs-1 text-warning mb-3"></i>
          <h3 className="text-muted mb-3">Room Not Found</h3>
          <p className="text-muted mb-4">The room you're looking for doesn't exist or has been removed.</p>
          <Button variant="primary" onClick={() => navigate("/")}>
            Back to Home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="room-details-page">
      {/* Back Navigation */}
      <div className="back-navigation py-3 bg-light">
        <Container>
          <Button variant="link" className="back-btn p-0 text-decoration-none" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left me-2"></i>
            Back to Rooms
          </Button>
        </Container>
      </div>

      <Container className="py-4">
        {/* Room Header */}
        <Row className="mb-4">
          <Col>
            <div className="room-header">
              <div className="d-flex justify-content-between align-items-start mb-3">
                <div>
                  <h1 className="room-title fw-bold mb-2">{room.roomType} Room</h1>
                  <div className="hotel-info mb-2">
                    <h4 className="hotel-name text-primary mb-1">{room.hotel.name}</h4>
                    <p className="hotel-address text-muted mb-0">
                      <i className="fa-solid fa-location-dot me-2"></i>
                      {room.hotel.address}, {room.hotel.city}
                    </p>
                  </div>
                  <div className="rating-section d-flex align-items-center gap-3">
                    <div className="d-flex align-items-center gap-2">
                      <div className="d-flex">{renderStars(4.8)}</div>
                      <span className="fw-bold">4.8</span>
                      <span className="text-muted">(245 reviews)</span>
                    </div>
                    <Badge bg={room.isAvailable ? "success" : "danger"} className="status-badge">
                      {room.isAvailable ? "Available" : "Booked"}
                    </Badge>
                  </div>
                </div>
                <div className="price-section text-end">
                  <div className="price-display">
                    <span className="price-amount fw-bold">{formatPrice(room.pricePerNight)}</span>
                    <span className="price-period text-muted">/ night</span>
                  </div>
                  <small className="text-muted">Taxes and fees included</small>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Images Section */}
        <Row className="mb-5">
          <Col>
            <div className="images-section">
              <Row className="g-3">
                {/* Main Image */}
                <Col lg={8}>
                  <div className="main-image-container">
                    <img
                      src={room.images[selectedImageIndex] || "/placeholder.svg"}
                      alt={`${room.roomType} Room - Main`}
                      className="main-image w-100 rounded-3"
                      onClick={() => handleImageClick(selectedImageIndex)}
                      style={{ cursor: "pointer", height: "400px", objectFit: "cover" }}
                    />
                    <div className="image-overlay-info position-absolute">
                      <Badge bg="dark" className="images-count-badge">
                        <i className="fa-solid fa-images me-1"></i>
                        {room.images.length} Photos
                      </Badge>
                    </div>
                  </div>
                </Col>

                {/* Thumbnail Images */}
                <Col lg={4}>
                  <div className="thumbnail-grid">
                    <Row className="g-2">
                      {room.images.slice(0, 4).map((image, index) => (
                        <Col xs={6} key={index}>
                          <div
                            className={`thumbnail-container ${
                              selectedImageIndex === index ? "active" : ""
                            } position-relative`}
                            onClick={() => setSelectedImageIndex(index)}
                            style={{ cursor: "pointer" }}
                          >
                            <img
                              src={image || "/placeholder.svg"}
                              alt={`${room.roomType} Room - ${index + 1}`}
                              className="thumbnail-image w-100 rounded-2"
                              style={{ height: "95px", objectFit: "cover" }}
                            />
                            {index === 3 && room.images.length > 4 && (
                              <div
                                className="more-images-overlay position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center rounded-2"
                                onClick={() => setShowImageModal(true)}
                              >
                                <span className="text-white fw-bold">+{room.images.length - 4} more</span>
                              </div>
                            )}
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <Row>
          {/* Left Column - Room Details */}
          <Col lg={8}>
            {/* Room Description */}
            <Card className="info-card mb-4">
              <Card.Body>
                <h5 className="section-title fw-bold mb-3">
                  <i className="fa-solid fa-info-circle text-primary me-2"></i>
                  Room Description
                </h5>
                <p className="text-muted mb-0">
                  Experience luxury and comfort in our beautifully appointed {room.roomType.toLowerCase()} room.
                  Featuring modern amenities, elegant furnishings, and stunning views, this room provides the perfect
                  retreat for your stay. Whether you're traveling for business or leisure, you'll find everything you
                  need for a memorable experience.
                </p>
              </Card.Body>
            </Card>

            {/* Amenities */}
            <Card className="info-card mb-4">
              <Card.Body>
                <h5 className="section-title fw-bold mb-3">
                  <i className="fa-solid fa-star text-primary me-2"></i>
                  Amenities & Facilities
                </h5>
                <Row className="g-3">
                  {room.amenities.map((amenity, index) => (
                    <Col md={6} key={index}>
                      <div className="amenity-item d-flex align-items-center gap-3 p-3 bg-light rounded-3">
                        <div className="amenity-icon">
                          <img src={facilityIcons[amenity] || "/placeholder.svg"} alt={amenity} />
                        </div>
                        <span className="fw-medium">{amenity}</span>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            {/* Room Features */}
            <Card className="info-card mb-4">
              <Card.Body>
                <h5 className="section-title fw-bold mb-3">
                  <i className="fa-solid fa-shield-check text-primary me-2"></i>
                  Why Choose This Room
                </h5>
                <Row className="g-3">
                  {roomCommonData.map((item, index) => (
                    <Col md={6} key={index}>
                      <div className="feature-item d-flex gap-3 p-3 bg-light rounded-3">
                        <div className="feature-icon">
                          <img src={item.icon || "/placeholder.svg"} alt={item.title} />
                        </div>
                        <div>
                          <h6 className="fw-bold mb-1">{item.title}</h6>
                          <small className="text-muted">{item.description}</small>
                        </div>
                      </div>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            {/* Hotel Contact Information */}
            <Card className="info-card mb-4">
              <Card.Body>
                <h5 className="section-title fw-bold mb-3">
                  <i className="fa-solid fa-phone text-primary me-2"></i>
                  Contact Information
                </h5>
                <div className="contact-info">
                  <div className="contact-item mb-3">
                    <strong>Hotel:</strong> {room.hotel.name}
                  </div>
                  <div className="contact-item mb-3">
                    <strong>Address:</strong> {room.hotel.address}, {room.hotel.city}
                  </div>
                  <div className="contact-item mb-3">
                    <strong>Phone:</strong>{" "}
                    <a href={`tel:${room.hotel.contact}`} className="text-primary text-decoration-none">
                      {room.hotel.contact}
                    </a>
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Location Map */}
            <Card className="info-card mb-4">
              <Card.Body>
                <h5 className="section-title fw-bold mb-3">
                  <i className="fa-solid fa-map-location-dot text-primary me-2"></i>
                  Location
                </h5>
                <div className="map-container">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3024.8192278158294!2d-73.82957092495577!3d40.699978771395365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c260b0fdb5094f%3A0x281f8bc4e02ccd2f!2sJamaica%20Av%2F124%20St!5e0!3m2!1sen!2sma!4v1750240911585!5m2!1sen!2sma"
                    width="700"
                    height="300"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </Card.Body>
            </Card>
          </Col>

          {/* Right Column - Booking Card */}
          <Col lg={4}>
            <Card className="booking-card sticky-lg-top" style={{ top: "100px" }}>
              <Card.Body className="p-4">
                <div className="booking-header mb-4">
                  <div className="price-display mb-3">
                    <span className="booking-price fw-bold">{formatPrice(room.pricePerNight)}</span>
                    <span className="booking-period text-muted">/ night</span>
                  </div>
                  <div className="rating-display d-flex align-items-center gap-2 mb-3">
                    <div className="d-flex">{renderStars(4.8)}</div>
                    <span className="fw-medium">4.8</span>
                    <span className="text-muted">(245 reviews)</span>
                  </div>
                </div>

                <div className="booking-form">
                  <div className="date-inputs mb-3">
                    <Row className="g-2">
                      <Col>
                        <label className="form-label small text-muted">Check-in</label>
                        <input
                          type="date"
                          className="form-control"
                          value={checkInDate}
                          onChange={(e) => setCheckInDate(e.target.value)}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </Col>
                      <Col>
                        <label className="form-label small text-muted">Check-out</label>
                        <input
                          type="date"
                          className="form-control"
                          value={checkOutDate}
                          onChange={(e) => setCheckOutDate(e.target.value)}
                          min={checkInDate || new Date().toISOString().split("T")[0]}
                        />
                      </Col>
                    </Row>
                  </div>

                  <div className="guests-input mb-4">
                    <label className="form-label small text-muted">Guests</label>
                    <select className="form-select" value={guests} onChange={(e) => setGuests(Number(e.target.value))}>
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                    </select>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="book-now-btn w-100 fw-medium mb-3"
                    onClick={handleBookNow}
                    disabled={!room.isAvailable || !isSignedIn}
                    style={{
                      backgroundColor: "#17a2b8",
                      border: "none",
                      borderRadius: "8px",
                    }}
                  >
                    {!isSignedIn ? "Sign In to Book" : !room.isAvailable ? "Currently Unavailable" : "Book Now"}
                  </Button>

                  <div className="booking-note text-center">
                    <small className="text-muted">You won't be charged yet</small>
                  </div>
                </div>

                <hr className="my-4" />

                <div className="price-breakdown">
                  <h6 className="fw-bold mb-3">Price Breakdown</h6>
                  {checkInDate && checkOutDate && calculateNights() > 0 ? (
                    <>
                      <div className="breakdown-item d-flex justify-content-between mb-2">
                        <span className="text-muted">
                          {formatPrice(room.pricePerNight)} × {calculateNights()} night
                          {calculateNights() > 1 ? "s" : ""}
                        </span>
                        <span>{formatPrice(room.pricePerNight * calculateNights())}</span>
                      </div>
                      <div className="breakdown-item d-flex justify-content-between mb-2">
                        <span className="text-muted">Service fee</span>
                        <span>{formatPrice(20)}</span>
                      </div>
                      <div className="breakdown-item d-flex justify-content-between mb-2">
                        <span className="text-muted">Taxes</span>
                        <span>{formatPrice(15)}</span>
                      </div>
                      <hr />
                      <div className="breakdown-total d-flex justify-content-between fw-bold">
                        <span>Total</span>
                        <span>{formatPrice(calculateTotalPrice())}</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center text-muted">
                      <small>Select dates to see pricing</small>
                    </div>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Booking Confirmation Modal */}
      <Modal show={showBookingModal} onHide={() => setShowBookingModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Your Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="booking-summary">
            <h6 className="fw-bold mb-3">Booking Summary</h6>

            <div className="summary-item mb-2">
              <strong>Hotel:</strong> {room.hotel.name}
            </div>
            <div className="summary-item mb-2">
              <strong>Room:</strong> {room.roomType}
            </div>
            <div className="summary-item mb-2">
              <strong>Check-in:</strong> {formatDate(checkInDate)}
            </div>
            <div className="summary-item mb-2">
              <strong>Check-out:</strong> {formatDate(checkOutDate)}
            </div>
            <div className="summary-item mb-2">
              <strong>Guests:</strong> {guests}
            </div>
            <div className="summary-item mb-2">
              <strong>Nights:</strong> {calculateNights()}
            </div>

            <hr />

            <div className="summary-item mb-2 d-flex justify-content-between">
              <span>Room Total:</span>
              <span>{formatPrice(room.pricePerNight * calculateNights())}</span>
            </div>
            <div className="summary-item mb-2 d-flex justify-content-between">
              <span>Service Fee:</span>
              <span>{formatPrice(20)}</span>
            </div>
            <div className="summary-item mb-2 d-flex justify-content-between">
              <span>Taxes:</span>
              <span>{formatPrice(15)}</span>
            </div>

            <hr />

            <div className="summary-total d-flex justify-content-between fw-bold fs-5">
              <span>Total Amount:</span>
              <span className="text-primary">{formatPrice(calculateTotalPrice())}</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowBookingModal(false)} disabled={bookingLoading}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={confirmBooking}
            disabled={bookingLoading}
            style={{ backgroundColor: "#17a2b8", border: "none" }}
          >
            {bookingLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                Processing...
              </>
            ) : (
              "Confirm Booking"
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Image Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)} size="xl" centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Room Gallery</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <Carousel
            activeIndex={selectedImageIndex}
            onSelect={(selectedIndex) => setSelectedImageIndex(selectedIndex)}
            className="room-gallery-carousel"
          >
            {room.images.map((image, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100"
                  src={image || "/placeholder.svg"}
                  alt={`${room.roomType} Room - ${index + 1}`}
                  style={{ height: "500px", objectFit: "cover" }}
                />
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </div>
  )
}

export default RoomDetails
