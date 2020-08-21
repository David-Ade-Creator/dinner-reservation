import React, { useEffect, useState } from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBModalFooter,
  MDBIcon,
  MDBCardHeader,
  MDBBtn
} from "mdbreact";
import { signin } from '../actions/userActions';



function Login(props) {

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const userSignin = useSelector(state=>state.userSignin);
  const {loading, userInfo, error } = userSignin;
  const dispatch = useDispatch();
  const redirect = props.location.search?props.location.search.split("=")[1]: '/';

  useEffect(() =>{
    if(userInfo){
      props.history.push(redirect);
    }

  return () => {
   //
  };
}, [props.history,userInfo,redirect]);

const submithandler = (e) =>{
  e.preventDefault();
  dispatch(signin(email,password));
}

  return (
    <div className="container-fluid">
      <div className="row">
        <form onSubmit={submithandler} className="col-lg-5 col-md-6 offset-lg-4 offset-md-3 mt-5 mb-5">
        <MDBContainer>
      <MDBRow>
        <MDBCol>
          <MDBCard>
            <MDBCardBody>
              <MDBCardHeader className="form-header warm-flame-gradient rounded">
                <h3 className="my-3">
                  <MDBIcon icon="lock" /> Login:
                </h3>
                {loading && <div>Loading....</div>}
                {error && <div>{error}</div>}
              </MDBCardHeader>
              <label
                htmlFor="defaultFormEmailEx"
                className="grey-text font-weight-light"
              >
                Your email
              </label>
              <input
                type="email"
                name="email"
                onChange = {(e)=> setEmail(e.target.value)}
                id="defaultFormEmailEx"
                className="form-control"
              />

              <label
                htmlFor="defaultFormPasswordEx"
                className="grey-text font-weight-light"
              >
                Your password
              </label>
              <input
                type="password"
                name="password"
                onChange={(e)=>setPassword(e.target.value)}
                id="defaultFormPasswordEx"
                className="form-control"
              />

              <div className="text-center mt-4">
                <MDBBtn 
                color="deep-orange" 
                className="mb-3" 
                type="submit">
                  Login
                </MDBBtn>
              </div>

              <MDBModalFooter>
                <div className="font-weight-light">
                  <p>Not a member?<Link to={redirect === "/" ? "signup" : "signup?redirect" + redirect}> Sign Up</Link></p>
                  <p>Forgot Password?</p>
                </div>
              </MDBModalFooter>
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

export default Login;