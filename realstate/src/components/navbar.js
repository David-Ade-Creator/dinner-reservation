import React, { useState } from "react";
import {
MDBNavbar, MDBNavbarBrand,MDBBtn, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

function NavbarPage(){
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

const toggleCollapse = () => {
  setIsOpen( !isOpen );
}

const logoutHandler = () => {
  dispatch(logout())
}

  return (
      <MDBNavbar color="orange" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text"><Link to="/" className="clause">CLAUSE</Link></strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink  onClick={toggleCollapse} to="/">Tables</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink onClick={toggleCollapse} to="/type/meal">Meals</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink  onClick={toggleCollapse} to="/type/drink">Drinks</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">{userInfo ? userInfo.name : 'Profile' }</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem  onClick={toggleCollapse} href="/profile">Account</MDBDropdownItem>
                  <MDBDropdownItem  onClick={toggleCollapse} href="/reservations/:id?">Checklist</MDBDropdownItem>
                  <MDBDropdownItem  onClick={toggleCollapse} href="/profile#order">Reservation</MDBDropdownItem>
                  <MDBDropdownItem  onClick={toggleCollapse} href="#!">Settings</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
            <MDBNavItem>
            { userInfo && userInfo.isAdmin && <MDBNavLink  onClick={toggleCollapse} to="/productadmin">Admin</MDBNavLink> }
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
         <MDBNavItem>
         { !userInfo &&  <MDBNavLink  onClick={toggleCollapse} to="/signup">Signup</MDBNavLink> }
            </MDBNavItem>
            <MDBNavItem>
            { !userInfo &&    <MDBNavLink  onClick={toggleCollapse} to="/signin">Login</MDBNavLink> }
            </MDBNavItem>
            <MDBNavItem>
            { userInfo && <MDBBtn color="orange" onClick={logoutHandler} >Logout</MDBBtn> }
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
}

export default NavbarPage;