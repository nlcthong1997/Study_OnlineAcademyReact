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
import { adminCreateCategory } from '../../../../services/admin';

import './index.css';
import { LOGOUT } from '../../../../AppTypes';
import AppContext from '../../../../AppContext';

const schema = yup.object().shape({
  name: yup
    .string()
    .required('Tên lĩnh vực là bắt buộc')
});

const CreateCategories = () => {
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
        const res = await adminCreateCategory(formData);
        if (mounted) {
          if (res.state) {
            setIsSubmit(false);
            setIsLoading(false);
            alertMessage({ type: 'success', message: 'Tạo lĩnh vực thành công.' });
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
  }, [isSubmit, formData, reset])

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
          <Col lg={7} xs={12} className="col-form-create-category">
            <Form.Group>
              <Form.Label>Tên lĩnh vực</Form.Label>
              <Form.Control size="sm" type="text" name="name" ref={register} placeholder="Tên lĩnh vực" autoFocus />
              <Form.Text className="text-muted error-message">
                <span className="msg">{errors.name?.message}</span>
              </Form.Text>
            </Form.Group>
            <Button type="submit" variant="outline-secondary btn-create-category">Tạo lĩnh vực</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default CreateCategories;