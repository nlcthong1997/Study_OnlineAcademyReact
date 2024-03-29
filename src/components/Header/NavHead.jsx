import React, { useContext } from 'react';
import { NavLink, Link, useHistory } from 'react-router-dom';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import NavMenuItem from './NavMenuItem';

import AppContext from '../../AppContext';
import { LOGOUT, USER, TEACHER, ADMIN, SEARCH_ACTION } from '../../AppTypes';
import { alertMessage } from '../../utils/common';
import { logout } from '../../services/auth';

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
    });

    alertMessage({ type: 'success', message: 'Bạn đã đăng xuất khỏi tài khoản.' });
    history.push('/login');
  }

  const onLogo_clicked = () => {
    dispatch({
      type: SEARCH_ACTION,
      payload: {
        isSearchAction: false
      }
    });
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navbar">
      <Navbar.Brand onClick={onLogo_clicked}>
        <Link to="/" className="link-logo">Online Academy</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {isShowMenu &&
            <NavDropdown title="Lĩnh vực" id="basic-nav-dropdown">
              {
                categories.map((cat, i) =>
                  <NavMenuItem key={i} category={cat} />
                )
              }
              <NavDropdown.Divider />
              <NavMenuItem category={{ id: null, name: 'Tất cả lĩnh vực' }} />
            </NavDropdown>
          }
        </Nav>
        <Nav>
          {store.isLogged
            ?
            <>
              {store.role === ADMIN &&
                <NavLink to="/admin/courses" className="nav-link">
                  <i className="fa fa-gear fa-lg"></i>&nbsp;
                Quản lý
              </NavLink>
              }
              {store.role === TEACHER &&
                <NavLink to="/teacher/course/add" className="nav-link">
                  <i className="fa fa-gear fa-lg"></i>&nbsp;
                Quản lý
              </NavLink>
              }
              {(store.role === USER || store.role === TEACHER) &&
                <NavLink to="/user" className="nav-link">
                  <i className="fa fa-user-circle fa-lg"></i>&nbsp;
                {localStorage.onlineAcademy_userName}
                </NavLink>
              }
              <NavLink to="" className="nav-link" onClick={btnLogout_clicked}>
                <i className="fa fa-sign-out fa-lg"></i>&nbsp;
                Đăng xuất
              </NavLink>
            </>
            :
            <>
              <NavLink to="/login" className="nav-link">
                <i className="fa fa-sign-in fa-lg"></i>&nbsp;
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