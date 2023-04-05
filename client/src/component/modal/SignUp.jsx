import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import Swal from "sweetalert2";
// import { Link } from "react-router-dom";

function ModalSignUp(props) {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
    listAs: "",
    gender: "",
    phone: "",
    address: "",
  });

  const {
    fullName,
    username,
    email,
    password,
    listAs,
    gender,
    phone,
    address,
  } = form;

  const regListAs = [
    {
      value: "",
      text: "-- Choose an option --",
    },
    {
      value: "patient",
      text: "Patient",
    },
    {
      value: "doctor",
      text: "Doctor",
    },
  ];

  const genderList = [
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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const response = await API.post("/register", form);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Register Success",
        showConfirmButton: false,
        timer: 1500,
      });

      setForm({
        fullName: "",
        username: "",
        email: "",
        password: "",
        listAs: "",
        gender: "",
        phone: "",
        address: "",
      });
    } catch (e) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Register Failed",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("register failed : ", e);
    }
    props.handleCloseSignUp();
  });

  return (
    <>
      <Modal show={props.showSignUp} onHide={props.handleCloseSignUp}>
        <Modal.Title className="fw-bold d-flex justify-content-center py-5 fs-1">
          Sign Up
        </Modal.Title>
        <Modal.Body className="px-5">
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
            <Form.Group className="mb-3" controlId="formBasicFullName">
              <Form.Label className="fw-bold fs-5">Full Name</Form.Label>
              <Form.Control
                name="fullName"
                type="text"
                value={fullName}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label className="fw-bold fs-5">Username</Form.Label>
              <Form.Control
                name="username"
                type="text"
                value={username}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className="fw-bold fs-5">Email</Form.Label>
              <Form.Control
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fw-bold fs-5">Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                min={6}
                value={password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label className="fw-bold fs-5">List As</Form.Label>
              <Form.Select name="listAs" value={listAs} onChange={handleChange}>
                {regListAs.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicGender">
              <Form.Label className="fw-bold fs-5">Gender</Form.Label>
              <Form.Select name="gender" value={gender} onChange={handleChange}>
                {genderList.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.text}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPhone">
              <Form.Label className="fw-bold fs-5">Phone</Form.Label>
              <Form.Control
                name="phone"
                type="number"
                value={phone}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicAddress">
              <Form.Label className="fw-bold fs-5">Address</Form.Label>
              <Form.Control
                name="address"
                as="textarea"
                rows={4}
                value={address}
                onChange={handleChange}
                required
                style={{ resize: "none" }}
              />
            </Form.Group>
            <Button
              type="submit"
              variant="light"
              className="w-100 button2 fw-bold fs-5 mt-3"
            >
              Sign up
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalSignUp;
