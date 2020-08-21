import React from 'react';
import CarouselPage from '../components/carousel';
import {Link} from 'react-router-dom';


function Homepage(props) {
  return (
    <>
    <div className="container home">
    <CarouselPage/>
    <div className="row">
      <div className="col-lg-12 top-card">
        <h4>Dine with CLAUSE</h4>
        <p>Make seat reservations, meal reservation. Organize dinner meetups, get together or family gathering all from our online service.</p>
      </div>
      </div>
      
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-4 col-8 offset-2 mb-4 scroll">
        <Link to="/tables">
        <img src="https://miro.medium.com/max/960/1*wOCzTLHfJwjiUzCA4Wc0nQ.jpeg" alt="first" />
        <h5>See Seats</h5></Link>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-8 offset-2 mb-4 scroll">
        <Link to="/type/meal">
        <img src="https://i.pinimg.com/564x/bc/df/c1/bcdfc13f29b3c1324a9fb6acf8d43396.jpg" alt="second" />
        <h5>See Meals</h5></Link>
        </div>
        <div className="col-lg-4 col-md-4 col-sm-4 col-8 offset-2 mb-4 scroll">
          <Link to="/type/drink">
        <img src="https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001540/img/basic/a0001540_main.jpg?20191223145353&q=80&rw=750&rh=536" alt="third" />
        <h5>See Drinks</h5></Link>
        </div>
      </div>

    </div>
    </>
  );
}

export default Homepage;
