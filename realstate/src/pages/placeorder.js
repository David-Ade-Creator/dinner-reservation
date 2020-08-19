import React, { useEffect } from 'react';
import {  MDBBtn } from 'mdbreact';
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../actions/orderActions';



function PlaceOrder(props) {

  const cart = useSelector(state =>state.cart);
  const {cartItems ,payment} = cart;

  const orderCreate = useSelector(state => state.orderCreate);
  const {  success, order } = orderCreate;

if (!cart.payment.paymentMethod) {
  props.history.push("/payment");
}
const itemsPrice = cartItems.reduce((a, c) => a + c.price * c.qty, 0);
const taxPrice = 0.15 * itemsPrice;
const totalPrice = itemsPrice + taxPrice;

const dispatch = useDispatch();


const placeOrderHandler = () => {
  // create an order
  dispatch(createOrder({
   orderItems: cartItems, payment, itemsPrice,
    taxPrice, totalPrice
  }));
}

useEffect(() => {
  if (success) {
    props.history.push("/order/" + order._id);
  }

}, [success]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-8">
        <div className="col-lg-12">
          <h3>Payment</h3>
          <div>
            Payment Method: {payment.paymentMethod}
          </div>
        </div>
        {
          cartItems.length === 0 ?
          <div>Cart is empty</div> :
          cartItems.map( item =>
            <div key={item.product} className="col-lg-6 mt-3 mb-3">
            <div className="row">
              <div className={ item.date ? 'col-lg-12':"col-lg-10 col-md-5 col-sm-5 col-5"}>
                <img src={item.image} width="100%" height="150px" alt="No photo"/>
              </div>
              <div className="col-lg-12">
              { item.date && <h6>Reservation Date:{item.date}</h6>}
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7">
              <h6>Name:{item.name}</h6>
              <h6>Price:{item.price}</h6>
              <h6>Category:{item.category}</h6>
                <h6>Qty: : {item.qty} </h6>
              </div>
            </div>
            </div>
            )
        }
          </div>
          <div className="col-lg-4">
          {cartItems.length > 0 ? <div className="row mt-5">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <h6>TotalPrice: ${itemsPrice}</h6>
              <h6>Tax: ${taxPrice}</h6>
              <br/>
                <h6>TotalPrice: ${totalPrice} </h6>
            <MDBBtn onClick={placeOrderHandler} color="orange" >
                      Reserve Table
                    </MDBBtn>
            </div>
            </div> : <></>
          }
        </div>
        </div>
      </div>
  );
}

export default PlaceOrder;