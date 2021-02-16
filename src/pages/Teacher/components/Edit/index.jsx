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
import Select from 'react-select';
import Loading from '../../../../components/Loading';

import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';
import { getUser } from '../../../../services/user';
import { getInitCategories } from '../../../../services/category';
import { coursesOfTeacher, getCourseOfTeacherById, update, deleteCourse } from '../../../../services/course';
import {
  stringGenerate,
  uploadToFirebase,
  removeToFirebase,
  alertMessage
} from '../../../../utils/common';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import './index.css';

const schema = yup.object().shape({
  title: yup.string().required('Bạn chưa nhập tiêu đề khóa học'),
  name: yup.string().required('Bạn chưa nhập tên khóa học'),
  sort_desc: yup.string().required('Bạn chưa nhập mô tả')
});

const Edit = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(AppContext);

  const [isLoading, setIsLoading] = useState(false);
  const [isChooseCourse, setIsChooseCourse] = useState(false);
  const [course, setCourse] = useState([]);
  const optStatus = [
    { value: 'completed', label: 'Hoàn thành' },
    { value: 'pending', label: 'Chưa hoàn thành' }
  ];
  const [selectedStatus, setSelectedStatus] = useState({ value: null, label: null });

  const [optCourses, setOptCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState({ value: null, label: 'Chọn khóa học ...' });

  const [optCategories, setOptCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState({ value: null, label: null });

  const [isChooseImgLarge, setIsChooseImgLarge] = useState(false);
  const [isChooseImgSmall, setIsChooseImgSmall] = useState(false);
  const [previewImgLarge, setPreviewImgLarge] = useState('');
  const [previewImgSmall, setPreviewImgSmall] = useState('');
  const [description, setDescription] = useState('');
  const [user, setUser] = useState({
    id: null,
    name: null,
  });

  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState(null);
  const [isDelete, setIsDelete] = useState(false);

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

    const fetchCourses = async () => {
      let result = await coursesOfTeacher();
      if (result.authenticated === false) {
        dispatch({
          type: LOGOUT,
          payload: {
            isLogged: false
          }
        });
        return;
      }
      let initial = [];
      let remap = result.reduce((accumulator, currentValue) => {
        accumulator.push({ value: currentValue.id, label: currentValue.name });
        return accumulator;
      }, initial);
      setOptCourses(remap)
    }

    const fetchCategories = async () => {
      let result = await getInitCategories();
      let initial = [];
      let remap = result.reduce((accumulator, currentValue) => {
        accumulator.push({ value: currentValue.id, label: currentValue.name });
        return accumulator;
      }, initial);
      setOptCategories(remap);
    }

    fetchUser();
    fetchCourses();
    fetchCategories();
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
      alertMessage({ type: 'warning', message: 'Vui lòng chọn file là ảnh!' });
    } else {
      setIsChooseImgSmall(true);
      setPreviewImgSmall(path);
    }
  }

  const handleChooseImaLarge = (event) => {
    let path = handleFile(event.target.files[0]);
    if (path === null) {
      alertMessage({ type: 'warning', message: 'Vui lòng chọn file là ảnh!' });
    } else {
      setIsChooseImgLarge(true);
      setPreviewImgLarge(path);
    }
  }

  const handleSelectChangeCourse = async (selected) => {
    setIsChooseCourse(true);
    setSelectedCourse(selected);
    let res = await getCourseOfTeacherById(selected.value);
    if (res.authenticated === false) {
      dispatch({
        type: LOGOUT,
        payload: {
          isLogged: false
        }
      });
      return;
    }
    setCourse(res);
    let category = optCategories.filter(cat => cat.value === res.categories_id);
    setSelectedCategories(category[0]);
    setDescription(res.detail_desc);
    setPreviewImgSmall(res.img);
    setPreviewImgLarge(res.img_large);
    let tus = optStatus.filter(sts => sts.value === res.status);
    setSelectedStatus(tus[0]);
  }

  const handleSelectChangeCategories = (selected) => {
    setSelectedCategories(selected);
  }

  const handleSelectChangeStatus = (selected) => {
    setSelectedStatus(selected);
  }

  useEffect(() => {
    let mounted = true;
    if (isSubmit) {
      const submitForm = async () => {
        let isProcessErrorSmall, isProcessErrorLarge;
        let res = await update(formData, course.id);
        if (mounted) {
          if (res.state) {
            setIsSubmit(false);
            if (isChooseImgSmall) {
              isProcessErrorSmall = await removeToFirebase({
                fileName: course.img_name,
                folderUrl: `images/courses/teacher-id-${user.id}`
              });
              setIsChooseImgSmall(false);
            }
            if (isChooseImgLarge) {
              isProcessErrorLarge = await removeToFirebase({
                fileName: course.img_large_name,
                folderUrl: `images/courses/teacher-id-${user.id}`
              });
              setIsChooseImgLarge(false);
            }
            if (isProcessErrorSmall === null || isProcessErrorLarge === null) {
              alertMessage({ type: 'warning', message: 'Đã có một lỗi nhỏ xảy ra trong quá trình cập nhật' });
            } else {
              alertMessage({ type: 'success', message: 'Cập nhật thành công.' });
            }
            setIsLoading(false);
          } else {
            setIsSubmit(false);
            if (isChooseImgSmall) {
              isProcessErrorSmall = await removeToFirebase({
                fileName: formData.img_name,
                folderUrl: `images/courses/teacher-id-${user.id}`
              });
              setIsChooseImgSmall(false);
            }
            if (isChooseImgLarge) {
              isProcessErrorLarge = await removeToFirebase({
                fileName: formData.img_large_name,
                folderUrl: `images/courses/teacher-id-${user.id}`
              });
              setIsChooseImgLarge(false);
            }
            if (isProcessErrorSmall === null || isProcessErrorLarge === null) {
              alertMessage({ type: 'warning', message: 'Đã có một lỗi nhỏ xảy ra trong quá trình cập nhật' });
            } else {
              alertMessage({ type: 'error', message: 'Cập nhật thất bại.' });
            }
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

    return () => mounted = false;

  }, [isSubmit, formData, course, user, isChooseImgSmall, isChooseImgLarge])

  const onSubmit = async (data) => {
    setIsLoading(true);
    const form = { ...data };
    delete form.large_image;
    delete form.small_image;

    let imgName = stringGenerate();
    let imgLargeName = stringGenerate();
    if (isChooseImgSmall) {
      imgName += data.small_image[0].name;
      let url = await uploadToFirebase({
        file: data.small_image[0],
        fileName: imgName,
        folderUrl: `images/courses/teacher-id-${user.id}`
      });
      if (url === null) {
        alertMessage({ type: 'warning', message: 'Có lỗi xảy ra trong quá trình cập nhật!' });
        setIsChooseImgSmall(false);
        setIsLoading(false);
        return;
      }
      form.img = url;
      form.img_name = imgName;
    }

    if (isChooseImgLarge) {
      imgLargeName += data.large_image[0].name;
      let url = await uploadToFirebase({
        file: data.large_image[0],
        fileName: imgLargeName,
        folderUrl: `images/courses/teacher-id-${user.id}`
      });
      if (url === null) {
        alertMessage({ type: 'warning', message: 'Có lỗi xảy ra trong quá trình cập nhật!' });
        setIsChooseImgLarge(false);
        setIsLoading(false);
        return;
      }
      form.img_large = url;
      form.img_large_name = imgLargeName;
    }

    form.detail_desc = description;
    form.status = selectedStatus.value;
    form.categories_id = selectedCategories.value;
    form.price = +data.price;
    form.price_promo = +data.price_promo;

    setFormData(form);
    setIsSubmit(true);
  }

  const onRemoveCourse_clicked = async () => {
    let resToast = await Swal.fire({
      title: 'Bạn có muốn xóa khóa học này ?',
      showCancelButton: true,
      confirmButtonText: `Xóa`,
    });

    if (resToast.isConfirmed) {
      setIsLoading(true);
      setIsDelete(true);
    }
  }

  useEffect(() => {
    let mounted = true;
    if (isDelete) {
      const actionDelete = async () => {
        let res = await deleteCourse(course.id);
        if (mounted) {
          if (res.state) {
            await removeToFirebase({
              fileName: res.course.img_name,
              folderUrl: `images/courses/teacher-id-${user.id}`
            });
            await removeToFirebase({
              fileName: res.course.img_large_name,
              folderUrl: `images/courses/teacher-id-${user.id}`
            });
            if (res.videos.length > 0) {
              res.videos.map(async (video) => {
                await removeToFirebase({
                  fileName: video.video_name,
                  folderUrl: `videos/courses/${course.id}`
                })
              });
            }
            if (res.slides.length > 0) {
              res.slides.map(async (slide) => {
                await removeToFirebase({
                  fileName: slide.slide_name,
                  folderUrl: `slides/courses/${course.id}`
                })
              });
            }
            alertMessage({ type: 'success', message: 'Xóa khóa học thành công.' });
            setIsDelete(false);
            setIsLoading(false);
          } else {
            alertMessage({ type: 'error', message: 'Không thể xóa khóa học này.' });
            setIsDelete(false);
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
      actionDelete();
    }
    return () => mounted = false;

  }, [isDelete, course, user]);

  return (
    <Container>
      {isLoading && <Loading />}
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col lg={9} xs={12} className="col-form-edit">
            <Form.Group>
              <Form.Label>Khóa học</Form.Label>
              <Select
                value={selectedCourse}
                onChange={handleSelectChangeCourse}
                isClearable={false}
                isSearchable={true}
                options={optCourses}
              />
            </Form.Group>

            {isChooseCourse &&
              <>
                <Form.Group>
                  <Form.Label>Trạng thái</Form.Label>
                  <Select
                    value={selectedStatus}
                    onChange={handleSelectChangeStatus}
                    isClearable={false}
                    isSearchable={true}
                    options={optStatus}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Lĩnh vực</Form.Label>
                  <Select
                    value={selectedCategories}
                    onChange={handleSelectChangeCategories}
                    isClearable={false}
                    isSearchable={true}
                    options={optCategories}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Tiêu đề</Form.Label>
                  <Form.Control size="sm" type="text" name="title" defaultValue={course.title} ref={register} placeholder="Nhập tiêu đề" />
                  <Form.Text className="text-muted message">
                    <span className="msg">{errors.title?.message}</span>
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Tên khóa học</Form.Label>
                  <Form.Control size="sm" type="text" name="name" defaultValue={course.name} ref={register} placeholder="Nhập tên khóa học" />
                  <Form.Text className="text-muted message">
                    <span className="msg">{errors.name?.message}</span>
                  </Form.Text>
                </Form.Group>

                <Form.Group controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Mô tả ngắn</Form.Label>
                  <Form.Control as="textarea" name="sort_desc" defaultValue={course.sort_desc} ref={register} rows={3} />
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
                    ref={register} />
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
                  <Form.Control size="sm" type="number" name="price" defaultValue={course.price} ref={register} placeholder="Nhập giá khóa học" />
                  <Form.Text className="text-muted message">
                    <span className="msg">{errors.price?.message}</span>
                  </Form.Text>
                </Form.Group>

                <Form.Group>
                  <Form.Label>Giá khuyến mãi (nếu có)</Form.Label>
                  <Form.Control size="sm" type="number" name="price_promo" defaultValue={course.price_promo} ref={register} placeholder="Nhập giá khóa học" />
                  <Form.Text className="text-muted message">
                    <span className="msg">{errors.price_promo?.message}</span>
                  </Form.Text>
                </Form.Group>

                <Button type="submit" className="btn-edit" variant="outline-dark">Chỉnh sửa khóa học</Button>
              </>
            }
          </Col>
          <Col lg={3} xs={12} className="col-btn-remove">
            {(course.qty_student_registed === 0 || course.qty_student_registed === null) && isChooseCourse &&
              <Button className="btn-remove" variant="outline-danger" onClick={onRemoveCourse_clicked}>
                <i className="fa fa-trash"></i> Xóa khóa học
              </Button>
            }
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Edit;