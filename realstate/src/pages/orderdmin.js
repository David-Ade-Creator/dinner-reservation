import React, { useEffect } from 'react';
import { MDBTable, MDBTableBody, MDBTableHead,MDBBtn, MDBCard, MDBCardBody, MDBCardTitle, MDBCol,MDBInput } from 'mdbreact';
import { useSelector, useDispatch } from 'react-redux';
import {listOrders,deleteOrder} from '../actions/orderActions';


function OrderAdmin  (props) {
    
    const orderList = useSelector(state => state.orderList);
    const { loading, orders, error } = orderList;
  
    const orderDelete = useSelector(state => state.orderDelete);
    const { loading: loadingDelete, success: successDelete, error: errorDelete } = orderDelete;
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(listOrders());
      return () => {
        //
      };
    }, [successDelete]);
  
    const deleteHandler = (order) => {
      dispatch(deleteOrder(order._id));
    }
      

  return (
      <div className="container-fluid">
          <div>
              {loadingDelete && <h4 className="text-center">loading...</h4>}
              {errorDelete && <h4 className="text-center">Error deleting order</h4>}
          </div>

          <div className="row mt-3 mb-3">
          <MDBCol>
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>List Of paid reservations</MDBCardTitle>
        <MDBTable>
      <MDBTableHead color="orange" textWhite>
        <tr>
        <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>Details</th>
          <th>Delete</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
  { loading ? <div>loading...</div> : error ? <div>{error}</div> :
         orders.map(order => (order.isPaid && <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0,10)}</td>
            <td>${order.totalPrice}</td>
            <td>{order.user.name}</td>
            <td>{order.isPaid.toString()}</td>
            <td>{order.paidAt}</td>
          <td><MDBBtn color="orange" outline><a href={"/order/" + order._id}>Details</a></MDBBtn></td>
          <td><MDBBtn onClick={()=>deleteHandler(order)}color="orange">Delete</MDBBtn></td>
        </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
          </div>

          <div className="row mt-3 mb-3">
          <MDBCol>
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle>List Of unpaid reservations</MDBCardTitle>
        <MDBTable>
      <MDBTableHead color="orange" textWhite>
        <tr>
        <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>USER</th>
              <th>PAID</th>
              <th>PAID AT</th>
              <th>Details</th>
          <th>Delete</th>
        </tr>
      </MDBTableHead>
      <MDBTableBody>
  { loading ? <div>loading...</div> : error ? <div>{error}</div> :
         orders.map(order => (!order.isPaid && <tr key={order._id}>
            <td>{order._id}</td>
            <td>{order.createdAt.substring(0,10)}</td>
            <td>${order.totalPrice}</td>
            <td>{order.user.name}</td>
            <td>{order.isPaid.toString()}</td>
            <td>{order.paidAt}</td>
          <td><MDBBtn color="orange" outline><a href={"/order/" + order._id} color="orange">Details</a></MDBBtn></td>
          <td><MDBBtn onClick={()=>deleteHandler(order)} color="orange">Delete</MDBBtn></td>
        </tr>
        ))}
      </MDBTableBody>
    </MDBTable>
      </MDBCardBody>
    </MDBCard>
  </MDBCol>
          </div>

      </div>
  );
}

export default OrderAdmin;