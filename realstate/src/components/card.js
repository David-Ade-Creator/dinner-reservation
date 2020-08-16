import React from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

const Card = (props) => {
  return (
    <MDBCol>
      <MDBCard height="500px">
        <div height="300px">
        <MDBCardImage className="img-fluid" src={props.img} waves width="400px"/>
        </div>
        <MDBCardBody>
  <MDBCardTitle>{props.title}</MDBCardTitle>
          <MDBCardText>
            {props.text}
          </MDBCardText>
  <MDBBtn color="orange" href={props.link}>{props.btn}</MDBBtn>
        </MDBCardBody>
      </MDBCard>
      </MDBCol>
  )
}

export default Card;