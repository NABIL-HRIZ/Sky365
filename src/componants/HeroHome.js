"use client"

import { useState } from "react"
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap"
import "../styles/HeroHome.css"

const HeroHome = () => {
  const [checkIn, setCheckIn] = useState("")
  const [checkOut, setCheckOut] = useState("")
  const [guests, setGuests] = useState(1)
  const [rooms, setRooms] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission - you can connect this to your booking system
    console.log({ checkIn, checkOut, guests, rooms })
    alert("Booking form submitted! Check console for details.")
  }

  return (
    <div className="hero-section">
      <div className="hero-overlay">
        <Container>
          <Row className="pt-5">
            <Col lg={6} className="text-white hero-content">
              <h1 className="display-4 fw-bold">Experience Luxury & Comfort</h1>
              <p className="lead mb-4">
                Discover the perfect balance of luxury, comfort, and value at our premium hotel locations worldwide.
                Book your stay today and create unforgettable memories.
              </p>
            </Col>
          </Row>

          <Row className="pb-5">
            <Col lg={8} className="mx-auto">
              <Card className="booking-card shadow">
                <Card.Body>
                  <h3 className="mb-4 text-center">Book Your Stay</h3>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Check-in Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={checkIn}
                            onChange={(e) => setCheckIn(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Check-out Date</Form.Label>
                          <Form.Control
                            type="date"
                            value={checkOut}
                            onChange={(e) => setCheckOut(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Guests</Form.Label>
                          <Form.Select value={guests} onChange={(e) => setGuests(Number.parseInt(e.target.value))}>
                            {[1, 2, 3, 4, 5, 6].map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? "Guest" : "Guests"}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group>
                          <Form.Label>Rooms</Form.Label>
                          <Form.Select value={rooms} onChange={(e) => setRooms(Number.parseInt(e.target.value))}>
                            {[1, 2, 3, 4, 5].map((num) => (
                              <option key={num} value={num}>
                                {num} {num === 1 ? "Room" : "Rooms"}
                              </option>
                            ))}
                          </Form.Select>
                        </Form.Group>
                      </Col>
                    </Row>

                    <div className="d-grid gap-2">
                      <Button variant="info" size="lg" type="submit">
                        Search Availability
                      </Button>
                    </div>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default HeroHome
