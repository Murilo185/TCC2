import Carousel from 'react-bootstrap/Carousel';
import img1 from '../assets/carrossell1.png';
import img2 from '../assets/almochaveiro.png'
import img3 from '../assets/camisa.png'
import './carrosell.css'

function UncontrolledExample() {
  return (
    <div id="slider-containner">
      <Carousel>
      <Carousel.Item>
        <img
          src={img1}
          alt="Primeiro Slide"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          src={img2}
          alt="Primeiro Slide"
        />

      </Carousel.Item>

      <Carousel.Item>
        <img
          src={img3}
          alt="Primeiro Slide"
        />

      </Carousel.Item>

      </Carousel>
    </div>
  );
}

export default UncontrolledExample;