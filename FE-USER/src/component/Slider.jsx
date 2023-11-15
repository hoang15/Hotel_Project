import homeStyles from "../css/home.module.css";
import { Carousel } from "antd";
import img1 from "../assets/khach-san-sheraton-hanoi-mon-an.webp";
import img2 from "../assets/phong-khach-san-sheraton-hanoi.webp";
import img3 from "../assets/vuon-ven-ho-sheraton-hanoi-tay-ho.jpg";
const Slider = () => {
  return (
    <div>
      <Carousel autoplay className={homeStyles.Carousel}>
        <div>
          <img src={img1} alt="" />
        </div>
        <div>
          <img src={img2} alt="" />
        </div>
        <div>
          <img src={img3} alt="" />
        </div>
      </Carousel>
    </div>
  );
};

export default Slider;
