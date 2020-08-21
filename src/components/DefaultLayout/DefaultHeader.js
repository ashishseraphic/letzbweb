import React, { Component } from "react";
// import { Link, NavLink } from "react-router-dom";
import {
  // Badge,
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav
  // NavItem
} from "reactstrap";
import PropTypes from "prop-types";

import {
  // AppAsideToggler,
  AppNavbarBrand,
  AppSidebarToggler
} from "@coreui/react";


const propTypes = {
  children: PropTypes.node
};

const defaultProps = {};

class DefaultHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      firstName: "",
      lastName: "",
};
}

  render() {
   
 
      return (
        <React.Fragment>
      
             <AppNavbarBrand >
             <span style = {{marginLeft:"40px"}}><b> LETZB <i className="fa fa-heart" aria-hidden="true"></i></b></span>      
            </AppNavbarBrand>    
          <AppSidebarToggler className="d-md-down-none" display="lg" />
  
        <Nav className="ml-auto" navbar>
            <UncontrolledDropdown nav direction="down">
              <DropdownToggle nav>
                <img
                  src={"http://simpleicon.com/wp-content/uploads/user-5.png"}
                  className="img-avatar"
                  alt="admin@bootstrapmaster.com"
                />
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem header tag="div" className="text-center">
                  <strong>Account</strong>
                </DropdownItem>
                {/* <DropdownItem onClick={e => this.props.onChangeEmail()}>
                  <i className="icon-lock" /> Change Email
                </DropdownItem> */}
                <DropdownItem onClick={e => this.props.onChangePassword()}>
                  <i className="icon-lock" /> Change Password
                </DropdownItem>
                <DropdownItem onClick={e => this.props.onLogout(e)}>
                  <i className="icon-logout" /> Logout
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
        
        </React.Fragment>
      );
    
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
