import { Col, Container, Row } from "react-bootstrap";
import homeStyles from "../css/home.module.css";
import detailStyle from "../css/detail.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import { AUTH_TOKEN } from "../utils/constants";
import authService from "../services/Auth.service";
import { Dropdown } from "antd";
import useUserInfo from "../hooks/useUserInfo";
import { useEffect, useState } from "react";
import roomService from "../services/room.service";
import Footer from "../component/Footer";
import bookingService from "../services/booking.service";
import { useFormik } from "formik";
import * as yup from "yup";

const RoomDetail = () => {
  const [room, setRoom] = useState();
  const token = localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate();
  const userInfo = useUserInfo();
  const { id } = useParams();

  const Logout = async () => {
    await authService.signOut();
    navigate("/");
  };
  const items = [
    {
      key: "1",
      label: <Link to={"/bookingInformation"}>Booking information</Link>,
    },
    {
      key: "2",
      danger: true,
      label: (
        <div onClick={Logout} style={{ display: "flex", alignItems: "center" }}>
          <i className="fa-solid fa-right-from-bracket"> </i>
          <p style={{ marginLeft: "5px" }}>Logout</p>
        </div>
      ),
    },
  ];
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await roomService.read(id);
        setRoom(result.data);
        console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [id]);
  const formik = useFormik({
    initialValues: {
      checkInTime: "",
      checkOutTime: "",
    },
    validationSchema: yup.object({
      checkInTime: yup.string().required("required!"),
      checkOutTime: yup.string().required("required!"),
    }),
    onSubmit: async (values) => {
      const Booking = {
        users: userInfo?.id,
        rooms: room?.id,
        checkInTime: values.checkInTime,
        checkOutTime: values.checkOutTime,
      };
      try {
        await bookingService.create(Booking);
        location.reload();
      } catch (err) {
        console.log(err);
      }
    },
  });
  return (
    <div>
      <div className={homeStyles.containerHeader}>
        <div className={homeStyles.containerHeaderNav}>
          <h1 className={homeStyles.text}>Hanoi Hotel</h1>
          <Row className={homeStyles.nav}>
            <Col className={homeStyles.navItem}>
              <Link to="/">Introduce</Link>
            </Col>
            <Col className={homeStyles.navItem}>
              <Link to={"/rooms"}>Rooms & Suites</Link>
            </Col>
            <Col className={homeStyles.navItem}>
              <Link to={"/"}>Service</Link>
            </Col>
            <Col className={homeStyles.navItem}>
              <Link to={"/"}>Gallery</Link>
            </Col>
            {token ? (
              <Col className={homeStyles.navItem}>
                <Dropdown menu={{ items }}>
                  <div className={homeStyles.navItem}>
                    <i
                      className={`${homeStyles.iconUser} fa-regular fa-user`}
                    ></i>
                    <div style={{ cursor: "pointer" }}>{userInfo?.email}</div>
                  </div>
                </Dropdown>
              </Col>
            ) : (
              <Col className={homeStyles.navItem}>
                <Link to={"/login"}>Login</Link>
              </Col>
            )}
          </Row>
        </div>
      </div>
      <Container style={{ marginBottom: "80px" }}>
        <img src={room?.image}></img>
        <p className={detailStyle.title}>Kind of room: {room?.kindOfRoom}</p>
        <p className={detailStyle.title}>Price: {room?.price} VND</p>
        <p className={detailStyle.title}>Type of bed: {room?.typeOfBed}</p>
        <p className={detailStyle.introduce}>{room?.introduce}</p>
        <form
          action=""
          onSubmit={formik.handleSubmit}
          style={{ marginTop: "30px" }}
        >
          <label htmlFor="checkIn" style={{ fontSize: "20px" }}>
            Check in:
          </label>
          <input
            style={{ fontSize: "20px", marginLeft: "10px" }}
            type="date"
            name="checkIn"
            value={formik.values.checkInTime}
            onChange={(e) =>
              formik.setFieldValue("checkInTime", e.target.value)
            }
          />
          {formik.errors.checkInTime && formik.touched.checkInTime && (
            <div style={{ marginTop: "5px" }}>{formik.errors.checkInTime}</div>
          )}
          <label
            style={{ fontSize: "20px", marginLeft: "20px" }}
            htmlFor="checkOut"
          >
            Check out:
          </label>
          <input
            style={{ fontSize: "20px", marginLeft: "10px" }}
            type="date"
            name="checkOut"
            value={formik.values.checkOutTime}
            onChange={(e) =>
              formik.setFieldValue("checkOutTime", e.target.value)
            }
          />
          {formik.errors.checkOutTime && formik.touched.checkOutTime && (
            <div style={{ marginTop: "5px" }}>{formik.errors.checkOutTime}</div>
          )}
          <div style={{ marginTop: "20px" }}>
            <button style={{ padding: "10px", width: "518px" }}>Booking</button>
          </div>
        </form>
      </Container>
      <Footer />
    </div>
  );
};

export default RoomDetail;
