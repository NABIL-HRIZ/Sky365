"use client"

import { useState, useEffect } from "react"
import { Container, Row, Col, Card, Badge, Button, Modal, Tab, Tabs } from "react-bootstrap"
import { useUser } from "@clerk/clerk-react"
import { useNavigate } from "react-router-dom"
import "../styles/MyBookings.css"

const MyBookings = () => {
  const { user, isSignedIn } = useUser()
  const navigate = useNavigate()
  const [bookings, setBookings] = useState([])
  const [filteredBookings, setFilteredBookings] = useState([])
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [selectedBooking, setSelectedBooking] = useState(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/")
      return
    }

    // Fetch bookings from localStorage
    const fetchBookings = () => {
      try {
        const storedBookings = JSON.parse(localStorage.getItem("userBookings") || "[]")
        // Filter bookings for current user
        const userBookings = storedBookings.filter((booking) => booking.userId === user.id)
        setBookings(userBookings)
        setFilteredBookings(userBookings)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching bookings:", error)
        setLoading(false)
      }
    }

    fetchBookings()
  }, [isSignedIn, navigate, user])

  useEffect(() => {
    if (selectedStatus === "all") {
      setFilteredBookings(bookings)
    } else {
      setFilteredBookings(bookings.filter((booking) => booking.status === selectedStatus))
    }
  }, [selectedStatus, bookings])

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

  const getStatusBadge = (status) => {
    const statusConfig = {
      confirmed: { bg: "success", text: "Confirmed", icon: "fa-check-circle" },
      pending: { bg: "warning", text: "Pending", icon: "fa-clock" },
      completed: { bg: "primary", text: "Completed", icon: "fa-flag-checkered" },
      cancelled: { bg: "danger", text: "Cancelled", icon: "fa-times-circle" },
    }

    const config = statusConfig[status] || statusConfig.pending

    return (
      <Badge bg={config.bg} className="status-badge d-flex align-items-center gap-1">
        <i className={`fa-solid ${config.icon}`}></i>
        {config.text}
      </Badge>
    )
  }

  const getBookingCounts = () => {
    return {
      all: bookings.length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
      pending: bookings.filter((b) => b.status === "pending").length,
      completed: bookings.filter((b) => b.status === "completed").length,
      cancelled: bookings.filter((b) => b.status === "cancelled").length,
    }
  }

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking)
    setShowDetailsModal(true)
  }

  const handleCancelBooking = (bookingId) => {
    // Update booking status in localStorage
    const updatedBookings = bookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: "cancelled" } : booking,
    )
    setBookings(updatedBookings)

    // Update localStorage
    const allBookings = JSON.parse(localStorage.getItem("userBookings") || "[]")
    const updatedAllBookings = allBookings.map((booking) =>
      booking.id === bookingId ? { ...booking, status: "cancelled" } : booking,
    )
    localStorage.setItem("userBookings", JSON.stringify(updatedAllBookings))
  }

  const handleViewRoom = (roomId) => {
    navigate(`/rooms/${roomId}`)
  }

  const counts = getBookingCounts()

  if (loading) {
    return (
      <div className="loading-container d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="text-muted">Loading your bookings...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="my-bookings-page">
      <Container className="py-5">
        {/* Page Header */}
        <Row className="mb-5">
          <Col>
            <div className="page-header">
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div>
                  <h1 className="page-title fw-bold mb-2">My Bookings</h1>
                  <p className="page-subtitle text-muted mb-0">
                    Manage and track all your hotel reservations in one place
                  </p>
                </div>
                <div className="user-info d-flex align-items-center gap-3">
                  {user?.imageUrl ? (
                    <img
                      src={user.imageUrl || "/placeholder.svg"}
                      alt="User Avatar"
                      className="rounded-circle"
                      style={{ width: "48px", height: "48px" }}
                    />
                  ) : (
                    <div
                      className="rounded-circle bg-primary d-flex align-items-center justify-content-center text-white fw-bold"
                      style={{ width: "48px", height: "48px" }}
                    >
                      {user?.firstName?.charAt(0) || "U"}
                    </div>
                  )}
                  <div>
                    <h6 className="mb-0 fw-bold">
                      {user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user?.firstName || "User"}
                    </h6>
                    <small className="text-muted">{counts.all} total bookings</small>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        {/* Filter Tabs */}
        <Row className="mb-4">
          <Col>
            <Tabs
              activeKey={selectedStatus}
              onSelect={(status) => setSelectedStatus(status)}
              className="booking-tabs"
              fill
            >
              <Tab
                eventKey="all"
                title={
                  <span>
                    <i className="fa-solid fa-list me-2"></i>
                    All Bookings{" "}
                    <Badge bg="secondary" className="ms-2">
                      {counts.all}
                    </Badge>
                  </span>
                }
              />
              <Tab
                eventKey="confirmed"
                title={
                  <span>
                    <i className="fa-solid fa-check-circle me-2"></i>
                    Confirmed{" "}
                    <Badge bg="success" className="ms-2">
                      {counts.confirmed}
                    </Badge>
                  </span>
                }
              />
              <Tab
                eventKey="pending"
                title={
                  <span>
                    <i className="fa-solid fa-clock me-2"></i>
                    Pending{" "}
                    <Badge bg="warning" className="ms-2">
                      {counts.pending}
                    </Badge>
                  </span>
                }
              />
              <Tab
                eventKey="completed"
                title={
                  <span>
                    <i className="fa-solid fa-flag-checkered me-2"></i>
                    Completed{" "}
                    <Badge bg="primary" className="ms-2">
                      {counts.completed}
                    </Badge>
                  </span>
                }
              />
              <Tab
                eventKey="cancelled"
                title={
                  <span>
                    <i className="fa-solid fa-times-circle me-2"></i>
                    Cancelled{" "}
                    <Badge bg="danger" className="ms-2">
                      {counts.cancelled}
                    </Badge>
                  </span>
                }
              />
            </Tabs>
          </Col>
        </Row>

        {/* Bookings List */}
        <Row>
          <Col>
            {filteredBookings.length === 0 ? (
              <div className="no-bookings text-center py-5">
                <div className="no-bookings-content">
                  <i className="fa-solid fa-calendar-xmark fs-1 text-muted mb-4"></i>
                  <h4 className="text-muted mb-3">
                    {selectedStatus === "all" ? "No bookings found" : `No ${selectedStatus} bookings`}
                  </h4>
                  <p className="text-muted mb-4">
                    {selectedStatus === "all"
                      ? "You haven't made any bookings yet. Start exploring our amazing hotels!"
                      : `You don't have any ${selectedStatus} bookings at the moment.`}
                  </p>
                  <Button variant="primary" onClick={() => navigate("/")} className="px-4">
                    <i className="fa-solid fa-search me-2"></i>
                    Explore Hotels
                  </Button>
                </div>
              </div>
            ) : (
              <div className="bookings-list">
                {filteredBookings.map((booking) => (
                  <Card key={booking.id} className="booking-card mb-4 border-0 shadow-sm">
                    <Row className="g-0">
                      {/* Hotel Image */}
                      <Col md={4} lg={3}>
                        <div className="booking-image-container">
                          <img
                            src={booking.hotel.image || "/placeholder.svg"}
                            alt={booking.hotel.name}
                            className="booking-image w-100 h-100"
                            style={{ objectFit: "cover", minHeight: "200px" }}
                          />
                          <div className="booking-status-overlay">{getStatusBadge(booking.status)}</div>
                        </div>
                      </Col>

                      {/* Booking Details */}
                      <Col md={8} lg={9}>
                        <Card.Body className="p-4">
                          <Row>
                            <Col lg={8}>
                              <div className="booking-header mb-3">
                                <h5 className="booking-title fw-bold mb-1">{booking.hotel.name}</h5>
                                <p className="booking-location text-muted mb-2">
                                  <i className="fa-solid fa-location-dot me-1"></i>
                                  {booking.hotel.city}
                                </p>
                                <div className="booking-room-info">
                                  <Badge bg="light" text="dark" className="me-2">
                                    <i className="fa-solid fa-bed me-1"></i>
                                    {booking.room.type}
                                  </Badge>
                                  <Badge bg="light" text="dark">
                                    <i className="fa-solid fa-users me-1"></i>
                                    {booking.guests} Guest{booking.guests > 1 ? "s" : ""}
                                  </Badge>
                                </div>
                              </div>

                              <div className="booking-dates mb-3">
                                <Row className="g-3">
                                  <Col sm={6}>
                                    <div className="date-info">
                                      <small className="text-muted d-block">Check-in</small>
                                      <span className="fw-medium">{formatDate(booking.checkIn)}</span>
                                    </div>
                                  </Col>
                                  <Col sm={6}>
                                    <div className="date-info">
                                      <small className="text-muted d-block">Check-out</small>
                                      <span className="fw-medium">{formatDate(booking.checkOut)}</span>
                                    </div>
                                  </Col>
                                </Row>
                              </div>

                              <div className="booking-meta">
                                <small className="text-muted">
                                  <i className="fa-solid fa-calendar me-1"></i>
                                  Booked on {formatDate(booking.bookingDate)}
                                </small>
                                <span className="mx-2">•</span>
                                <small className="text-muted">
                                  <i className="fa-solid fa-moon me-1"></i>
                                  {booking.nights} night{booking.nights > 1 ? "s" : ""}
                                </small>
                                <span className="mx-2">•</span>
                                <small className="text-muted">
                                  <i className="fa-solid fa-hashtag me-1"></i>
                                  {booking.confirmationCode}
                                </small>
                              </div>
                            </Col>

                            <Col lg={4}>
                              <div className="booking-actions text-lg-end">
                                <div className="booking-price mb-3">
                                  <div className="total-amount fw-bold fs-5 text-primary">
                                    {formatPrice(booking.totalAmount)}
                                  </div>
                                  <small className="text-muted">
                                    {formatPrice(booking.pricePerNight)} × {booking.nights} nights
                                  </small>
                                </div>

                                <div className="action-buttons d-flex flex-column gap-2">
                                  <Button
                                    variant="primary"
                                    size="sm"
                                    onClick={() => handleViewDetails(booking)}
                                    className="fw-medium"
                                  >
                                    <i className="fa-solid fa-eye me-1"></i>
                                    View Details
                                  </Button>

                                  <Button
                                    variant="outline-primary"
                                    size="sm"
                                    onClick={() => handleViewRoom(booking.roomId)}
                                    className="fw-medium"
                                  >
                                    <i className="fa-solid fa-external-link-alt me-1"></i>
                                    View Room
                                  </Button>

                                  {booking.status === "confirmed" && (
                                    <Button
                                      variant="outline-danger"
                                      size="sm"
                                      onClick={() => handleCancelBooking(booking.id)}
                                      className="fw-medium"
                                    >
                                      <i className="fa-solid fa-times me-1"></i>
                                      Cancel
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))}
              </div>
            )}
          </Col>
        </Row>
      </Container>

      {/* Booking Details Modal */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)} size="lg" centered>
        <Modal.Header closeButton className="border-0">
          <Modal.Title>Booking Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedBooking && (
            <div className="booking-details">
              <Row className="mb-4">
                <Col md={4}>
                  <img
                    src={selectedBooking.hotel.image || "/placeholder.svg"}
                    alt={selectedBooking.hotel.name}
                    className="w-100 rounded-3"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                </Col>
                <Col md={8}>
                  <h5 className="fw-bold mb-2">{selectedBooking.hotel.name}</h5>
                  <p className="text-muted mb-2">
                    <i className="fa-solid fa-location-dot me-2"></i>
                    {selectedBooking.hotel.address}
                  </p>
                  <p className="text-muted mb-3">
                    <i className="fa-solid fa-phone me-2"></i>
                    {selectedBooking.hotel.contact}
                  </p>
                  <div className="mb-3">{getStatusBadge(selectedBooking.status)}</div>
                </Col>
              </Row>

              <Row className="mb-4">
                <Col md={6}>
                  <h6 className="fw-bold mb-3">Booking Information</h6>
                  <div className="info-item mb-2">
                    <strong>Confirmation Code:</strong> {selectedBooking.confirmationCode}
                  </div>
                  <div className="info-item mb-2">
                    <strong>Room Type:</strong> {selectedBooking.room.type}
                  </div>
                  <div className="info-item mb-2">
                    <strong>Guests:</strong> {selectedBooking.guests}
                  </div>
                  <div className="info-item mb-2">
                    <strong>Booking Date:</strong> {formatDate(selectedBooking.bookingDate)}
                  </div>
                </Col>
                <Col md={6}>
                  <h6 className="fw-bold mb-3">Stay Details</h6>
                  <div className="info-item mb-2">
                    <strong>Check-in:</strong> {formatDate(selectedBooking.checkIn)}
                  </div>
                  <div className="info-item mb-2">
                    <strong>Check-out:</strong> {formatDate(selectedBooking.checkOut)}
                  </div>
                  <div className="info-item mb-2">
                    <strong>Duration:</strong> {selectedBooking.nights} night{selectedBooking.nights > 1 ? "s" : ""}
                  </div>
                </Col>
              </Row>

              <Row>
                <Col>
                  <h6 className="fw-bold mb-3">Price Breakdown</h6>
                  <div className="price-breakdown bg-light p-3 rounded-3">
                    <div className="d-flex justify-content-between mb-2">
                      <span>Room rate ({selectedBooking.nights} nights)</span>
                      <span>{formatPrice(selectedBooking.pricePerNight * selectedBooking.nights)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Service fee</span>
                      <span>{formatPrice(20)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-2">
                      <span>Taxes</span>
                      <span>{formatPrice(15)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between fw-bold fs-5">
                      <span>Total</span>
                      <span className="text-primary">{formatPrice(selectedBooking.totalAmount)}</span>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0">
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Close
          </Button>
          {selectedBooking && (
            <Button variant="primary" onClick={() => handleViewRoom(selectedBooking.roomId)}>
              View Room Details
            </Button>
          )}
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default MyBookings
