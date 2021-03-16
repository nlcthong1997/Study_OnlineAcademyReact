import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Select from 'react-select';
import Loading from '../../../../components/Loading';
import { alertMessage } from '../../../../utils/common';
import AppContext from '../../../../AppContext';
import { adminGetAccountTeacher, adminUpdatePassword } from '../../../../services/admin';
import { LOGOUT } from '../../../../AppTypes';


const schema = yup.object().shape({
  password: yup.string().required('Bạn chưa nhập mật khẩu')
});

const ResetPassword = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(AppContext);
  const [isChangeAccount, setIsChangeAccount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState(null);
  const [optAccount, setOptAccount] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({ value: null, label: 'Chọn tài khoản hoặc giảng viên' });

  useEffect(() => {
    const fetchAccountTeacher = async () => {
      const res = await adminGetAccountTeacher();
      if (res.state) {
        let accounts = res.data.reduce((accumulator, val) => {
          accumulator.push({ value: val.id, label: `${val.username} | ${val.full_name}` });
          return accumulator;
        }, []);
        setOptAccount(accounts);
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
    fetchAccountTeacher();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (isSubmit) {
      const submitForm = async () => {
        const res = await adminUpdatePassword(formData, selectedAccount.value);
        if (mounted) {
          if (res.state) {
            setIsSubmit(false);
            alertMessage({ type: 'success', message: 'Đặt lại mật khẩu thành công.' });
            setIsLoading(false);
            reset();
          } else {
            setIsSubmit(false);
            setIsLoading(false);
            alertMessage({ type: 'error', message: 'Đặt lại mật khẩu thất bại.' });
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
    return () => mounted = false;
  }, [isSubmit]);

  const handleSelectChangeAccount = (selected) => {
    setSelectedAccount(selected);
    setIsChangeAccount(true);
  }

  const onSubmit = (data) => {
    if (isChangeAccount) {
      setIsLoading(true);
      setFormData(data);
      setIsSubmit(true);
    } else {
      alertMessage({ type: 'error', message: 'Vui lòng chọn tài khoản' });
    }
  }

  return (
    <Container>
      {isLoading && <Loading />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col lg={7} xs={12} className="col-form-change-pass-teacher">
            <Form.Group>
              <Form.Label>Chọn tài khoản</Form.Label>
              <Select
                value={selectedAccount}
                onChange={handleSelectChangeAccount}
                isClearable={false}
                isSearchable={true}
                options={optAccount}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Mật khẩu mới</Form.Label>
              <Form.Control size="sm" type="password" name="password" ref={register} placeholder="Mật khẩu" />
              <Form.Text className="text-muted error-message">
                <span className="msg">{errors.password?.message}</span>
              </Form.Text>
            </Form.Group>
            <Button type="submit" variant="outline-secondary btn-create-teacher">Đặt lại mật khẩu</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default ResetPassword;