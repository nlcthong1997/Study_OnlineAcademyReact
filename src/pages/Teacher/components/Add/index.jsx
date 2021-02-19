import React, { useState, useEffect, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

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
import {
  stringGenerate,
  uploadToFirebase,
  removeToFirebase,
  alertMessage
} from '../../../../utils/common';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './index.css';

const schema = yup.object().shape({
  title: yup.string().required('Bạn chưa nhập tiêu đề khóa học'),
  name: yup.string().required('Bạn chưa nhập tên khóa học'),
  sort_desc: yup.string().required('Bạn chưa nhập mô tả')
});

const Add = () => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [previewImgLarge, setPreviewImgLarge] = useState('');
  const [previewImgSmall, setPreviewImgSmall] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState({
    id: null,
    name: null,
  })
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
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
    fetchUser();
    const fetchData = async () => {
      let result = await getInitCategories();
      let initial = [];
      let remap = result.data.reduce((accumulator, currentValue) => {
        accumulator.push({ value: currentValue.id, label: currentValue.name });
        return accumulator;
      }, initial);
      setCategories(remap);
    }
    fetchData();
  }, []);

  useEffect(() => {
    let mounted = true;
    if (isSubmit) {
      const submitForm = async () => {
        const res = await create(formData);
        if (mounted) {
          if (res.state) {
            setIsSubmit(false);
            alertMessage({ type: 'success', message: 'Tạo khóa học thành công.' });
            setIsLoading(false);
            setPreviewImgSmall('');
            setPreviewImgLarge('');
            reset();
          } else {
            setIsSubmit(false);
            await removeToFirebase({
              fileName: formData.img_name,
              folderUrl: `images/courses/teacher-id-${user.id}`
            });
            await removeToFirebase({
              fileName: formData.img_large_name,
              folderUrl: `images/courses/teacher-id-${user.id}`
            });
            alertMessage({ type: 'error', message: 'Tạo khóa học thất bại.' });
            setIsLoading(false);
            setPreviewImgSmall('');
            setPreviewImgLarge('');
            reset();
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

  }, [isSubmit, formData, reset, user]);

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
      alertMessage({ type: 'warning', message: 'Vui lòng chọn file là ảnh!' });
      setPreviewImgSmall('')
    } else {
      setPreviewImgSmall(path);
    }
  }

  const handleChooseImaLarge = (event) => {
    let path = handleFile(event.target.files[0]);
    if (path === null) {
      alertMessage({ type: 'warning', message: 'Vui lòng chọn file là ảnh!' });
      setPreviewImgLarge('');
    } else {
      setPreviewImgLarge(path);
    }
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    const form = { ...data };
    delete form.small_image;
    delete form.large_image;

    if (previewImgLarge === '' || previewImgSmall === '') {
      alertMessage({ type: 'warning', message: 'Vui lòng chọn ảnh cho khóa học!' });
      setIsLoading(false);
      return
    }

    let imgName = stringGenerate() + data.small_image[0].name;
    let imgLargeName = stringGenerate() + data.large_image[0].name;

    let urlImg = await uploadToFirebase({
      file: data.small_image[0],
      fileName: imgName,
      folderUrl: `images/courses/teacher-id-${user.id}`
    });
    let urlLargeImg = await uploadToFirebase({
      file: data.large_image[0],
      fileName: imgLargeName,
      folderUrl: `images/courses/teacher-id-${user.id}`
    });
    if (urlImg === null || urlLargeImg === null) {
      alertMessage({ type: 'error', message: 'Đã có lỗi xảy ra!' });
      setIsLoading(false);
      setPreviewImgSmall('');
      setPreviewImgLarge('');
      reset();
      return;
    }
    form.img = urlImg;
    form.img_large = urlLargeImg;
    form.img_name = imgName;
    form.img_large_name = imgLargeName;
    form.teacher = user.full_name;
    form.detail_desc = description;
    form.categories_id = +data.categories_id;
    form.price = +data.price;
    form.price_promo = +data.price_promo;

    setFormData(form);
    setIsSubmit(true);
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
              <ReactQuill
                theme="snow"
                name="detail_desc"
                style={{ height: '200px', marginBottom: '35px' }}
                value={description}
                onChange={setDescription}
                ref={register}
              />
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

            <Button type="submit" className="btn-create" variant="outline-dark">Thêm khóa học</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Add;