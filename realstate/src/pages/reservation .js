import React, { useEffect } from 'react';
import {  MDBBtn } from 'mdbreact';
import {Link} from 'react-router-dom';
import {reserveTable, addToCart, removeFromCart } from '../actions/cartActions';
import { useDispatch, useSelector } from 'react-redux';



function Reservation(props) {
const cart = useSelector(state =>state.cart);
const {cartItems} = cart;
 const productId = props.match.params.id;
 const qty =  props.location.search? Number(props.location.search.split("=")[1]):1;
 const date =  props.location.search? (props.location.search.split("=")[1]):1;
 const dispatch = useDispatch();

 const removeFromCartHandler = (productId) => {
   dispatch(removeFromCart(productId));
 }

 useEffect(() =>{
  if(productId){
    dispatch(reserveTable(productId, date));
  }
 }, [])

 useEffect(() =>{
  if(productId && qty){
    dispatch(addToCart(productId, qty));
  }
 }, [dispatch])

 const checkouthandler = () => {
   props.history.push("/signin?redirect=payment");
 }

  return (
    <div className="container">
      <div className="row">
        {cartItems.length >= 1 && 
        <div className="col-lg-12">
          <h5 className="text-center">Add Meals and drinks to your table</h5>
          <div className="text-center"><Link to="/type/meal" className="clause"><MDBBtn color="orange" >
                      Menu
                    </MDBBtn></Link></div>
        </div>
        }
        {
          cartItems.length === 0 ?
            <div className="col-lg-12 col-md-6 col-sm-12 col-12 mt-5 mb-5 empty">
              <h4 className="text-center mt-4">No Seats in your checklist</h4>
              <div className="text-center"><Link to="/tables" className="clause"><MDBBtn color="orange" >
                      Check Tables
                    </MDBBtn></Link></div>
            </div> :
          cartItems.map( item =>
            <div key={item.product} className="col-lg-6 mt-3 mb-3">
            
            <div className="row">
              <div className={ item.date ? 'col-lg-12':"col-lg-5 col-md-5 col-sm-5 col-5"}>
                <img src={item.image} width="100%" height="150px" alt={item.name}/>
              </div>
              <div className="col-lg-7 col-md-7 col-sm-7 col-7 mt-2">
              <h6>Name:{item.name}</h6>
              <h6>Price:{item.price}</h6>
              <h6>Category:{item.category}</h6>
               {item.date ? '' : <h6>Qty: <select value={item.qty} onChange={(e)=> dispatch(addToCart(item.product, e.target.value))}>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
          </select></h6> }
              </div>
            </div>
            <div className="row">
            <div className="col-lg-12">
            { item.date && <h6>Reservation Date:{item.date}</h6>}
            </div>
            {cartItems.length > 1 && item.date ? '' : <div className="col-lg-5 col-md-5 col-sm-5 col-5">
            <MDBBtn onClick={()=>removeFromCartHandler(item.product)} color="orange" >
                      Remove
                    </MDBBtn>
              </div>}
            </div>
            </div>
            )
        }

 

        </div>
        <div>
          {cartItems.length > 0 ? <div className="row mt-5">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <h4>
              Subtotal ({cartItems.reduce((a,c) => a + c.qty,0)} items) :
              $ {cartItems.reduce((a,c) => a + c.price * c.qty, 0)}
            </h4>
            <MDBBtn onClick={checkouthandler} color="orange" >
                      Proceed to Checkout
                    </MDBBtn>
            </div>
            </div> : <></>
          }
        </div>
      </div>
  );
}

export default Reservation;