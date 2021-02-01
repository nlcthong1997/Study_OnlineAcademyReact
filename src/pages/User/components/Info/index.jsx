import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import firebase from '../../../../utils/firebase';

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

import Swal from 'sweetalert2';
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

  const uploadImageFirebase = async (img) => {
    if (user.img_name !== '') {
      await firebase
        .storage()
        .ref(`images/avatar`)
        .child(`user-id-${user.id}-${user.img_name}`)
        .delete();
    }

    await firebase
      .storage()
      .ref(`images/avatar`)
      .child(`user-id-${user.id}-${img.name}`)
      .put(img);

    return await firebase
      .storage()
      .ref(`images/avatar`)
      .child(`user-id-${user.id}-${img.name}`)
      .getDownloadURL();
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    const form = { ...data };
    delete form.image;

    if (chooseFile) {
      form.img_url = await uploadImageFirebase(data.image[0]);
      form.img_name = data.image[0].name;
    } else {
      form.img_url = user.img_url;
      form.img_name = user.img_name;
    }
    const result = await update(form);

    setUser({
      ...user,
      img_url: form.img_url,
      img_name: form.img_name
    });
    setIsLoading(false);

    const swal = Swal.mixin({ toast: true })
    if (result.state) {
      swal.fire({
        width: 400,
        icon: 'success',
        title: 'Cập nhật thông tin thành công.',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      swal.fire({
        width: 400,
        icon: 'error',
        title: 'Cập nhật thông tin thất bại.',
        showConfirmButton: false,
        timer: 1500
      });
    }
  }

  return (
    <>
      {isLoading && <Loading />}
      <Loading />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col lg={8}>
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
              <Form.Control size="sm" type="text" name="phone" defaultValue={user.phone} ref={register} placeholder="Nhập họ tên" />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.phone?.message}</span>
              </Form.Text>
            </Form.Group>

            <Button type="submit" className="btn-update" variant="outline-dark">Cập nhật</Button>
          </Col>
          <Col lg={4}>
            <Image className="avatar" src={user.img_url} roundedCircle />
            <Form.Group>
              <Form.File id="exampleFormControlFile1" name="image" onChange={handleChooseFile} ref={register} />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
}

export default Info;