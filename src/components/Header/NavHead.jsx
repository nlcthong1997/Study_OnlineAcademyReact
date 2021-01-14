import React, { useContext } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

import AppContext from '../../AppContext';
import { LOGOUT } from '../../AppTypes';

import { logout } from '../../services/auth';

import Swal from 'sweetalert2';

const NavHead = ({ categories }) => {
  const history = useHistory();
  const { store, dispatch } = useContext(AppContext);
  const isShowMenu = Object.entries(categories).length === 0 ? false : true;

  const btnLogout_clicked = () => {
    logout();
    dispatch({
      type: LOGOUT,
      payload: {
        isLogged: false
      }
    })
    Swal.fire({
      title: 'Thành công',
      text: 'Bạn đã đăng xuất khỏi tài khoản.',
      icon: 'success',
      confirmButtonText: 'OK'
    })
    history.push('/login');
  }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand>
        <Link to="/" className="link-logo">Online Academy</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {isShowMenu &&
            <NavDropdown title="Lĩnh vực" id="basic-nav-dropdown">
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
          {store.isLogged
            ?
            <>
              <NavLink to="/user" className="nav-link">
                <i class="fa fa-user-circle fa-lg"></i>&nbsp;
                {localStorage.onlineAcademy_userName}
              </NavLink>
              <NavLink to="" className="nav-link" onClick={btnLogout_clicked}>
                <i class="fa fa-sign-out fa-lg"></i>&nbsp;
                Đăng xuất
              </NavLink>
            </>
            :
            <>
              <NavLink to="/login" className="nav-link">
                <i class="fa fa-sign-in fa-lg"></i>&nbsp;
                Đăng nhập
              </NavLink>
              <NavLink to="/register" className="nav-link">Đăng ký</NavLink>
            </>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavHead;