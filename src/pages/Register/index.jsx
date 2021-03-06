import React from "react";
import { useHistory } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

import { signup } from '../../services/auth';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Swal from 'sweetalert2';
import { alertMessage } from '../../utils/common';
import "./index.css";

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Tài khoản là bắt buộc'),
  full_name: yup
    .string()
    .min(8, 'Tên quá ngắn')
    .max(255, 'Tên quá dài'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(8, 'Mật khẩu phải từ 8 kí tự trở lên'),
  email: yup
    .string()
    .email('Email không hợp lệ')
    .required('Email là bắt buộc'),
  phone: yup
    .string()
    .min(10, 'Số điện thoại không hợp lệ')
});

const Register = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = async (data) => {
    const registered = await signup(data);
    if (registered) {
      history.push('/login');
      Swal.fire({
        html: `Truy cập email <strong>${data.email}</strong> để kích hoạt tài khoản.`,
        title: `Đăng ký thành công.`,
        icon: 'success',
        confirmButtonText: 'Truy cập mail',
        preConfirm: () => {
          window.open("https://mail.google.com/mail/u/0/#inbox");
        }
      });
    } else {
      alertMessage({ type: 'error', message: 'Đăng ký thất bại, Email đã được sử dụng' });
    }
  }

  return (
    <>
      <Header isHideMenu={true} />
      <Container className="main-register">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="title">Đăng ký</h3>
          <Form.Group>
            <Form.Label>Tài khoản</Form.Label>
            <Form.Control size="sm" type="text" name="username" ref={register} className="input-form" placeholder="Tài khoản" autoFocus />
            <Form.Text className="text-muted error-message">
              <span className="msg">{errors.username?.message}</span>
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control size="sm" type="text" name="full_name" ref={register} className="input-form" placeholder="Tên đầy đủ" />
            <Form.Text className="text-muted error-message">
              <span className="msg">{errors.full_name?.message}</span>
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formGroupPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control size="sm" type="password" name="password" ref={register} className="input-form" placeholder="Mật khẩu" />
            <Form.Text className="text-muted error-message">
              <span className="msg">{errors.password?.message}</span>
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Số điện thoại</Form.Label>
            <Form.Control size="sm" type="text" name="phone" ref={register} className="input-form" placeholder="Số điện thoại" />
            <Form.Text className="text-muted error-message">
              <span className="msg">{errors.phone?.message}</span>
            </Form.Text>
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control size="sm" type="email" name="email" ref={register} className="input-form" placeholder="name@example.com" />
            <Form.Text className="text-muted error-message">
              <span className="msg">{errors.email?.message}</span>
            </Form.Text>
          </Form.Group>

          <Button type="submit" variant="outline-secondary btn-form">Đăng ký</Button>
        </form>
      </Container>
      <Footer />
    </>
  );
}

export default Register;