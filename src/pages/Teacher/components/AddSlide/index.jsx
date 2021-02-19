import React, { useState, useContext, useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Loading from '../../../../components/Loading';

import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';
import {
  stringGenerate,
  uploadToFirebase,
  removeToFirebase,
  alertMessage
} from '../../../../utils/common';

import './index.css';
import { create } from '../../../../services/slide';

const schema = yup.object().shape({
  name: yup.string().required('Bạn chưa nhập tên bài giảng')
});

const AddSlide = ({ courseId, user, onNewSlide, onShowAddVideo }) => {
  const { dispatch } = useContext(AppContext);
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const [isLoading, setIsLoading] = useState(false);
  const [previewPdf, setPreviewPdf] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState(null);

  const handleShowAddVideo = () => {
    onShowAddVideo();
  }

  const handleChooseFile = (event) => {
    let file = event.target.files[0] || null;
    let type = file ? file.type.split('/')[1] : null;
    if (type !== 'pdf') {
      setPreviewPdf('');
      return;
    }
    setPreviewPdf(URL.createObjectURL(file));
  }

  useEffect(() => {
    let mounted = true;
    if (isSubmit) {
      const submitForm = async () => {
        const res = await create(formData);
        if (mounted) {
          if (res.state) {
            setIsSubmit(false);
            alertMessage({ type: 'success', message: 'Tạo slide bài giảng thành công' });
            onNewSlide({ ...formData, id: res.data.id });
            setIsLoading(false);
            setPreviewPdf('');
            reset();
          } else {
            setIsSubmit(false);
            await removeToFirebase({
              fileName: formData.slide_name,
              folderUrl: `slides/courses/${courseId}`
            });
            alertMessage({ type: 'error', message: 'Tạo slide bài giảng thất bại' });
            setIsLoading(false);
            setPreviewPdf('');
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

  }, [isSubmit, formData, courseId, onNewSlide, reset])

  const onSubmit = async (data) => {
    setIsLoading(true);
    const form = { ...data };
    delete form.slide;

    if (previewPdf === '') {
      alertMessage({ type: 'warning', message: 'Vui lòng chọn file là pdf' });
      setIsLoading(false);
      return;
    }

    let slideName = `teacher-id-${user.id}-` + stringGenerate() + data.slide[0].name;
    const url = await uploadToFirebase({
      file: data.slide[0],
      fileName: slideName,
      folderUrl: `slides/courses/${courseId}`
    })
    if (url === null) {
      alertMessage({ type: 'error', message: 'Tạo slide bài giảng thất bại' });
      setIsLoading(false);
      setPreviewPdf('');
      reset();
      return;
    }
    form.url = url;
    form.slide_name = slideName;
    form.courses_id = courseId;

    setFormData(form);
    setIsSubmit(true);
  }

  return (
    <>
      {isLoading && <Loading />}
      <Button variant="outline-secondary" className="btn-add-video" onClick={handleShowAddVideo} >
        <i className="fa fa-video-camera"></i> Thêm Video
      </Button>
      &nbsp;
      <Button variant="secondary" className="btn-add-slide">
        <i className="fa fa-file-pdf-o"></i> Thêm Slide
      </Button>
      <Form onSubmit={handleSubmit(onSubmit)} className="form-create-slide">
        <Form.Group>
          <Form.Label>Tên slide bài giảng</Form.Label>
          <Form.Control size="sm" type="text" name="name" ref={register} placeholder="Nhập tên slide bài giảng" />
          <Form.Text className="text-muted message">
            <span className="msg">{errors.name?.message}</span>
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Slide bài giảng (.pdf)</Form.Label><br />
          <embed width="191" height="207" src={previewPdf} type="application/pdf" className="preview"></embed>
          <Form.File name="slide" onChange={handleChooseFile} ref={register} accept="application/pdf" />
        </Form.Group>

        <Button type="submit" className="btn-create-slide" variant="outline-dark">Thêm slide</Button>
      </Form>
    </>
  );
}

export default AddSlide;