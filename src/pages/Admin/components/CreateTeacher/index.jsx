import React, { forwardRef, useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Loading from '../../../../components/Loading';
import { alertMessage } from '../../../../utils/common';
import { adminCreateTeacher } from '../../../../services/admin';

import './index.css';
import { LOGOUT } from '../../../../AppTypes';
import AppContext from '../../../../AppContext';

const schema = yup.object().shape({
  username: yup
    .string()
    .required('Tài khoản là bắt buộc'),
  password: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .min(8, 'Mật khẩu phải từ 8 kí tự trở lên'),
  email: yup
    .string()
    .required('Mật khẩu là bắt buộc')
    .email('Không đúng định dạng')
});

const CreateTeacher = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState(null);
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(AppContext);

  useEffect(() => {
    let mounted = true;
    if (isSubmit) {
      const submitForm = async () => {
        const res = await adminCreateTeacher(formData);
        if (mounted) {
          if (res.state) {
            setIsSubmit(false);
            setIsLoading(false);
            alertMessage({ type: 'success', message: 'Tạo tài khoản thành công.' });
            reset();
          } else {
            setIsSubmit(false);
            setIsLoading(false);
            alertMessage({ type: 'error', message: res.data.message })
            if (res.auth !== undefined && res.auth.authenticated === false) {
              dispatch({
                type: LOGOUT,
                payload: {
                  isLogged: false
                }
              })
            }
          }
        }
      }
      submitForm();
    }

    return () => mounted = false;
  }, [isSubmit, formData, reset]);

  const onSubmit = (data) => {
    setIsLoading(true);
    setFormData(data);
    setIsSubmit(true);
  }

  return (
    <Container>
      {isLoading && <Loading />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col lg={7} xs={12} className="col-form-create-teacher">
            <Form.Group>
              <Form.Label>Tài khoản</Form.Label>
              <Form.Control size="sm" type="text" name="username" ref={register} placeholder="Tài khoản" autoFocus />
              <Form.Text className="text-muted error-message">
                <span className="msg">{errors.username?.message}</span>
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control size="sm" type="password" name="password" ref={register} placeholder="Mật khẩu" />
              <Form.Text className="text-muted error-message">
                <span className="msg">{errors.password?.message}</span>
              </Form.Text>
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control size="sm" type="email" name="email" ref={register} placeholder="teacher@mail.com" />
              <Form.Text className="text-muted error-message">
                <span className="msg">{errors.email?.message}</span>
              </Form.Text>
            </Form.Group>
            <Button type="submit" variant="outline-secondary btn-create-teacher">Tạo tài khoản</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CreateTeacher;