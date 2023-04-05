import { useContext, useState } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import jwt from "jwt-decode";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import patient from "../../assets/hanni.webp";
import doctor from "../../assets/doctor.png";
import ImageModal from "./ChangeImage";

export default function Profile() {
  const token = localStorage.getItem("token");
  const tkn = jwt(token);

  const [state, dispatch] = useContext(UserContext);
  const id = state.user.id;

  let { data: userId } = useQuery("userCache", async () => {
    const response = await API.get("/user/" + tkn.id);
    return response.data.data;
  });

  const [modalShowImage, setModalShowImage] = useState(false);

  const [modalShow, setModalShow] = useState(false);
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
                  <span className="fw-bold">{state.user.fullname}</span>
                  <br />
                  <span className="text-secondary-color">Full Name</span>
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
                  <span className="fw-bold">{state.user.email}</span>
                  <br />
                  <span className="text-secondary-color">Email</span>
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
                  <span className="fw-bold">{state.user.listAs}</span>
                  <br />
                  <span className="text-secondary-color">Status</span>
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
                  <span className="fw-bold">{state.user.gender}</span>
                  <br />
                  <span className="text-secondary-color">Gender</span>
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
                  <span className="fw-bold">{state.user.phone}</span>
                  <br />
                  <span className="text-secondary-color">Phone</span>
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
                  <span className="fw-bold">{state.user.address}</span>
                  <br />
                  <span className="text-secondary-color">Address</span>
                </Col>
              </Row>
            </Col>
            <Col md={4}>
              {/* <img
                src="/assets/img/hanni.webp"
                alt="profile"
                className="img-fluid mb-2"
                style={{ borderRadius: "10px" }}
              /> */}
              {state.user.listAs === "patient" ? (
                <img
                  className="img-fluid mb-2"
                  style={{ borderRadius: "10px" }}
                  src={userId?.image ? userId?.image : patient}
                  alt=""
                />
              ) : (
                <img
                  className="img-fluid mb-2"
                  style={{ borderRadius: "10px" }}
                  src={userId?.image ? userId?.image : doctor}
                  alt=""
                />
              )}
              <Link style={{ textDecoration: "none", color: "white" }}>
                <Button
                  variant="light"
                  className="w-100 button2 fw-bold fs-5 mt-3"
                  onClick={() => setModalShowImage(true)}
                >
                  Change Photo Profile
                </Button>
              </Link>
              <ImageModal
                show={modalShowImage}
                onHide={() => setModalShowImage(false)}
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
