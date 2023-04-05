import { useContext } from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import moment from "moment";
import doctor from "../../assets/doctor.png";

export default function Inbox() {
  const [state, dispatch] = useContext(UserContext);

  let id = state.user.id;

  let { data: consultations } = useQuery("cacheConsultations", async () => {
    const response = await API.get("/consultations/" + id);
    return response.data.data;
  });

  return (
    <>
      {consultations?.length != 0 ? (
        <Container>
          <h2 className="fw-bold text-primary-color mt-5">Consultation</h2>
          <Link
            to="/consultation-form"
            className="d-flex justify-content-end"
            style={{ textDecoration: "none" }}
          >
            <Button variant="light" className="button2 px-3 fw-bold rounded-2">
              Request New Consultation
            </Button>
          </Link>
          {consultations?.map((item, index) => (
            <Card
              style={{ boxShadow: "0 0 5px gray" }}
              className="my-3"
              key={index}
            >
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
                        <h5 className="fw-bold">{item?.subject}</h5>
                        <span className="text-secondary-color">
                          {moment(item?.createdAt).format("DD MMMM YYYY")}
                        </span>
                      </Col>
                      <Col md={2}>
                        <p className="fw-bold" style={{ fontSize: "15px" }}>
                          {moment(item?.liveConsul).format("DD MMMM YYYY")}
                        </p>
                      </Col>
                      <p className="text-secondary-color">{item?.desc}</p>
                    </Row>
                  </Col>
                </Row>
                <hr />
                {item?.reply == "" ? (
                  <Card.Footer className="text-muted">
                    <div className="d-flex justify-content-center align-items-center p-4">
                      <h4 style={{ fontWeight: "700" }}>Waiting For Reply</h4>
                    </div>
                  </Card.Footer>
                ) : (
                  <Card.Footer>
                    <div className="d-flex justify-content-center align-items-center gap-5">
                      <div>
                        <img
                          className="rounded-circle"
                          src={doctor}
                          alt="Doctor"
                          style={{
                            width: "55px",
                            height: "55px",
                            border: "3px solid #ff6185",
                          }}
                        />
                      </div>
                      <div className="inboxfoot-right mt-3">
                        {item?.reply} :
                        <a
                          href={`${item?.linkLive}`}
                          target="_blank"
                          rel="noreferrer"
                          className="ms-2"
                        >
                          Here
                        </a>
                        <p className="mt-2">Dr.Rizki</p>
                      </div>
                    </div>
                  </Card.Footer>
                )}
                {/* <Row className="mx-5">
                  <h4 className="text-center text-secondary-color fw-bold">
                    Waiting for reply
                  </h4>
                </Row> */}
              </Card.Body>
            </Card>
          ))}
        </Container>
      ) : (
        <>
          <h2 className="fw-bold text-primary-color mt-5">Consultation</h2>
          <Link
            to="/consultation-form"
            className="d-flex justify-content-end"
            style={{ textDecoration: "none" }}
          >
            <Button variant="light" className="button2 px-3 fw-bold rounded-2">
              Request New Consultation
            </Button>
          </Link>
        </>
      )}
    </>
  );
}
