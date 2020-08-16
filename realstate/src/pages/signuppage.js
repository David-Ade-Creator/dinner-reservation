import React, { useState, useEffect } from 'react';
import {Link} from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn, MDBCard, MDBCardBody } from 'mdbreact';
import { useSelector, useDispatch } from 'react-redux';
import { register } from '../actions/userActions';



function Register(props) {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const userRegister = useSelector(state=>state.userRegister);
  const {loading, userInfo, error} = userRegister;
  const dispatch = useDispatch();

  const redirect = props.location.search?props.location.search.split("=")[1]: '/';
  useEffect(()=>{
    if (userInfo) {
      props.history.push(redirect);
    }
    return () =>{

    };
    //
  }, [userInfo])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(register(name, email, password));
  }


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
                <p className="h4 text-center py-4">Sign up</p>
                {loading && <div>Loading....</div>}
                {error && <div>{error}</div>}
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
                  />
                  <MDBInput
                    label="Your email"
                    icon="envelope"
                    group
                    type="email"
                    onChange={(e)=>setEmail(e.target.value)}
                    validate
                    error="wrong"
                    success="right"
                  />
                  <MDBInput
                    label="Your password"
                    icon="lock"
                    group
                    name="password"
                    onChange={(e)=>setPassword(e.target.value)}
                    type="password"
                    validate
                    error="wrong"
                    success="right"
                  />
                </div>
                <div className=" py-4 mt-3">
                  <MDBBtn color="cyan" type="submit">
                    Register
                  </MDBBtn>
                  <Link to={redirect === "/" ? "signin" : "signin?redirect" + redirect}> Sign In</Link>
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

export default Register;