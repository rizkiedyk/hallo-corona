import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function InboxAccept() {
  return (
    <>
      <Container>
        <h2 className="fw-bold text-primary-color mt-5">Consultation</h2>
        <Link
          to="/reservation"
          className="d-flex justify-content-end"
          style={{ textDecoration: "none" }}
        >
          <Button variant="light" className="button2 px-3 fw-bold rounded-2">
            Request New Consultation
          </Button>
        </Link>
        <Card style={{ boxShadow: "0 0 5px gray" }} className="my-3">
          <Card.Body className="m-4">
            <Row>
              <Col md={1}>
                <img
                  src="/assets/img/hanni.webp"
                  className="rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    border: "4px solid #FF6185",
                  }}
                  alt="profile"
                />
              </Col>
              <Col md={11}>
                <Row>
                  <Col md={10}>
                    <h5 className="fw-bold">Sakit kepala berlebih</h5>
                    <span className="text-secondary-color">16 April 2020</span>
                  </Col>
                  <Col md={2}>
                    <p className="fw-bold" style={{ fontSize: "15px" }}>
                      17 Mei 2020
                    </p>
                  </Col>
                  <p className="text-secondary-color">
                    Keluhan : Dok kenapa ya disetiap malam kepala saya suka
                    sakit kepa berlebih terlebih lagi kalau tidak mempunyai uang
                  </p>
                </Row>
              </Col>
            </Row>
            <hr />
            <Row className="mx-5">
              <Col md={1}>
                <img
                  src="/assets/img/yeji.jpeg"
                  className="rounded-circle"
                  style={{
                    width: "70px",
                    height: "70px",
                    border: "4px solid #FF6185",
                  }}
                  alt="profile"
                />
              </Col>
              <Col md={11}>
                <p className="text-secondary-color">
                  Hi Radif hari ini adalah jadwal konsultasi kamu, silahkan klik
                  link berikut untuk melakukan konsultasi secara langsung kepada
                  saya :
                </p>
                <p className="text-secondary-color">Dr. Muhammad Rizki </p>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
