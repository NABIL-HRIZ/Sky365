"use client"

import { useState } from "react"
import { Container, Row, Col, Card, Badge, Button, Form, Accordion } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import "../styles/AllRooms.css"
import { roomsDummyData } from "../assests/assets"
import { facilityIcons } from "../assests/assets"

const AllRooms = () => {
  const navigate = useNavigate()

  // Filter states
  const [selectedRoomTypes, setSelectedRoomTypes] = useState([])
  const [selectedPriceRange, setSelectedPriceRange] = useState("")
  const [filteredRooms, setFilteredRooms] = useState(roomsDummyData)

  // Filter options
  const roomTypes = [
    { value: "Single Bed", label: "Single Bed"},
    { value: "Double Bed", label: "Double Bed"},
    { value: "Family Suite", label: "Family Suite"},
    { value: "Luxury Room", label: "Luxury Room"},
  ]

  const priceRanges = [
    { value: "0-100", label: "$0 - $100", min: 0, max: 100 },
    { value: "100-200", label: "$100 - $200", min: 100, max: 200 },
    { value: "200-300", label: "$200 - $300", min: 200, max: 300 },
    { value: "300-400", label: "$300 - $400", min: 300, max: 400 },
    { value: "400+", label: "$400+", min: 400, max: Number.POSITIVE_INFINITY },
  ]

  const handleRoomClick = (roomId) => {
    navigate(`/rooms/${roomId}`)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(price)
  }

  // Handle room type filter
  const handleRoomTypeChange = (roomType) => {
    let updatedTypes
    if (selectedRoomTypes.includes(roomType)) {
      updatedTypes = selectedRoomTypes.filter((type) => type !== roomType)
    } else {
      updatedTypes = [...selectedRoomTypes, roomType]
    }
    setSelectedRoomTypes(updatedTypes)
    applyFilters(updatedTypes, selectedPriceRange)
  }

  // Handle price range filter
  const handlePriceRangeChange = (priceRange) => {
    setSelectedPriceRange(priceRange)
    applyFilters(selectedRoomTypes, priceRange)
  }

  // Apply filters
  const applyFilters = (roomTypes, priceRange) => {
    let filtered = roomsDummyData

    // Filter by room type
    if (roomTypes.length > 0) {
      filtered = filtered.filter((room) => roomTypes.includes(room.roomType))
    }

    // Filter by price range
    if (priceRange) {
      const range = priceRanges.find((r) => r.value === priceRange)
      if (range) {
        filtered = filtered.filter((room) => room.pricePerNight >= range.min && room.pricePerNight <= range.max)
      }
    }

    setFilteredRooms(filtered)
  }

  // Clear all filters
  const clearFilters = () => {
    setSelectedRoomTypes([])
    setSelectedPriceRange("")
    setFilteredRooms(roomsDummyData)
  }

  // Get active filters count
  const getActiveFiltersCount = () => {
    let count = 0
    if (selectedRoomTypes.length > 0) count += selectedRoomTypes.length
    if (selectedPriceRange) count += 1
    return count
  }

  return (
    <section className="all-rooms-section py-5">
      <Container>
        <Row>
          {/* Left Side - Filter Section */}
          <Col lg={4} className="mb-4 mb-lg-0">
            <div className="filter-section sticky-lg-top" style={{ top: "100px" }}>
              <div className="filter-header">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="filter-title fw-bold mb-0">Filters</h2>
                  {getActiveFiltersCount() > 0 && (
                    <Button
                      variant="link"
                      className="clear-filters-btn p-0 text-decoration-none"
                      onClick={clearFilters}
                    >
                      <i className="fa-solid fa-xmark me-1"></i>
                      Clear All ({getActiveFiltersCount()})
                    </Button>
                  )}
                </div>

                {/* Active Filters Display */}
                {getActiveFiltersCount() > 0 && (
                  <div className="active-filters mb-4">
                    <div className="d-flex flex-wrap gap-2">
                      {selectedRoomTypes.map((type) => (
                        <Badge
                          key={type}
                          bg="primary"
                          className="active-filter-badge"
                          onClick={() => handleRoomTypeChange(type)}
                          style={{ cursor: "pointer" }}
                        >
                          {type} <i className="fa-solid fa-xmark ms-1"></i>
                        </Badge>
                      ))}
                      {selectedPriceRange && (
                        <Badge
                          bg="primary"
                          className="active-filter-badge"
                          onClick={() => handlePriceRangeChange("")}
                          style={{ cursor: "pointer" }}
                        >
                          {priceRanges.find((r) => r.value === selectedPriceRange)?.label}
                          <i className="fa-solid fa-xmark ms-1"></i>
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Accordion defaultActiveKey={["0", "1"]} alwaysOpen className="filter-accordion">
                {/* Room Type Filter */}
                <Accordion.Item eventKey="0" className="filter-accordion-item">
                  <Accordion.Header className="filter-accordion-header">
                    <div className="d-flex align-items-center gap-2">
                      <i className="fa-solid fa-bed text-primary"></i>
                      <span className="fw-medium">Room Type</span>
                      <Badge bg="light" text="dark" className="ms-auto">
                        {roomTypes.reduce((sum, type) => sum + type.count, 0)}
                      </Badge>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="filter-accordion-body">
                    <div className="filter-options">
                      {roomTypes.map((type) => (
                        <div key={type.value} className="filter-option">
                          <Form.Check
                            type="checkbox"
                            id={`room-type-${type.value}`}
                            label={
                              <div className="d-flex justify-content-between align-items-center w-100">
                                <span>{type.label}</span>
                                
                              </div>
                            }
                            checked={selectedRoomTypes.includes(type.value)}
                            onChange={() => handleRoomTypeChange(type.value)}
                            className="custom-checkbox"
                            disabled={type.count === 0}
                          />
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

                {/* Price Range Filter */}
                <Accordion.Item eventKey="1" className="filter-accordion-item">
                  <Accordion.Header className="filter-accordion-header">
                    <div className="d-flex align-items-center gap-2">
                      <i className="fa-solid fa-dollar-sign text-primary"></i>
                      <span className="fw-medium">Price Range</span>
                      <Badge bg="light" text="dark" className="ms-auto">
                        Per Night
                      </Badge>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body className="filter-accordion-body">
                    <div className="filter-options">
                      {priceRanges.map((range) => (
                        <div key={range.value} className="filter-option">
                          <Form.Check
                            type="radio"
                            name="priceRange"
                            id={`price-range-${range.value}`}
                            label={range.label}
                            checked={selectedPriceRange === range.value}
                            onChange={() => handlePriceRangeChange(range.value)}
                            className="custom-radio"
                          />
                        </div>
                      ))}
                    </div>
                  </Accordion.Body>
                </Accordion.Item>

              </Accordion>

              {/* Results Summary */}
              <div className="results-summary mt-4 p-3 bg-light rounded">
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-muted">
                    <i className="fa-solid fa-list me-2"></i>
                    {filteredRooms.length} room{filteredRooms.length !== 1 ? "s" : ""} found
                  </span>
                  {filteredRooms.length !== roomsDummyData.length && (
                    <small className="text-primary">of {roomsDummyData.length} total</small>
                  )}
                </div>
              </div>
            </div>
          </Col>

          {/* Right Side - Rooms List */}
          <Col lg={8}>
            <div className="rooms-list">
              {filteredRooms.length === 0 ? (
                <div className="no-results text-center py-5">
                  <i className="fa-solid fa-search fs-1 text-muted mb-3"></i>
                  <h4 className="text-muted mb-3">No rooms found</h4>
                  <p className="text-muted mb-4">Try adjusting your filters to see more results</p>
                  <Button variant="primary" onClick={clearFilters}>
                    Clear All Filters
                  </Button>
                </div>
              ) : (
                filteredRooms.map((room, index) => (
                  <Card key={room._id} className="room-card mb-4 border-0 shadow-sm">
                    <Row className="g-0">
                      {/* Room Image */}
                      <Col md={5}>
                        <div
                          className="room-image-wrapper position-relative overflow-hidden h-100"
                          onClick={() => handleRoomClick(room._id)}
                          style={{ cursor: "pointer" }}
                        >
                          <img
                            src={room.images[0] || "/placeholder.svg"}
                            alt={`${room.roomType} Room`}
                            className="room-image w-100 h-100"
                            style={{ objectFit: "cover", minHeight: "250px" }}
                          />
                          <div className="image-overlay">
                            <div className="overlay-content">
                              <i className="fa-solid fa-eye text-white fs-4"></i>
                              <span className="text-white fw-medium">View Details</span>
                            </div>
                          </div>

                          {/* Availability Badge */}
                          <Badge
                            bg={room.isAvailable ? "success" : "danger"}
                            className="availability-badge position-absolute"
                          >
                            {room.isAvailable ? "Available" : "Booked"}
                          </Badge>

                          {/* Images Count */}
                          <div className="images-count position-absolute">
                            <i className="fa-solid fa-images me-1"></i>
                            <span>{room.images.length}</span>
                          </div>
                        </div>
                      </Col>

                      {/* Room Details */}
                      <Col md={7}>
                        <Card.Body className="p-4 h-100 d-flex flex-column">
                          <div className="room-header mb-3">
                            <h4
                              className="room-name fw-bold mb-2 text-dark"
                              onClick={() => handleRoomClick(room._id)}
                              style={{ cursor: "pointer" }}
                            >
                              {room.roomType} Room
                            </h4>
                            <p className="hotel-info text-muted mb-0">
                              <i className="fa-solid fa-location-dot me-1"></i>
                              {room.hotel.name} • {room.hotel.city}
                            </p>
                            <span style={{ marginLeft: "20px", color: "gray" }}>{room.hotel.address}</span>
                          </div>

                          {/* Amenities */}
                          <div className="room-amenities mb-3">
                            <h6 className="fw-bold mb-2 text-dark">Amenities</h6>
                            <div className="amenities-list d-flex flex-wrap gap-2">
                              {room.amenities.map((amenity, amenityIndex) => (
                                <Badge key={amenityIndex} bg="light" text="dark" className="amenity-badge px-3 py-2">
                                  <img className="me-2" src={facilityIcons[amenity] || "/placeholder.svg"} />
                                  {amenity}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Price and Action */}
                          <div className="room-footer mt-auto">
                            <Row className="align-items-center">
                              <Col>
                                <div className="price-section">
                                  <span className="price-amount fw-bold fs-4 text-primary">
                                    {formatPrice(room.pricePerNight)}
                                  </span>
                                  <span className="price-period text-muted ms-1">/ night</span>
                                </div>
                              </Col>
                              <Col xs="auto">
                                <Button
                                  variant="primary"
                                  className="book-now-btn fw-medium px-4"
                                  onClick={() => handleRoomClick(room._id)}
                                  style={{
                                    backgroundColor: "#17a2b8",
                                    border: "none",
                                    borderRadius: "25px",
                                  }}
                                >
                                  View Room
                                </Button>
                              </Col>
                            </Row>
                          </div>
                        </Card.Body>
                      </Col>
                    </Row>
                  </Card>
                ))
              )}
            </div>

            {/* Load More Button */}
            {filteredRooms.length > 0 && (
              <div className="text-center mt-4">
                <Button variant="outline-primary" size="lg" className="load-more-btn px-5">
                  <i className="fa-solid fa-plus me-2"></i>
                  Load More Rooms
                </Button>
              </div>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default AllRooms
