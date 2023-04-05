import "./App.css";
import Header from "./component/header/Header";
import { Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import DetailArticle from "./pages/DetailArticle";
import Inbox from "./pages/patient/Inbox";
import Profile from "./pages/ProfilePatient";
import AddArticle from "./pages/doctor/AddArticle";
import ReservationData from "./pages/doctor/ReservationData";
import ReservationForm from "./component/reservation/ReservationForm";
import Article from "./component/article/Article";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";
import {
  PrivateRouteDokter,
  PrivateRouteLogin,
  PrivateRoutePatient,
} from "./middleware/PrivateRoute";
import MyArticle from "./pages/doctor/MyArticle";
import EditArticle from "./pages/doctor/EditArticle";
import DetReserv from "./pages/doctor/DetReserv";

function App() {
  let navigate = useNavigate();
  const [state, dispatch] = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // Get user data
      let payload = response.data.data;
      // Get token from local storage
      payload.token = localStorage.token;
      // Send data to useContext
      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
      setIsLoading(false);
    } catch (error) {
      dispatch({
        type: "AUTH_ERROR",
      });
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
      checkUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    // Redirect Auth but just when isLoading is false
    if (!isLoading) {
      if (state.isLogin === false) {
        navigate("/");
      }
    }
  }, [isLoading]);
  return (
    <>
      {isLoading ? null : (
        <>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<DetailArticle />} />
            <Route element={<PrivateRouteLogin />}>
              <Route path="/profile" element={<Profile />} />
              <Route element={<PrivateRoutePatient />}>
                <Route path="/patient/consultation" element={<Inbox />} />{" "}
                <Route
                  path="/consultation-form"
                  element={<ReservationForm />}
                />
              </Route>
              <Route element={<PrivateRouteDokter />}>
                <Route path="/doctor/add-article" element={<AddArticle />} />
                <Route path="/doctor/article" element={<Article />} />
                <Route
                  path="/doctor/reservation-data"
                  element={<ReservationData />}
                />
                <Route
                  path="/doctor/reservation-detail/:id"
                  element={<DetReserv />}
                />
                <Route path="/doctor/my-article" element={<MyArticle />} />
                <Route
                  path="/doctor/edit-article/:id"
                  element={<EditArticle />}
                />
              </Route>
            </Route>
          </Routes>
        </>
      )}
      {/* <Header />
      <Routes>
        <Route path="/" element={<Home />} /> */}
      {/* <Route path="/patient/profile" element={<ProfilePatient />} />
        <Route path="/doctor/profile" element={<ProfileDoctor />} /> */}
      {/* <Route path="/add-article" element={<AddArticle />} />
        <Route path="/inbox" element={<Inbox />} /> */}
      {/* <Route path="/inbox-done" element={<InboxAccept />} /> */}
      {/* <Route path="/sign-in" element={<ModalSignIn />} />
        <Route path="/sign-up" element={<ModalSignUp />} />
        <Route path="/detail-article" element={<DetailArticle />} />
        <Route path="/patient/reservation" element={<ReservationPage />} />
        <Route path="/doctor" element={<ReservationData />} />
      </Routes> */}
    </>
  );
}

export default App;
