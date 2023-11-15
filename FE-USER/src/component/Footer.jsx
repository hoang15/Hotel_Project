import footerStyle from "../css/home.module.css";

const Footer = () => {
  return (
    <div className={footerStyle.footer}>
      <p className={footerStyle.name}>Khách sạn Sheraton Hanoi</p>
      <p className={footerStyle.address}>
        K5 Nghi Tam, 11 Xuan Dieu, Tay Ho, Ha Noi, 10000
      </p>
      <span>Điện thoại: 8424 3719 9000 </span>
      <i className={`${footerStyle.icon} fa-sharp fa-solid fa-circle`}></i>
      <span>Fax: 8424 3719 9001</span>
      <i className={`${footerStyle.icon} fa-sharp fa-solid fa-circle`}></i>
      <span> Email: reservations.01484@marriott.com</span>
      <div style={{ marginTop: "30px" }}>
        <i
          style={{ fontSize: "28px", paddingInline: "20px" }}
          className="fa-brands fa-facebook-f"
        ></i>
        <i style={{ fontSize: "32px" }} className="fa-brands fa-instagram"></i>
      </div>
    </div>
  );
};

export default Footer;
