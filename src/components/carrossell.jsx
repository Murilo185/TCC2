import Carousel from 'react-bootstrap/Carousel';
import img1 from '/carrossell1.jpg';
import img2 from '/carrossell1.png';
import img3 from '/agendacarrossell1.jpg';

function UncontrolledExample() {
  return (
    <div className=" container mx-auto ">
      <Carousel data-bs-theme="dark" slide={true} interval={3500}>
        
        <Carousel.Item>
          <div className='w-[50%] h-[300px] bg-slate-800 mx-auto object-cover' style={{ backgroundImage: `url(${img1})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} >

          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className='w-[50%] h-[300px] bg-slate-800 mx-auto object-cover' style={{ backgroundImage: `url(${img2})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} >

          </div>
        </Carousel.Item>

        <Carousel.Item>
          <div className='w-[50%] h-[300px] bg-slate-800 mx-auto object-cover' style={{ backgroundImage: `url(${img3})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' }} >

          </div>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default UncontrolledExample;
