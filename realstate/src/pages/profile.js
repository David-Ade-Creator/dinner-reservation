import React, { useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import { listMyOrders } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';


function Profile(props) {


    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const myOrderList = useSelector(state => state.myOrderList);
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(listMyOrders());
      return () => {
  
      };
    }, [userInfo])

  return (
    <div className="container">
      <div className="row mt-4">
          <div className="col-lg-5 col-md-5 col-sm-12 col-12">
      <MDBCard>
        <MDBCardBody>
          <h5>User Information</h5>
          <p>____________________</p>
            <h6>Name: {userInfo.name}</h6>
            <h6>Email: {userInfo.email} </h6>
          <MDBBtn color="orange"><Link to="/edit-user" className="clause">Edit</Link></MDBBtn>
        </MDBCardBody>
      </MDBCard>
          </div>

          <div className="col-lg-7 col-md-7 col-sm-12 col-12 mt-3">
      <MDBCard>
        <MDBCardBody>
          <MDBBtn color="orange"><Link to="/meals" className="clause">Check Table</Link></MDBBtn>
          <MDBBtn color="orange"><Link to="/reservations" className="clause">Reservations</Link></MDBBtn>
        </MDBCardBody>
      </MDBCard>
          </div>
      </div>
      <div className="row mt-5">   
        {
            loadingOrders ? <div>Loading...</div> :
            errorOrders ? <div>{errorOrders} </div> :
            orders.map(order =>
                <MDBCard key={order._id} className="mt-2 mb-2 col-12">
        <MDBCardBody>
            <h5>Reservation ID: {order._id.substring(0,10)}</h5>
            <h6>Time Booked: {order.createdAt.substring(0,10)}</h6>
            <h6>Total reservation fee:${order.totalPrice}</h6>
            <h6>Paid:{order.isPaid? "Yes" : "No"}</h6>
          <MDBBtn color="orange"><Link to={"/order/" + order._id} className="clause">Details</Link></MDBBtn>
        </MDBCardBody>
      </MDBCard>)
        }
      </div>
    </div>
  );
}

export default Profile;