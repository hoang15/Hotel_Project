import { useEffect, useState } from "react";
import bookingService from "../services/booking.service";
import useUserInfo from "../hooks/useUserInfo";
import { AUTH_TOKEN } from "../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { Col, Container, Row } from "react-bootstrap";
import homeStyles from "../css/home.module.css";
import authService from "../services/Auth.service";
import { Dropdown } from "antd";
import Card from "react-bootstrap/Card";
const BookingInformation = () => {
  const [informations, setInformations] = useState([]);
  const token = localStorage.getItem(AUTH_TOKEN);
  const user = useUserInfo();
  const navigate = useNavigate();

  const Logout = async () => {
    await authService.signOut();
    navigate("/");
  };
  const items = [
    {
      key: "1",
      label: <p>Information</p>,
    },
    {
      key: "2",
      label: <Link to={"/bookingInformation"}>Booking information</Link>,
    },
    {
      key: "3",
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
        const result = await bookingService.list();
        const userEmail = user?.email;

        if (userEmail) {
          const filteredItems = result.data.items.filter((item) => {
            return item.expand.users.email === userEmail;
          });

          setInformations(filteredItems);
          console.log(filteredItems);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [user?.email]);

  return (
    <div>
      <div className={homeStyles.containerHeader}>
        <div className={homeStyles.containerHeaderNav}>
          <h1 className={homeStyles.text}>Hanoi Hotel</h1>
          <Row className={homeStyles.nav}>
            <Col className={homeStyles.navItem}>
              <Link to={"/"}>Introduce</Link>
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
                    <div style={{ cursor: "pointer" }}>{user?.email}</div>
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
      <div style={{ marginTop: "200px" }}>
        <Container>
          <Row sm={4}>
            {informations.map((information) => {
              const formattedCheckInDate = new Date(
                information.checkInTime
              ).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });

              const formattedCheckOutDate = new Date(
                information.checkOutTime
              ).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              });
              return (
                <Col key={information.id}>
                  <Card bg="success" text="white" className="mb-5">
                    <Card.Body>
                      <Card.Title>
                        Kind Of Room: {information.expand.rooms.kindOfRoom}
                      </Card.Title>
                      <Card.Text>
                        <div>{information.expand.rooms.typeOfBed}</div>
                        <div style={{ marginTop: "8px" }}>
                          Price: {information.expand.rooms.price}VND
                        </div>
                        <div style={{ marginTop: "8px" }}>
                          Check in time: {formattedCheckInDate}
                        </div>
                        <div style={{ marginTop: "8px" }}>
                          Check out time: {formattedCheckOutDate}
                        </div>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default BookingInformation;
