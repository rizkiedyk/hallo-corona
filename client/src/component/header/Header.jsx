import React, { useContext, useEffect, useState } from "react";
import { Container, Navbar, Nav, Button, NavDropdown } from "react-bootstrap";
import ModalSignUp from "../modal/SignUp";
import ModalSignIn from "../modal/SignIn";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/userContext";
import { API, setAuthToken } from "../../config/api";
import { useQuery } from "react-query";
import Swal from "sweetalert2";

function Header() {
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  const navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  let { data: user } = useQuery("userCache", async () => {
    const response = await API.get("/users");
    return response.data.data;
  });

  useEffect(() => {
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      // get user data
      let payload = response.data.data;
      // get token from loccal storage
      payload.token = localStorage.token;
      // send data to use context
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      console.log("check user failed :", error);
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Logout Success",
      showConfirmButton: false,
      timer: 1800,
    });
    navigate("/");
    // window.location.reload();
  };

  const handleCloseSignUp = () => setShowSignUp(false);
  const handleShowSignUp = () => {
    setShowSignIn(false);
    setShowSignUp(true);
  };

  const handleCloseSignIn = () => setShowSignIn(false);
  const handleShowSignIn = () => setShowSignIn(true);

  return (
    <>
      {isLoading ? null : (
        <>
          <Navbar bg="light" expand="lg" className="shadow">
            <Container>
              <Navbar.Brand href="/">
                <img src="/assets/img/IconNavbar.png" alt="" />
              </Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                {state.isLogin ? (
                  <Nav className="ms-auto">
                    <NavDropdown
                      id="dropdown"
                      title={
                        <img
                          src="/assets/img/newpro.png"
                          className="nav-profile-image me-auto"
                          alt="profile"
                        />
                      }
                    >
                      <NavDropdown.Item href="/profile">
                        <img
                          alt="icon"
                          src="/assets/img/user.png"
                          className="nav-dropdown-img"
                        />{" "}
                        Profile
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      {state.user.listAs === "doctor" ? (
                        <>
                          <NavDropdown.Item href="/doctor/add-article">
                            <img
                              alt="icon"
                              src="/assets/img/article.png"
                              className="nav-dropdown-img"
                            />{" "}
                            Add Article
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="/doctor/my-article">
                            <img
                              alt="icon"
                              src="/assets/img/article.png"
                              className="nav-dropdown-img"
                            />{" "}
                            My Article
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="/doctor/reservation-data">
                            <img
                              alt="icon"
                              src="/assets/img/article.png"
                              className="nav-dropdown-img"
                            />{" "}
                            List Reservation
                          </NavDropdown.Item>
                        </>
                      ) : (
                        <NavDropdown.Item href="/patient/consultation">
                          <img
                            alt="icon"
                            src="/assets/img/consul.png"
                            className="nav-dropdown-img"
                          />{" "}
                          Consultation
                        </NavDropdown.Item>
                      )}
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="/" onClick={logout}>
                        <img
                          alt="icon"
                          src="/assets/img/logout.png"
                          className="nav-dropdown-img"
                        />{" "}
                        Logout
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                    </NavDropdown>
                  </Nav>
                ) : (
                  <Nav className=" w-50 ms-auto">
                    <Nav.Link
                      href="#"
                      className="w-25 ms-auto"
                      onClick={handleShowSignUp}
                    >
                      <Button variant="light" className="w-100 button1">
                        Sign up
                      </Button>
                    </Nav.Link>

                    <Nav.Link
                      href="#"
                      className="w-25"
                      onClick={handleShowSignIn}
                    >
                      <Button variant="light" className="w-100 button2">
                        Sign in
                      </Button>
                    </Nav.Link>
                  </Nav>
                )}
              </Navbar.Collapse>
            </Container>
          </Navbar>

          <ModalSignUp
            showSignUp={showSignUp}
            handleCloseSignUp={handleCloseSignUp}
          />

          <ModalSignIn
            showSignIn={showSignIn}
            handleCloseSignIn={handleCloseSignIn}
            switch={handleShowSignUp}
          />
        </>
      )}
    </>
  );
}
export default Header;
