import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';
import { getUser } from '../../../../services/user';
import './index.css';

const schema = yup.object().shape({
  full_name: yup.string().required('Ho ten la bat buoc'),
  // age: yup.number().required(),
});

const Info = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(AppContext);
  const [user, setUser] = useState({
    username: '',
    full_name: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      let res = await getUser();
      if (res === null) {
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

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col lg={8}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Tài khoản</Form.Label>
            <Form.Control size="sm" type="text" defaultValue={user.username} readOnly />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label>Họ và tên</Form.Label>
            <Form.Control size="sm" type="text" name="full_name" defaultValue={user.full_name} ref={register} placeholder="Nhập họ tên" />
            <Form.Text className="text-muted">
              {/* {errors.full_name && <span className="msg"></span>} */}
              {errors.full_name?.message}
            </Form.Text>
          </Form.Group>

          <Button type="submit" variant="outline-success">Cập nhật</Button>
        </Col>
        <Col lg={4}>
          <Image className="avatar" src="https://instagram.fsgn4-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/p750x750/142670872_414856316404407_1542559797153184332_n.jpg?_nc_ht=instagram.fsgn4-1.fna.fbcdn.net&_nc_cat=103&_nc_ohc=lvccsqr4Wl8AX8nixaj&tp=1&oh=4b95280ecdc6ef37f7be2d043c3ec875&oe=603C3C67" roundedCircle />
          <Form.Group>
            <Form.File id="exampleFormControlFile1" name="file" ref={register} />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

export default Info;