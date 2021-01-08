import React from 'react';
import { NavLink, Link } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavHead = ({ categories }) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/" className="link-logo">Online Academy</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavDropdown title="Lĩnh vực" id="basic-nav-dropdown">
            {
              categories.map((cat, i) =>
                <NavDropdown.Item key={i} href="">{cat.name}</NavDropdown.Item>
              )
            }
            <NavDropdown.Divider />
            <NavDropdown.Item href="">Tất cả lĩnh vực</NavDropdown.Item>
          </NavDropdown>
          {/* <NavDropdown title="Khóa học" id="collasible-nav-dropdown">
              {
                store.courses.map(course => 
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                )
              }
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Tất cả khóa học</NavDropdown.Item>
            </NavDropdown> */}
        </Nav>
        <Nav>
          <NavLink to="/login" className="nav-link">Đăng nhập</NavLink>
          <NavLink to="/register" className="nav-link">Đăng ký</NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavHead;