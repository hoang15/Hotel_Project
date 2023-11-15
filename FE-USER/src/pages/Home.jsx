import { Col, Container, Row } from "react-bootstrap";
import homeStyles from "../css/home.module.css";
import img4 from "../assets/khach-san-sheraton-hanoi-ho-tay.jpg";
import img5 from "../assets/sheraton-hanoi-club-lounge.webp";
import Slider from "../component/Slider";
import Gallery from "../component/Gallery";
import Footer from "../component/Footer";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserInfo from "./../hooks/useUserInfo";
import { Dropdown } from "antd";
import { AUTH_TOKEN } from "../utils/constants";
import authService from "../services/Auth.service";
const Home = () => {
  const serviceRef = useRef(null);
  const galleryRef = useRef(null);
  const introduceRef = useRef(null);
  const userInfo = useUserInfo();
  const token = localStorage.getItem(AUTH_TOKEN);
  const navigate = useNavigate();

  const scrollTo = (ref) => {
    if (ref.current) {
      window.scrollTo({
        behavior: "smooth",
        top: ref.current.offsetTop,
      });
    }
  };
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
  return (
    <div>
      <div className={homeStyles.containerHeader}>
        <div className={homeStyles.containerHeaderNav}>
          <h1 className={homeStyles.text}>Hanoi Hotel</h1>
          <Row className={homeStyles.nav}>
            <Col className={homeStyles.navItem}>
              <a href="#Introduce" onClick={() => scrollTo(introduceRef)}>
                Introduce
              </a>
            </Col>
            <Col className={homeStyles.navItem}>
              <Link to={"/rooms"}>Rooms & Suites</Link>
            </Col>
            <Col className={homeStyles.navItem}>
              <a href="#Service" onClick={() => scrollTo(serviceRef)}>
                Service
              </a>
            </Col>
            <Col className={homeStyles.navItem}>
              <a href="#Gallery" onClick={() => scrollTo(galleryRef)}>
                Gallery
              </a>
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
      <Slider />
      <Container
        id="#Introduce"
        ref={introduceRef}
        className={homeStyles.containerIntroduce}
      >
        <Row>
          <Col>
            <span className={homeStyles.nameHotel}>KHÁCH SẠN BÊN HỒ TÂY</span>
            <div className={homeStyles.title}>
              TẬN HƯỞNG TRẢI NGHIỆM NGHỈ DƯỠNG ĐẲNG CẤP
            </div>
          </Col>
          <Col>
            <p className={homeStyles.content}>
              Khách sạn Sheraton Hanoi tọa lạc bên hồ Tây, cách sân bay quốc tế
              Nội Bài chỉ 20 phút đi xe. Không chỉ là khách sạn 5 sao gần sân
              bay nhất, du khách còn có thể dễ dàng di chuyển từ đây tới khu phố
              cổ Hà Nội, các địa điểm tham quan nổi tiếng nhộn nhịp chỉ trong
              vài phút.
            </p>
            <p style={{ marginTop: "20px" }} className={homeStyles.content}>
              Tất cả 299 phòng nghỉ của khách sạn có hướng nhìn bao quát Hồ Tây
              và Sông Hồng. Khám phá nét đặc sắc của ẩm thực địa phương hay
              những nét mới lạ của ẩm thực đương đại tại một trong 4 nhà hàng
              của khách sạn. Thưởng thức bữa tiệc buffet thịnh soạn, nổi bật với
              các món hải sản cao cấp tại nhà hàng Oven D or. Hay trải nghiệm
              bữa tối sang trọng tại nhà hàng gọi món Hemispheres Steak &
              Seafood Grill với các món bít tết, thịt nướng và hải sản được chế
              biến tinh tế. Khi du khách cần tiếp thêm năng lượng, hãy dành thời
              gian tập luyện tại phòng tập mở cửa 24/7, hay thư giãn với các
              dịch vụ tại trung tâm chăm sóc sức khỏe, bể sục hoặc bể bơi ngoài
              trời của chúng tôi.
            </p>
          </Col>
          <Col>
            <img src={img4} alt="" />
          </Col>
        </Row>
      </Container>
      <div id="#Service" ref={serviceRef} className={homeStyles.service}>
        <div className={homeStyles.serviceHolder}>
          <div className={homeStyles.imageSection}>
            <img className={homeStyles.img5} src={img5} alt="" />
          </div>
          <div className={homeStyles.contentSection}>
            <span className={homeStyles.nameHotel}>DỊCH VỤ VÀ TIỆN ÍCH</span>
            <div className={homeStyles.listService}>
              <p className={homeStyles.listItem}>
                <i className="fa-regular fa-circle-right"></i> Sheraton Club
                Lounge
              </p>
              <p className={homeStyles.listItem}>
                {" "}
                <i className="fa-regular fa-circle-right"></i> Dịch vụ giặt là
              </p>
              <p className={homeStyles.listItem}>
                {" "}
                <i className="fa-regular fa-circle-right"></i> Nhà hàng phục vụ
                buffet Oven Dor
              </p>
              <p className={homeStyles.listItem}>
                <i className="fa-regular fa-circle-right"></i> Nhà hàng phục vụ
                thực đơn gọi món cao cấp Hemispheres Steak and Seafood Grill
              </p>
              <p className={homeStyles.listItem}>
                {" "}
                <i className="fa-regular fa-circle-right"></i> Kết nối WiFi miễn
                phí
              </p>
              <p className={homeStyles.listItem}>
                {" "}
                <i className="fa-regular fa-circle-right"></i> Dịch vụ hỗ trợ
                khách hàng 24/7
              </p>
              <p className={homeStyles.listItem}>
                {" "}
                <i className="fa-regular fa-circle-right"></i> Phòng tập thể dục
                24/7
              </p>
              <p className={homeStyles.listItem}>
                {" "}
                <i className="fa-regular fa-circle-right"></i> Dịch vụ văn phòng
              </p>
            </div>
          </div>
        </div>
      </div>
      <Gallery ref={galleryRef} />
      <Footer />
    </div>
  );
};

export default Home;
