import React, { useEffect } from 'react';
import { MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { listMyOrders, deleteOrder } from '../actions/orderActions';
import { useDispatch, useSelector } from 'react-redux';
import {Link} from 'react-router-dom';


function Profile(props) {


    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    const myOrderList = useSelector(state => state.myOrderList);
    const { loading: loadingOrders, orders, error: errorOrders } = myOrderList;

    const orderDelete = useSelector(state => state.orderDelete);
    const { success: successDelete } = orderDelete;
  
    const dispatch = useDispatch();

    useEffect(() => {
      if (successDelete){
        dispatch(listMyOrders());
      }
      dispatch(listMyOrders());
      return () => {
  
      };
    }, [userInfo,successDelete]);

    const deleteHandler = (order) => {
      dispatch(deleteOrder(order._id));
    }

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
            <Link to="/edit-user" className="clause"><MDBBtn color="orange">Edit</MDBBtn></Link>
        </MDBCardBody>
      </MDBCard>
          </div>

          <div className="col-lg-7 col-md-7 col-sm-12 col-12 mt-3">
      <MDBCard>
        <MDBCardBody>
        <Link to="/tables" className="clause"><MDBBtn color="orange">Check Table</MDBBtn></Link>
          <Link to="/reservations" className="clause"><MDBBtn color="orange">Checklist</MDBBtn></Link>
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
            <Link to={"/order/" + order._id} className="clause"><MDBBtn color="orange">Details</MDBBtn></Link>
            <MDBBtn onClick={()=>deleteHandler(order)} color="orange" outline>Cancel</MDBBtn>
        </MDBCardBody>
      </MDBCard>)
        }
      </div>
    </div>
  );
}

export default Profile;