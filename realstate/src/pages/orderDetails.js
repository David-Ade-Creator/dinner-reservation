import React, { useState, useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol } from 'mdbreact';
import { useSelector, useDispatch } from 'react-redux';
import { detailsOrder,payOrder } from '../actions/orderActions';
import PaypalButton from '../components/paypalbutton';
import Loader from '../components/loader';


function OrderDetails  (props) {
    const [modal,setModal] = useState(false);
   
    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;
  
  
  
    const orderDetail = useSelector(state => state.orderDetail);
    const { loading, order, error } = orderDetail;
    const dispatch = useDispatch();

    
    useEffect(() => {
      if (successPay) {
        props.history.push("/profile");
      } else {
        dispatch(detailsOrder(props.match.params.id));
      }
      return () => {
      };
    }, [successPay]);
   


      const openModal = () => {
        setModal(!modal);
      };

      const handleSuccessPayment = (paymentResult) => {
        dispatch(payOrder(order, paymentResult));
      }

      

      return loading ? <div><Loader/></div> : error ? <div>{error}</div> :
      (
      <div className="container-fluid">
          <div className="row mb-4">
          <MDBBtn onClick={openModal} outline color="orange">See order details</MDBBtn>
          </div>

          { modal && (<div className="row mt-2 mb-2">
          <div className="col-lg-5 offset-lg-4">
          <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>Orders</MDBCardTitle>
        <div>
    <MDBBtn className="col-lg" onClick={() => setModal(false)} color="orange">CLOSE</MDBBtn>
    </div>
    {
        order.orderItems.length === 0 ?
        <div>
          Cart is empty
</div>
        :
        order.orderItems.map( item =>
            <div key={item.product} className="col-lg-10 col-md-10 mt-3 mb-3">
            <div className="row">
              <div className="col-lg-5 col-md-5 col-sm-5 col-5">
                <img src={item.image} width="100%" height="150px" alt="No photo"/>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
              <h6>Name:{item.name}</h6>
              <h6>Price:{item.price}</h6>
              <h6>Category:{item.category}</h6>
              <h6>Qty:{item.qty}</h6>
              </div>
            </div>
            </div>
            )
        }
      </MDBCardBody>
    </MDBCard>
          </div>
          </div>)}

          <div className="row">
          <MDBCol>
    <MDBCard>
      <MDBCardBody>
        <p className="text-center">Select Payment Methods</p>
        <div className="col-lg-4">
        {loadingPay && <div>Finishing Payment...</div>}
              {!order.isPaid &&
                <PaypalButton
                  amount={order.totalPrice}
                  onSuccess={handleSuccessPayment} />
              }
        </div>
        <div >
            <h5>Order Summary</h5>
            <p>______________  ________  _______</p>
              <h6>Item:${order.itemsPrice}</h6>
              <h6>Tax:${order.taxPrice}</h6>
              <h5>Total:${order.totalPrice}</h5>
              </div>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
          </div>
      </div>
  );
}

export default OrderDetails;