import { Col, Container, Row } from "react-bootstrap";
import homeStyles from "../css/home.module.css";
import { useEffect, useRef, useState } from "react";
import galleryService from "../services/gallery.service";

const Gallery = () => {
  const [galeres, setGaleres] = useState([]);
  const galleryRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await galleryService.search({ page: 1, perPage: 50 });

        setGaleres(result.data.items);
        console.log(result.data.items);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    <div id="Gallery" ref={galleryRef}>
      <Container className={homeStyles.gallery}>
        <span className={homeStyles.galleryTitle}>Thư viện ảnh</span>
        <p className={homeStyles.galleryContent}>
          Khám phá trải nghiệm nghỉ dưỡng, ẩm thực tại khách sạn Sheraton Hanoi.
        </p>
        <Row>
          {galeres.map((gallery) => (
            <Col key={gallery.id}>
              <img className={homeStyles.img} src={gallery.image} />
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Gallery;
