import React from 'react';
import { NavLink, Link } from "react-router-dom";

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

const NavHead = ({ categories }) => {
  const isShowMenu = Object.entries(categories).length === 0 ? false : true;
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/" className="link-logo">Online Academy</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {
            isShowMenu && <NavDropdown title="Lĩnh vực" id="basic-nav-dropdown">
              {
                categories.map((cat, i) =>
                  <NavDropdown.Item key={i} href="">{cat.name}</NavDropdown.Item>
                )
              }
              <NavDropdown.Divider />
              <NavDropdown.Item href="">Tất cả lĩnh vực</NavDropdown.Item>
            </NavDropdown>
          }
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