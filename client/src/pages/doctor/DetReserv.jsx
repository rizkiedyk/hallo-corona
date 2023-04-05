import React, { useState } from "react";
import {
  Table,
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { API } from "../../config/api";
import { useQuery } from "react-query";
import { useParams, useNavigate } from "react-router-dom";
import moment from "moment";

export default function DetReserv() {
  let { id } = useParams();
  let navigate = useNavigate();

  const [consultation, setConsultation] = useState({});
  const [form, setForm] = useState({
    age: "",
    createdAt: "",
    bornDate: "",
    desc: "",
    fullname: "",
    gender: "",
    height: "",
    weight: "",
    linkLive: "",
    liveConsul: "",
    phone: "",
    reply: "",
    status: "",
    subject: "",
    updatedAt: "",
  });

  let { consultationRefetch } = useQuery("consultationCache", async () => {
    const config = {
      headers: {
        Authorization: "Basic " + localStorage.token,
      },
    };
    const response = await API.get("/consultation/" + id, config);
    setForm({
      id: response.data.data.id,
      age: response.data.data.age,
      createdAt: response.data.data.createdAt,
      bornDate: response.data.data.bornDate,
      desc: response.data.data.desc,
      fullname: response.data.data.fullname,
      gender: response.data.data.gender,
      height: response.data.data.height,
      weight: response.data.data.weight,
      linkLive: response.data.data.linkLive,
      liveConsul: response.data.data.liveConsul,
      phone: response.data.data.phone,
      reply: response.data.data.reply,
      status: response.data.data.status,
      subject: response.data.data.subject,
      updatedAt: response.data.data.updatedAt,
    });
    setConsultation(response.data.data);
  });

  const handleChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = {
        age: form.age,
        createdAt: form.createdAt,
        bornDate: form.bornDate,
        desc: form.desc,
        fullname: form.fullname,
        gender: form.gender,
        height: form.height,
        weight: form.weight,
        linkLive: form.linkLive,
        liveConsul: form.liveConsul,
        phone: form.phone,
        reply: form.reply,
        status: form.status,
        subject: form.subject,
        updatedAt: form.updatedAt,
      };

      const response = await API.patch("/consultation/" + id, data);
      navigate("/doctor/reservation-data");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container className="mt-5">
      <Card className="mt-5 p-5">
        <Card.Header>
          <Row>
            <Col md={8}>
              <h4 style={{ fontWeight: "700" }}>{form?.subject}</h4>
              <p>{form?.desc}</p>
            </Col>
            <Col md={4}>
              <div className="d-flex">
                <div>
                  <img src="/assets/img/bolong.png" alt="" />
                  <br />
                  <img
                    src="/assets/img/garis.png"
                    alt=""
                    className="ms-2 mt-1"
                  />
                  <br />
                  <img src="/assets/img/bolongLive.png" alt="" />
                </div>
                <div className="ms-3">
                  <h5>Date of Complaint</h5>
                  <p className="text-muted">
                    {moment(form?.createdAt).format("DD MMMM YYYY")}
                  </p>
                  <h5>Live Consultation</h5>
                  <p className="text-muted">
                    {moment(form?.liveConsul).format("DD MMMM YYYY")}
                  </p>
                </div>
              </div>
            </Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Table striped variant="light">
            <thead>
              <tr>
                <th>No</th>
                <th>Full Name</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Age</th>
                <th>Height</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-muted">1</td>
                <td className="text-muted">{form?.fullname}</td>
                <td className="text-muted">{form?.gender}</td>
                <td className="text-muted">{form?.phone}</td>
                <td className="text-muted">{form?.age}</td>
                <td className="text-muted">{form?.height}</td>
                <td className="text-muted">{form?.weight}</td>
              </tr>
            </tbody>
          </Table>
          <Form>
            <Form.Group>
              <Form.Label className="fw-bold">Give Response</Form.Label>
              <Form.Control
                name="reply"
                onChange={handleChange}
                value={form?.reply}
                type="text"
                as="textarea"
                rows={7}
                style={{ resize: "none" }}
              />
            </Form.Group>
            {consultation?.reply == "" ? (
              <div className="d-flex">
                <Form.Group className="mb-3 w-50">
                  <Form.Label className="fw-bold m-2">
                    Link Live Consultation
                  </Form.Label>
                  <Form.Control
                    name="linkLive"
                    value={form?.linkLive}
                    onChange={handleChange}
                    type="text"
                    id="linkLive"
                  />
                </Form.Group>

                <Row className="ms-auto mt-5">
                  <Col>
                    <Button
                      onClick={() => navigate("/doctor/reservation-data")}
                      variant="danger"
                      className="fw-bold"
                    >
                      Cancel
                    </Button>
                  </Col>
                  <Col>
                    <Button
                      onClick={handleSubmit}
                      variant="success"
                      className="me-2 fw-bold"
                      type="submit"
                    >
                      Approve
                    </Button>
                  </Col>
                </Row>
              </div>
            ) : (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "34vh" }}
              >
                <h3>
                  THIS RESERVATION FOR CONSULTATION HAS ALREADY BEEN RESPONSED
                </h3>
              </div>
            )}
          </Form>

          {/* {consultation?.reply == "" ? (
            <div className="p-4">
              <h4 style={{ fontWeight: "700", color: "black" }}>
                Give Response
              </h4>
              <Form>
                <Form.Control
                  name="reply"
                  onChange={handleChange}
                  value={form?.reply}
                  type="text"
                  as="textarea"
                  style={{ height: "170px" }}
                />
                <Form.Group className="mb-3">
                  <Form.Label className="label m-2">
                    Link Live Consultation
                  </Form.Label>
                  <Form.Control
                    name="linkLive"
                    type="text"
                    value={form?.linkLive}
                    id="linkLive"
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className="btn-rsv d-flex justify-content-end mt-2">
                  <Button
                    onClick={() => navigate("/doctor")}
                    variant="danger"
                    className="me-4"
                    style={{ fontWeight: "700" }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSubmit}
                    variant="success"
                    className="me-2"
                    style={{ fontWeight: "700" }}
                    type="submit"
                  >
                    Approve
                  </Button>
                </div>
              </Form>
            </div>
          ) : (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "34vh" }}
            >
              <h3>
                THIS RESERVATION FOR CONSULTATION HAS ALREADY BEEN RESPONSED
              </h3>
            </div>
          )} */}
        </Card.Body>
      </Card>
    </Container>
  );
}
