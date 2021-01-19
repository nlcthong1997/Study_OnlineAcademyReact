import React, { useContext } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import AppContext from '../../AppContext';
import { LOGIN_SUCCESS } from '../../AppTypes';

import Header from '../../components/Header';

import { login } from '../../services/auth';

import Swal from 'sweetalert2';
import './index.css';

const Login = () => {
  const { dispatch } = useContext(AppContext);
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/' } };

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const authenticated = await login(data);
    if (authenticated) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          isLogged: authenticated
        }
      });
      history.replace(from); // history.push(from.pathname);
    } else {
      Swal.fire({
        title: 'Thất bại',
        text: 'Tài khoản hoặc mật khẩu không đúng!',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  return (
    <>
      <Header isHideMenu={true} />
      <Container className="main-login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="title">Đăng nhập</h3>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tài khoản</Form.Label>
            <Form.Control type="text" name="username" ref={register({ required: true })} className="input-form" placeholder="Tài khoản" autoFocus />
            <Form.Text className="text-muted error-message">
              {errors.username && <span className="msg">Tài khoản là bắt buộc</span>}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formGroupPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control type="password" name="password" ref={register({ required: true })} className="input-form" placeholder="Mật khẩu" />
            <Form.Text className="text-muted error-message">
              {errors.password && <span className="msg">Mật khẩu là bắt buộc</span>}
            </Form.Text>
          </Form.Group>
          <Button type="submit" variant="outline-primary btn-form">Đăng nhập</Button>
        </form>
      </Container>
    </>
  );
}

export default Login;