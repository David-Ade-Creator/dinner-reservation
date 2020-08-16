import React from 'react';
import CarouselPage from '../components/carousel';
import Card from '../components/card';


function Homepage(props) {
  return (
    <>
    <CarouselPage/>
    <div className="container-fluid home">
    <div className="row">
      <div className="col-lg-12 top-card">
        <h4>Dine with CLAUSE</h4>
        <p>Make seat reservations, meal reservation. Organize dinner meetups, get together or family gathering all from our online service.</p>
      </div>
      </div>
      
      <div className="row">
      <h5 className="ml-5">Check for <a href="/tables">AVAILABLE SEATS</a> and see our MENU</h5>
      <div className="offers">
      <div className="offer">
        <Card 
        title="Seats"
        img="https://www.ellementry.com/blog/wp-content/uploads/2020/02/Main-Banner-shot-1-1568x882.jpg"
        text="Make your reservations for your nights"
        btn="Seats"
        link="/table"
        />
      </div>
      <div className="offer">
        <Card
        title="Menu"
        img="https://www.ellementry.com/blog/wp-content/uploads/2020/02/Main-Banner-shot-1-1568x882.jpg"
        text="Add dishes from our kitchen to your table"
        btn="Meals"
        link="/meals"
        />
      </div>
      <div className="offer">
        <Card
        title="Drinks"
        img="https://www.ellementry.com/blog/wp-content/uploads/2020/02/Main-Banner-shot-1-1568x882.jpg"
        text="Add from our collection of drinks to your table"
        btn="Drinks"
        link="/meals"
        />
      </div>
    </div>
    </div>
    </div>
    </>
  );
}

export default Homepage;