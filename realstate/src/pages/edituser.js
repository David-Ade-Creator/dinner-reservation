import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../actions/userActions';



function Edituser(props) {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading, success, error } = userUpdate;

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(update({ userId: userInfo._id, email, name }))
  }
  
  useEffect(()=>{
    if (userInfo) {
        console.log(userInfo.name)
        setEmail(userInfo.email);
        setName(userInfo.name);
        props.history.push('/edit-user');
    }
    return () =>{

    };
    //
  }, [userInfo])

  


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-5 col-md-6 offset-lg-4 offset-md-3 mt-5 mb-5">
        <MDBContainer>
      <MDBRow>
        <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <form onSubmit={submitHandler}>
                <p className="h4 text-center py-4">Update Profile</p>
                {loading && <div>Loading....</div>}
                {error && <div>{error}</div>}
                {success && <div>Profile Updated successfully</div>}
                <div className="grey-text">
                <MDBInput
                    label="Your name"
                    icon="user"
                    group
                    type="text"
                    onChange={(e)=>setName(e.target.value)}
                    validate
                    error="wrong"
                    success="right"
                    value={name}
                  />
                  <MDBInput
                    label="Your name"
                    icon="envelope"
                    group
                    type="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    validate
                    error="wrong"
                    success="right"
                    value={email}
                  />
                </div>
                <div className="py-4 mt-3">
                  <MDBBtn color="orange" type="submit">
                    Update
                  </MDBBtn>

                  <Link to="/profile" className="clause2"><MDBBtn outline color="warning">
                   Cancel
                  </MDBBtn></Link>
                </div>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
        </div>
      </div>
    </div>
  );
}

export default Edituser;