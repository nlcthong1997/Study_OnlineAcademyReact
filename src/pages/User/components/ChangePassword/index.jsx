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
import { changePassword, getUser } from '../../../../services/user';
import { alertMessage } from '../../../../utils/common';

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
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState(null);
  const [user, setUser] = useState({
    id: '',
    username: '',
    social_account: false
  });

  useEffect(() => {
    const fetchData = async () => {
      let res = await getUser();
      if (res.state) {
        setUser(res.data);
      } else {
        if (res.auth !== undefined && res.auth.authenticated === false) {
          dispatch({
            type: LOGOUT,
            payload: {
              isLogged: false
            }
          });
        }
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (isSubmit) {
      const submitForm = async () => {
        const res = await changePassword(formData);
        if (mounted) {
          if (res.state) {
            setIsSubmit(false);
            alertMessage({ type: 'success', message: 'Đổi mật khẩu thành công' });
            setIsLoading(false);
            reset();
          } else {
            setIsSubmit(false);
            alertMessage({ type: 'error', message: 'Đổi mật khẩu thất bại' });
            setIsLoading(false);
            if (res.auth !== undefined && res.auth.authenticated === false) {
              dispatch({
                type: LOGOUT,
                payload: {
                  isLogged: false
                }
              });
            }
          }
        }
      }
      submitForm();
    }
  }, [isSubmit, formData, reset]);

  const onSubmit = (data) => {
    setIsLoading(true);
    setFormData(data);
    setIsSubmit(true);
  }

  return (
    <Container>
      {isLoading && <Loading />}
      <Row>
        <Col lg={8} className="form-relative">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group>
              <Form.Label>Mật khẩu cũ</Form.Label>
              <Form.Control size="sm" type="password" name="old_password" ref={register} placeholder="Mật khẩu cũ" autoFocus readOnly={user.social_account} />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.old_password?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control size="sm" type="password" name="password" ref={register} placeholder="Mật khẩu mới" readOnly={user.social_account} />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.password?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Nhập lại mật khẩu mới</Form.Label>
              <Form.Control size="sm" type="password" name="confirm_password" ref={register} placeholder="Mật khẩu mới" readOnly={user.social_account} />
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