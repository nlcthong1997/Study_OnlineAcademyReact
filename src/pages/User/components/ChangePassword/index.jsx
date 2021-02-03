import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Loading from '../../../../components/Loading';

import { LOGOUT } from '../../../../AppTypes';
import AppContext from '../../../../AppContext';
import { changePassword } from '../../../../services/user';

import Swal from 'sweetalert2';
import './index.css';

const schema = yup.object().shape({
  old_password: yup
    .string()
    .required('Bạn chưa nhập mật khẩu cũ')
    .min(8, "Mật khẩu phải từ 8 kí tự trở lên"),
  password: yup
    .string()
    .required('Bạn chưa nhập mật khẩu mới')
    .min(8, "Mật khẩu phải từ 8 kí tự trở lên"),
  confirm_password: yup
    .string()
    .required('Bạn chưa nhập xác nhận mật khẩu mới')
    .oneOf([yup.ref("password")], "Mật khẩu mới không giống nhau")
});

const ChangePassword = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const swal = Swal.mixin({ toast: true });

  const onSubmit = async (data) => {
    setIsLoading(true);
    const res = await changePassword(data);
    if (res.authenticated === false) {
      dispatch({
        type: LOGOUT,
        payload: {
          isLogged: false
        }
      });
    }

    if (res.state) {
      swal.fire({
        position: 'top-right',
        width: 400,
        title: 'Đổi mật khẩu thành công',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000
      });
    } else {
      swal.fire({
        position: 'top-right',
        width: 400,
        title: res.message,
        icon: 'error',
        showConfirmButton: false,
        timer: 2000
      });
    }
    setIsLoading(false);
  }

  return (
    <Container>
      {isLoading && <Loading />}
      <Row>
        <Col lg={8} className="form-relative">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Mật khẩu cũ</Form.Label>
              <Form.Control size="sm" type="password" name="old_password" ref={register} placeholder="Mật khẩu cũ" autoFocus />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.old_password?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control size="sm" type="password" name="password" ref={register} placeholder="Mật khẩu mới" />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.password?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Nhập lại mật khẩu mới</Form.Label>
              <Form.Control size="sm" type="password" name="confirm_password" ref={register} placeholder="Mật khẩu mới" />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.confirm_password?.message}</span>
              </Form.Text>
            </Form.Group>

            <Button type="submit" className="btn-change-password" variant="outline-dark">Đổi mật khẩu</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default ChangePassword;