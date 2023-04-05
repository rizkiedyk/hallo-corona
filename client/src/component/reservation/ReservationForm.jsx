import { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../../config/api";

export default function ReservationForm() {
  let navigate = useNavigate();

  const regGender = [
    {
      value: "",
      text: "-- Choose your gender --",
    },
    {
      value: "Male",
      text: "Male",
    },
    {
      value: "Female",
      text: "Female",
    },
  ];

  const [form, setForm] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      // Configuration Content-type
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body
      const formData = new FormData();
      formData.set("fullname", form.fullname);
      formData.set("phone", form.phone);
      formData.set("bornDate", form.bornDate);
      formData.set("age", form.age);
      formData.set("height", form.height);
      formData.set("weight", form.weight);
      formData.set("gender", form.gender);
      formData.set("subject", form.subject);
      formData.set("liveConsul", form.liveConsul);
      formData.set("desc", form.desc);

      // Insert data user to database
      const response = await API.post("/consultation", formData, config);
      navigate("/patient/consultation");
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <Container>
      <h2 className="fw-bold text-primary-color mt-5">
        Reservasi Consultation
      </h2>
      <Form className="my-4" onSubmit={(e) => handleSubmit.mutate(e)}>
        <Form.Group className="mb-3" controlId="formBasicFullName">
          <Form.Label className="fw-bold">Full Name</Form.Label>
          <Form.Control
            type="text"
            name="fullname"
            value={form.fullname}
            onChange={handleChange}
            className="bg-input-form"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label className="fw-bold">Phone</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="bg-input-form"
          />
        </Form.Group>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formBasicBornDate">
              <Form.Label className="fw-bold">Born Date</Form.Label>
              <Form.Control
                type="date"
                name="bornDate"
                value={form.bornDate}
                onChange={handleChange}
                className="bg-input-form"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label className="fw-bold">Age</Form.Label>
              <Form.Control
                type="number"
                name="age"
                value={form.age}
                onChange={handleChange}
                className="bg-input-form"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group className="mb-3" controlId="formBasicHeight">
              <Form.Label className="fw-bold">Height</Form.Label>
              <Form.Control
                type="number"
                name="height"
                value={form.height}
                onChange={handleChange}
                className="bg-input-form"
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group className="mb-3" controlId="formBasicWeight">
              <Form.Label className="fw-bold">Weight</Form.Label>
              <Form.Control
                type="number"
                name="weight"
                value={form.weight}
                onChange={handleChange}
                className="bg-input-form"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3" controlId="formBasicPhone">
          <Form.Label className="fw-bold">Gender</Form.Label>
          <Form.Select
            value={form.gender}
            onChange={handleChange}
            name="gender"
            className="bg-input-form"
          >
            {regGender.map((item) => (
              <option key={item.value} value={item.value}>
                {item.text}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicSubject">
          <Form.Label className="fw-bold">Subject</Form.Label>
          <Form.Control
            type="text"
            name="subject"
            value={form.subject}
            onChange={handleChange}
            className="bg-input-form"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDate">
          <Form.Label className="fw-bold">Live Consultation Date</Form.Label>
          <Form.Control
            type="date"
            name="liveConsul"
            value={form.liveConsul}
            onChange={handleChange}
            className="bg-input-form"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicDescription">
          <Form.Label className="fw-bold">Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={7}
            name="desc"
            value={form.desc}
            onChange={handleChange}
            style={{ resize: "none" }}
            className="bg-input-form"
          />
        </Form.Group>
        <Link
          className="d-flex justify-content-center"
          style={{ textDecoration: "none" }}
        >
          <Button
            className="button2 fw-bold"
            onClick={(e) => handleSubmit.mutate(e)}
          >
            Send
          </Button>
        </Link>
      </Form>
    </Container>
  );
}
