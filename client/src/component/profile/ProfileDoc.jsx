import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProfileDoc() {
  return (
    <Container>
      <Card
        className="mx-auto my-5"
        style={{ width: "60rem", boxShadow: "0 0 5px gray" }}
      >
        <Card.Body>
          <Row>
            <Col md={8}>
              <h5 className="text-bold mb-2">Personal Info</h5>
              <Row className="my-3">
                <Col md={1}>
                  <img
                    src="/assets/img/Vectorfullname.png"
                    alt="profile"
                    style={{ width: "170%" }}
                  />
                </Col>
                <Col md={11} className="ps-4">
                  <span className="text-bold">Radif Ganteng</span>
                  <br />
                  <span className="text-gray">Full Name</span>
                </Col>
              </Row>
              <Row className="my-3">
                <Col md={1}>
                  <img
                    src="/assets/img/Vectoremail.png"
                    alt="profile"
                    style={{ width: "170%" }}
                  />
                </Col>
                <Col md={11} className="ps-4">
                  <span className="text-bold">radifgans@gmail.com</span>
                  <br />
                  <span className="text-gray">Email</span>
                </Col>
              </Row>
              <Row className="my-3">
                <Col md={1}>
                  <img
                    src="/assets/img/patient.png"
                    alt="profile"
                    style={{ width: "170%" }}
                  />
                </Col>
                <Col md={11} className="ps-4">
                  <span className="text-bold">Patien</span>
                  <br />
                  <span className="text-gray">Status</span>
                </Col>
              </Row>
              <Row className="my-3">
                <Col md={1}>
                  <img
                    src="/assets/img/Vectormale.png"
                    alt="profile"
                    style={{ width: "170%" }}
                  />
                </Col>
                <Col md={11} className="ps-4">
                  <span className="text-bold">Male</span>
                  <br />
                  <span className="text-gray">Gender</span>
                </Col>
              </Row>
              <Row className="my-3">
                <Col md={1}>
                  <img
                    src="/assets/img/Vectorphone.png"
                    alt="profile"
                    style={{ width: "150%" }}
                  />
                </Col>
                <Col md={11} className="ps-4">
                  <span className="text-bold">089564736456</span>
                  <br />
                  <span className="text-gray">Phone</span>
                </Col>
              </Row>
              <Row className="my-3">
                <Col md={1}>
                  <img
                    src="/assets/img/Vectoraddress.png"
                    alt="profile"
                    style={{ width: "170%" }}
                  />
                </Col>
                <Col md={11} className="ps-4">
                  <span className="text-bold">
                    Perumahan Permata Bintaro Residence C-3
                  </span>
                  <br />
                  <span className="text-gray">Address</span>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              <img
                src="/assets/img/yeji.jpeg"
                alt="profile"
                className="img-fluid mb-2"
                style={{ borderRadius: "10px" }}
              />
              <Link style={{ textDecoration: "none", color: "white" }}>
                <Button variant="light" className="w-100 button2 fw-bold fs-5">
                  Change Photo Profile
                </Button>
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
