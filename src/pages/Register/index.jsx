import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';

import { signup } from '../../services/auth';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import Swal from 'sweetalert2';
import "./index.css";

const Register = () => {
  const history = useHistory();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = async (data) => {
    const registered = await signup(data);
    if (registered) {
      history.push('/login');
      Swal.fire({
        title: 'Thành công',
        text: `Vui lòng truy cập email ${data.email} để kích hoạt tài khoản.`,
        icon: 'success',
        confirmButtonText: 'OK'
      });
    } else {
      Swal.fire({
        title: 'Thất bại',
        text: 'Đăng ký thất bại',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }
  }

  return (
    <>
      <Header isHideMenu={true} />
      <Container className="main-register">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h3 className="title">Đăng ký</h3>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tài khoản</Form.Label>
            <Form.Control type="text" name="username" ref={register({ required: true, maxLength: 255 })} className="input-form" placeholder="Tài khoản" autoFocus />
            <Form.Text className="text-muted error-message">
              {errors.username && <span className="msg">Tài khoản là bắt buộc</span>}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control type="text" name="full_name" ref={register({ minLength: 8, maxLength: 255 })} className="input-form" placeholder="Tên đầy đủ" />
            <Form.Text className="text-muted error-message">
              {errors.full_name && <span className="msg">Tên không hợp lệ hoặc quá ngắn</span>}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formGroupPassword">
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control type="password" name="password" ref={register({ required: true, minLength: 8 })} className="input-form" placeholder="Mật khẩu" />
            <Form.Text className="text-muted error-message">
              {errors.password && <span className="msg">Mật khẩu là bắt buộc</span>}
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" name="email" ref={register({ required: true, pattern: '/^[a-z][a-z0-9_\\.]{5,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2, 4}){1, 2}$/' })} className="input-form" placeholder="name@example.com" />
            <Form.Text className="text-muted error-message">
              {errors.email && <span className="msg">Email không hợp lệ</span>}
            </Form.Text>
          </Form.Group>

          <Button type="submit" variant="outline-primary btn-form">Đăng ký</Button>
        </form>
      </Container>
    </>
  );
}

export default Register;