import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  uploadToFirebase,
  removeToFirebase,
  stringGenerate,
  alertMessage
} from '../../../../utils/common';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Loading from '../../../../components/Loading';

import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';
import { getUser } from '../../../../services/user';
import { update } from '../../../../services/user';
import './index.css';

const schema = yup.object().shape({
  full_name: yup.string(),
  address: yup.string(),
  phone: yup
    .string()
    .max(11, 'Số điện thoại của bạn không hợp lệ')
    .min(10, 'Số điện thoại của bạn không hợp lệ')
});

const Info = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(AppContext);
  const [user, setUser] = useState({
    id: '',
    username: '',
    full_name: '',
    phone: '',
    address: '',
    img_url: '',
    img_name: ''
  });
  const [chooseFile, setChooseFile] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      let res = await getUser();
      if (res.authenticated === false) {
        dispatch({
          type: LOGOUT,
          payload: {
            isLogged: false
          }
        });
      } else {
        setUser(res);
      }
    }
    fetchData();
  }, []);

  const handleChooseFile = (event) => {
    const file = event.target.files[0];
    const previewFile = URL.createObjectURL(file);
    setUser({ ...user, img_url: previewFile });
    setChooseFile(true);
  }

  useEffect(() => {
    let mounted = true;
    if (isSubmit) {
      const submitForm = async () => {
        let isProcessError;
        const result = await update(formData);
        if (mounted) {
          if (result.state) {
            setIsSubmit(false);
            if (user.img_name !== '' && user.img_name !== null) {
              isProcessError = await removeToFirebase({
                fileName: user.img_name,
                folderUrl: `images/avatar/user-${user.id}`
              });
              setChooseFile(false);
            }
            setUser({
              ...user,
              img_url: formData.img_url,
              img_name: formData.img_name
            });
            if (isProcessError === null) {
              alertMessage({ type: 'warning', message: 'Đã có một lỗi nhỏ trong quá trình cập nhật.' });
            } else {
              alertMessage({ type: 'success', message: 'Cập nhật thông tin thành công.' });
            }
            setIsLoading(false);
          } else {
            setIsSubmit(false);
            alertMessage({ type: 'error', message: 'Cập nhật thông tin thất bại.' });
            setIsLoading(false);
            if (result.auth !== undefined && result.auth.authenticated === false) {
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
    return mounted = false;

  }, [isSubmit, setUser, user, formData]);

  const onSubmit = async (data) => {
    setIsLoading(true);
    const form = { ...data };
    delete form.image;

    let imgName = stringGenerate();
    if (chooseFile) {
      imgName += data.image[0].name;
      const url = await uploadToFirebase({
        file: data.image[0],
        fileName: imgName,
        folderUrl: `images/avatar/user-${user.id}`
      });

      if (url === null) {
        alertMessage({ type: 'error', message: 'Cập nhật thất bại' });
        setIsLoading(false);
        setChooseFile(false);
        return;
      }
      form.img_url = url;
      form.img_name = imgName;
    } else {
      form.img_url = user.img_url;
      form.img_name = user.img_name;
    }

    setFormData(form);
    setIsSubmit(true);
  }

  return (
    <Container>
      {isLoading && <Loading />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col lg={8} className="col-relative">
            <Form.Group>
              <Form.Label>Tài khoản</Form.Label>
              <Form.Control size="sm" type="text" defaultValue={user.username} readOnly />
              <Form.Text className="text-muted message">
                <span className="msg"></span>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control size="sm" type="text" defaultValue={user.email} readOnly />
              <Form.Text className="text-muted message">
                <span className="msg"></span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Họ và tên</Form.Label>
              <Form.Control size="sm" type="text" name="full_name" defaultValue={user.full_name} ref={register} placeholder="Nhập họ tên" />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.full_name?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control as="textarea" name="address" defaultValue={user.address} ref={register} rows={3} />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.address?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Điện thoại</Form.Label>
              <Form.Control size="sm" type="text" name="phone" defaultValue={user.phone} ref={register} placeholder="Nhập số điện thoại" />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.phone?.message}</span>
              </Form.Text>
            </Form.Group>

            <Button type="submit" className="btn-update" variant="outline-dark">Cập nhật</Button>
          </Col>
          <Col lg={4}>
            <Image className="avatar" src={user.img_url} roundedCircle />
            <Form.Group>
              <Form.File id="exampleFormControlFile1" name="image" onChange={handleChooseFile} ref={register} accept="image/*" />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Info;