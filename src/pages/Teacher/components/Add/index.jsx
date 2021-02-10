import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import firebase from '../../../../utils/firebase';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Loading from '../../../../components/Loading';

import { getInitCategories } from '../../../../services/category';
import { getUser } from '../../../../services/user';
import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';
import { create } from '../../../../services/course';
import { stringGenerate } from '../../../../utils/common';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import './index.css';

const schema = yup.object().shape({
  title: yup.string().required('Bạn chưa nhập tiêu đề khóa học'),
  name: yup.string().required('Bạn chưa nhập tên khóa học'),
  sort_desc: yup.string().required('Bạn chưa nhập mô tả')
});

const Add = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(AppContext);
  const Toast = Swal.mixin({ toast: true });

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [previewImgLarge, setPreviewImgLarge] = useState('');
  const [previewImgSmall, setPreviewImgSmall] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState({
    id: null,
    name: null,
  })

  useEffect(() => {
    const fetchUser = async () => {
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
    fetchUser();
    const fetchData = async () => {
      let result = await getInitCategories();
      let initial = [];
      let remap = result.reduce((accumulator, currentValue, currentIndex, array) => {
        accumulator.push({ value: currentValue.id, label: currentValue.name });
        return accumulator;
      }, initial);
      setCategories(remap);
    }
    fetchData();
  }, []);

  const handleFile = (file) => {
    let type = file ? file.type.split('/')[0] : null;
    if (type !== 'image') {
      return null;
    }
    let path = URL.createObjectURL(file);
    return path;
  }

  const handleChooseImaSmall = (event) => {
    let path = handleFile(event.target.files[0]);
    if (path === null) {
      Toast.fire({
        title: 'Vui lòng chọn file là ảnh!',
        position: 'top-right',
        width: 400,
        timer: 2000,
        icon: 'warning',
        showConfirmButton: false
      });
    } else {
      setPreviewImgSmall(path);
    }
  }

  const handleChooseImaLarge = (event) => {
    let path = handleFile(event.target.files[0]);
    if (path === null) {
      Toast.fire({
        title: 'Vui lòng chọn file là ảnh!',
        position: 'top-right',
        width: 400,
        timer: 2000,
        icon: 'warning',
        showConfirmButton: false
      })
    } else {
      setPreviewImgLarge(path);
    }
  }

  const uploadImageFirebase = async (img, name) => {
    await firebase
      .storage()
      .ref(`images/courses`)
      .child(`teacher-id-${user.id}-${name}`)
      .put(img);

    return await firebase
      .storage()
      .ref(`images/courses`)
      .child(`teacher-id-${user.id}-${name}`)
      .getDownloadURL();
  }

  const deleteOldFile = async (name) => {
    await firebase
      .storage()
      .ref(`images/courses`)
      .child(`teacher-id-${user.id}-${name}`)
      .delete();
  }

  const onSubmit = async (data) => {
    setIsLoading(true);

    const form = { ...data };
    delete form.small_image;
    delete form.large_image;

    if (previewImgLarge === '' || previewImgSmall === '') {
      Toast.fire({
        title: 'Vui lòng chọn ảnh cho khóa học!',
        position: 'top-right',
        width: 400,
        timer: 2000,
        icon: 'warning',
        showConfirmButton: false
      })
      setIsLoading(false);
      return
    }

    let random = stringGenerate();
    let img_name = random + data.small_image[0].name;
    let img_large_name = random + data.large_image[0].name;

    form.img = await uploadImageFirebase(data.small_image[0], img_name);
    form.img_large = await uploadImageFirebase(data.large_image[0], img_large_name);
    form.img_name = img_name;
    form.img_large_name = img_large_name;
    form.teacher = user.full_name;
    form.detail_desc = description;
    form.categories_id = +data.categories_id;
    form.price = +data.price;
    form.price_promo = +data.price_promo;
    const res = await create(form);
    if (res.state) {
      Toast.fire({
        title: 'Tạo khóa học thành công',
        position: 'top-right',
        width: 400,
        timer: 2000,
        icon: 'success',
        showConfirmButton: false
      })

    } else {
      await deleteOldFile(img_name);
      await deleteOldFile(img_large_name);

      Toast.fire({
        title: 'Tạo khóa học thất bại',
        position: 'top-right',
        width: 400,
        timer: 2000,
        icon: 'error',
        showConfirmButton: false
      })

      if (res.auth !== undefined && res.auth.authenticated === false) {
        dispatch({
          type: LOGOUT,
          payload: {
            isLogged: false
          }
        });
      }
    }
    setIsLoading(false);
  }

  return (
    <Container>
      {isLoading && <Loading />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col lg={9} xs={12} className="col-form-create">
            <Form.Group>
              <Form.Label>Lĩnh vực</Form.Label>
              <select className="form-control" name="categories_id" ref={register}>
                {categories.map((opt, idx) =>
                  <option key={idx} defaultValue={idx === 0 ? opt.value : null} value={opt.value}>{opt.label}</option>
                )}
              </select>
            </Form.Group>

            <Form.Group>
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control size="sm" type="text" name="title" ref={register} placeholder="Nhập tiêu đề" />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.title?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Tên khóa học</Form.Label>
              <Form.Control size="sm" type="text" name="name" ref={register} placeholder="Nhập tên khóa học" />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.name?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Mô tả ngắn</Form.Label>
              <Form.Control as="textarea" name="sort_desc" ref={register} rows={3} />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.sort_desc?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Mô tả chi tiết</Form.Label>
              <ReactQuill style={{ height: '200px', marginBottom: '35px' }} theme="snow" name="detail_desc" value={description} onChange={setDescription} ref={register} />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.detail_desc?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ảnh nhỏ</Form.Label><br />
              <Image className="avatar" src={previewImgSmall} roundedCircle />
              <Form.File name="small_image" onChange={handleChooseImaSmall} ref={register} accept="image/*" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ảnh lớn</Form.Label><br />
              <Image className="avatar" src={previewImgLarge} roundedCircle />
              <Form.File name="large_image" onChange={handleChooseImaLarge} ref={register} accept="image/*" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Giá</Form.Label>
              <Form.Control size="sm" type="number" name="price" ref={register} placeholder="Nhập giá khóa học" />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.price?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Giá khuyến mãi (nếu có)</Form.Label>
              <Form.Control size="sm" type="number" name="price_promo" ref={register} placeholder="Nhập giá khóa học" />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.price_promo?.message}</span>
              </Form.Text>
            </Form.Group>

            <Button type="submit" className="btn-create" variant="outline-dark">Tạo khóa học</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Add;