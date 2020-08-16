import React, { Component } from "react";
import {
MDBNavbar, MDBNavbarBrand,MDBBtn, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse, MDBFormInline,
MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";

class NavbarPage extends Component {
state = {
  isOpen: false
};

toggleCollapse = () => {
  this.setState({ isOpen: !this.state.isOpen });
}


render() {
  return (
      <MDBNavbar color="orange" dark expand="md">
        <MDBNavbarBrand>
          <strong className="white-text"><Link to="/" className="clause">CLAUSE</Link></strong>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/tables">Tables</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/meals">Meals</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBDropdown>
                <MDBDropdownToggle nav caret>
                  <span className="mr-2">Profile</span>
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem href="/profile">Account</MDBDropdownItem>
                  <MDBDropdownItem href="/reservations/:id?">Checklist</MDBDropdownItem>
                  <MDBDropdownItem href="/profile#order">Reservation</MDBDropdownItem>
                  <MDBDropdownItem href="#!">Settings</MDBDropdownItem>
                  <MDBDropdownItem><MDBBtn color="orange">Logout</MDBBtn></MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
          <MDBNavbarNav right>
          <MDBNavItem>
              <MDBNavLink to="/signup">Signup</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem>
              <MDBNavLink to="/signin">Login</MDBNavLink>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default NavbarPage;