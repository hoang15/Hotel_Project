import { Col, Container, Row } from "react-bootstrap";
import homeStyles from "../css/home.module.css";
import roomStyles from "../css/rooms.module.css";
import { Link, useNavigate } from "react-router-dom";
import { AUTH_TOKEN } from "../utils/constants";
import authService from "../services/Auth.service";
import { Dropdown, Input, Pagination } from "antd";
import useUserInfo from "../hooks/useUserInfo";
import { useEffect, useState } from "react";
import roomService from "../services/room.service";
import Footer from "../component/Footer";
const Room = () => {
  const [rooms, setRooms] = useState([]);
  const token = localStorage.getItem(AUTH_TOKEN);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const userInfo = useUserInfo();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const pageSize = 1;
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
        let result;
        if (search) {
          result = await roomService.searchName(search);
        } else {
          result = await roomService.search({
            page: currentPage,
            perPage: pageSize,
          });
        }
        setTotalItems(result.data.totalPages);
        setRooms(result.data.items);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [search, currentPage]);
  const handlePageChange = async (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className={homeStyles.containerHeader}>
        <div className={homeStyles.containerHeaderNav}>
          <h1 className={homeStyles.text}>Hanoi Hotel</h1>
          <Row className={homeStyles.nav}>
            <Col className={homeStyles.navItem}>
              <Link to="/">Introduce</Link>
            </Col>
            <Col className={homeStyles.navItem}>Rooms & Suites</Col>
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

      <div className={roomStyles.container}>
        <Container>
          <h1 className={roomStyles.Accommodations}>Accommodations</h1>
          <p className={roomStyles.content}>
            All of our 29 rooms, including 16 suites, feature traditional décor,
            upgraded amenities and large windows with West Lake or Red River
            views. Vietnamese and French colonial touches, plus high ceilings,
            add to the sense of spaciousness and invite guests to linger. If you
            are in Hanoi for business, appreciate the expansive work desks in
            every room and suite. Enjoy our complimentary high-speed Wi-Fi, as
            well as telephones with international access, ensuring you stay
            connected when it matters most. Thoughtful amenities abound our
            hotel rooms and suites, including 32-inch flat-screen TVs,
            individual climate control, coffee makers and fully stocked
            minibars. Find Le Grand Bain amenities in your marble bathroom that
            turn every visit into a spa-like haven. Our Sheraton Signature Sleep
            Experience bed, featuring crisp white linens, envelops you fully at
            the end of a long day in Hanoi.
          </p>
        </Container>
      </div>
      <Input
        className={roomStyles.search}
        type="search"
        placeholder="Search by room type ..."
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <Container style={{ marginTop: "100px", marginBottom: "70px" }}>
        <Row style={{ gap: "30px", justifyContent: "center" }}>
          {rooms.map((room) => (
            <Col
              className={roomStyles.item}
              sm={4}
              key={room.id}
              style={{
                backgroundImage: `url(${room.image})`,
                backgroundSize: "cover",
                height: "380px",
                width: "600px",
                borderRadius: "15px",
              }}
            >
              <div className={roomStyles.contentImg}>
                <p>
                  {room.kindOfRoom}, {room.typeOfBed}
                </p>
                <Link to={`/room/${room.id}`}>View More</Link>
              </div>
            </Col>
          ))}
        </Row>
        <Pagination
          className={roomStyles.Pagination}
          current={currentPage}
          total={totalItems * pageSize}
          pageSize={pageSize}
          onChange={handlePageChange}
        />
      </Container>
      <Footer />
    </div>
  );
};

export default Room;
