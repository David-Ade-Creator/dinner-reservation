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
                src="https://rimage.gnst.jp/livejapan.com/public/article/detail/a/00/01/a0001540/img/basic/a0001540_main.jpg?20191223145353&q=80&rw=750&rh=536"
                alt="First slide"
                height="450px"
              />
            </MDBView>
          </MDBCarouselItem>
          <MDBCarouselItem itemId="2">
            <MDBView>
              <img
                className="d-block w-100"
                src="https://blogs.uoregon.edu/natewoodburyaad250/files/2012/10/PSD_Food_illustrations_3190_pancakes_with_butter-1wi1tz5.jpg"
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