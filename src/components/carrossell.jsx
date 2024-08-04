import Carousel from 'react-bootstrap/Carousel';
import img1 from '/carrossell1.png';
import img2 from '/Almochaveiro 7x7cm.png';
import img3 from '/Poliester.png';

function UncontrolledExample() {
  return (
    <div className="container mx-auto">
      <Carousel>
        <Carousel.Item>
          <img
            src={img1}
            alt="Primeiro Slide"
            className="w-full h-[300px] object-cover" // Ajuste a altura conforme necessário
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src={img2}
            alt="Segundo Slide"
            className="w-full h-[300px] object-cover"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src={img3}
            alt="Terceiro Slide"
            className="w-full h-[300px] object-cover"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default UncontrolledExample;
