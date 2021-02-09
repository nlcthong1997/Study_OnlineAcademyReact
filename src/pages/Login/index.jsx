import React, { useContext } from "react";
import { useLocation, useHistory, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Header from '../../components/Header';
import Footer from "../../components/Footer";

import AppContext from '../../AppContext';
import { LOGIN_SUCCESS, USER, TEACHER } from '../../AppTypes';

import { GoogleLogin } from 'react-google-login';
import { login, loginGoogle } from '../../services/auth';

import Swal from 'sweetalert2';
import './index.css';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Tài khoản là bắt buộc'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(8, 'Mật khẩu phải từ 8 kí tự trở lên')
});

const Login = () => {
  const { dispatch, store } = useContext(AppContext);
  const location = useLocation();
  const history = useHistory();

  const { from } = location.state || { from: { pathname: '/' } };
  const Toast = Swal.mixin({ toast: true });

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    let res = await login(data);
    console.log(res);
    if (res.authenticated !== undefined && res.authenticated) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          isLogged: res.authenticated
        }
      });
      Toast.fire({
        position: 'top-right',
        width: 400,
        title: 'Đăng nhập thành công.',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      });
      if (res.role === USER) {
        history.replace(from);
      }
      if (res.role === TEACHER) {
        history.push('/teacher/course/add');
      }

    } else {
      Toast.fire({
        position: 'top-right',
        width: 400,
        title: 'Tài khoản hoặc mật khẩu không đúng!',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  const responseGoogle = async (response) => {
    let res = await loginGoogle(response.tokenId)
    if (res.authenticated !== undefined && res.authenticated) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          isLogged: res.authenticated
        }
      });
      if (res.role === USER) {
        history.replace(from);
      }
      if (res.role === TEACHER) {
        history.push('/teacher/course/add');
      }

    } else {
      Toast.fire({
        position: 'top-right',
        width: 400,
        title: 'Đã có lỗi xảy ra, vui lòng đăng nhập lại!',
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    }
  }

  if (store.isLogged) {
    return <Redirect to={from.pathname} />
  }

  return (
    <>
      <Header isHideMenu={true} />
      <Container className="main-login">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="title">Đăng nhập</h3>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tài khoản</Form.Label>
            <Form.Control size="sm" type="text" name="username" ref={register} className="input-form" placeholder="Tài khoản" autoFocus />
            <Form.Text className="text-muted error-message">
              <span className="msg">{errors.username?.message}</span>
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formGroupPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control size="sm" type="password" name="password" ref={register} className="input-form" placeholder="Mật khẩu" />
            <Form.Text className="text-muted error-message">
              <span className="msg">{errors.password?.message}</span>
            </Form.Text>
          </Form.Group>
          <Button type="submit" variant="outline-secondary btn-form">Đăng nhập</Button>
          <br /><br />
          <GoogleLogin
            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
            render={renderProps => (
              <Button
                type="button"
                variant="outline-secondary btn-form"
                className="btn-google-custom"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}>
                <i className="fa fa-google fa-lg"></i>&nbsp;
                Đăng nhập với Google
              </Button>
            )}
            buttonText="Đăng nhập với Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
            className="btn-google"
          />
        </form>
      </Container>
      <Footer />
    </>
  );
}

export default Login;