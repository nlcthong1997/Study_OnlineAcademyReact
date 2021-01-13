import React from "react";
import { useLocation, useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

import Header from '../../components/Header';

import { login } from '../../services/auth';

import './index.css';

const Login = () => {
  const location = useLocation();
  const history = useHistory();
  const { from } = location.state || { from: { pathname: '/' } };

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const authenticated = await login(data);
    if (authenticated) {
      history.replace(from); // history.push(from.pathname);
    }
  }

  return (
    <>
      <Header isHideMenu={true} />
      <Container className="main-login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tài khoản</Form.Label>
            <Form.Control type="text" name="username" ref={register({ required: true })} className="input-form" placeholder="Tài khoản" />
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