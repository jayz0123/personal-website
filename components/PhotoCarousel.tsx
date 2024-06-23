import Photo from './Photo';

export default function PhotoCarousel() {
  return (
    <div className="carousel carousel-center glass p-4 space-x-8 rounded-box">
      <div className="carousel-item">
        <Photo src="/japan/JHZ08604.JPG" />
      </div>
      <div className="carousel-item">
        <Photo src="/japan/DSCF0567.JPG" />
      </div>
      <div className="carousel-item">
        <Photo src="/japan/DSCF0595.JPG" />
      </div>
      <div className="carousel-item">
        <Photo src="/japan/JHZ08604.JPG" />
      </div>
    </div>
  );
}
