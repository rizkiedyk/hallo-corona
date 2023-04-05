import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API, setAuthToken } from "../../config/api";
import { UserContext } from "../../context/userContext";

function ModalSignIn(props) {
  let navigate = useNavigate();

  const [_, dispatch] = useContext(UserContext);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = form;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();

      let config = {
        header: {
          "Content-Type": "application/json",
        },
      };

      const response = await API.post("/login", form, config);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Login Success",
        showConfirmButton: false,
        timer: 1500,
      });

      // Send data to useContext
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: response.data.data,
      });

      setAuthToken(response.data.data.token);
      if (response.data.data.listAs === "doctor") {
        navigate("/doctor/reservation-data");
      } else {
        navigate("/");
      }
    } catch (e) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Login Failed",
        showConfirmButton: false,
        timer: 1500,
      });
      // console.log("login failed: " + e)
    }
    props.handleCloseSignIn();
  });
  return (
    <>
      <Modal show={props.showSignIn} onHide={props.handleCloseSignIn} centered>
        <Modal.Title className="fw-bold d-flex justify-content-center py-5 fs-1">
          Sign In
        </Modal.Title>
        <Modal.Body className="px-5">
          <Form onSubmit={(e) => handleSubmit.mutate(e)}>
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
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className="fw-bold fs-5">Password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Button
              variant="light"
              type="submit"
              className="w-100 button2 fw-bold fs-5 mt-3"
            >
              Sign in
            </Button>
            <div className="d-flex justify-content-center mt-3 w-100">
              <p className="text-secondary">
                Don't have an account? Click&nbsp;
                <Link
                  to="#"
                  onClick={props.switch}
                  className="text-decoration-none text-secondary fw-bold"
                >
                  Here
                </Link>
              </p>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalSignIn;
