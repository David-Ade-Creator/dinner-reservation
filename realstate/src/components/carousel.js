import React from "react";
import { MDBCarousel, MDBCarouselInner, MDBCarouselItem, MDBView } from
"mdbreact";

const CarouselPage = () => {
  return (
    <MDBContainer-fluid className="carouselheight">
      <MDBCarousel
        activeItem={1}
        length={3}
        showControls={true}
        showIndicators={true}
        className="z-depth-1"
      >
        <MDBCarouselInner>
          <MDBCarouselItem itemId="1">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://media-cdn.tripadvisor.com/media/photo-s/0e/6f/91/53/dinner-table-for-large.jpg"
                alt="First slide"
                height="450px"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://upload.wikimedia.org/wikipedia/en/5/53/Foodporn_table_of_foodpood.jpg"
                alt="Second slide"
                height="450px"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="3">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://d1ralsognjng37.cloudfront.net/15a908c1-adbd-42bb-ae26-9ba65892036e.jpeg"
                height="450px"
              />
            </MDBView>
          </MDBCarouselItem>
        </MDBCarouselInner>
      </MDBCarousel>
    </MDBContainer-fluid>
  );
}

export default CarouselPage;