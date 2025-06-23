import { Container, Row, Col, Card } from "react-bootstrap"
import { testimonials } from "../assests/assets"
import "../styles/Testimonials.css" 

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

const TestImonials = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="text-center mb-5">
          <Col lg={8} className="mx-auto">
            <h2 className="fw-bold display-6">What They Say About Us</h2>
            <p className="text-muted">
              See how travelers around the world are experiencing unforgettable stays with QuickStay.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          {testimonials.map((t) => (
            <Col lg={4} md={6} key={t.id}>
              <Card className="h-100 shadow border-0 p-3">
                <div className="d-flex align-items-center gap-3 mb-3">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="rounded-circle"
                    width={60}
                    height={60}
                    style={{ objectFit: "cover" }}
                  />
                  <div>
                    <h6 className="mb-0 fw-bold">{t.name}</h6>
                    <small className="text-muted">{t.address}</small>
                  </div>
                </div>
                <Card.Body className="p-0">
                  <p className="text-muted fst-italic mb-3">"{t.review}"</p>
                  <div className="d-flex gap-1">{renderStars(t.rating)}</div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  )
}

export default TestImonials
