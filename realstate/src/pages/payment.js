import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardHeader,
  MDBBtn
} from "mdbreact";
import { savePayment } from '../actions/cartActions';



function Payment(props) {

  const [paymentMethod,setPaypal]=useState('');
  const dispatch = useDispatch();


const submithandler = (e) =>{
  e.preventDefault();
  dispatch(savePayment({ paymentMethod }));
  props.history.push('placeorder');
}

  return (
    <div className="container-fluid">
      <div className="row mt-5 mb-5">
        <form onSubmit={submithandler} className="col-lg-5 col-md-6 offset-lg-4 offset-md-3 mt-5 mb-5">
        <MDBContainer>
      <MDBRow>
        <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <MDBCardHeader className="form-header warm-flame-gradient rounded">
                <h3 className="my-3">
                  Payment Method
                </h3>
                
              </MDBCardHeader>
              <div className="mt-5">
              <input type="radio" onChange={(e)=>setPaypal(e.target.value)} value="paypal"/>
              <label
                htmlFor="defaultFormEmailEx"
                className="grey-text font-weight-light ml-3"
              >
                PayPal
              </label>
              </div>

              <div className="text-center mt-4">
                <MDBBtn 
                color="orange" 
                className="mb-3" 
                type="submit">
                  Make Payment
                </MDBBtn>
              </div>

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
        </form>
      </div>
    </div>
  );
}

export default Payment;