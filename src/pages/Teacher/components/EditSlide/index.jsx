import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loading from '../../../../components/Loading';

import {
  stringGenerate,
  alertMessage,
  uploadToFirebase,
  removeToFirebase
} from '../../../../utils/common';
import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';

import './index.css'
import { update } from '../../../../services/slide';

const schema = yup.object().shape({
  name: yup.string().required('Bạn chưa nhập tên slide bài giảng')
});

const EditSlide = ({ courseId, slideUpdate, user, onShowEditVideo, onUpdateSlide }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isChooseFile, setIsChooseFile] = useState(false);
  const [previewSlide, setPreviewSlide] = useState(null);
  const [slide, setSlide] = useState({
    name: ''
  });

  useEffect(() => {
    setPreviewSlide(slideUpdate.url);
    setSlide(slideUpdate);
  }, [slideUpdate])

  const handleShowEditVideo = () => {
    onShowEditVideo();
  }


  const handleChooseFile = (event) => {
    let file = event.target.files[0] || null;
    let type = file ? file.type.split('/')[1] : null;
    if (type !== 'pdf') {
      return;
    }
    setPreviewSlide(URL.createObjectURL(file));
    setIsChooseFile(true);
  }

  const onSubmit = async (data) => {
    setIsLoading(true);

    const form = { ...data };
    delete form.slide;

    let slideName = `teacher-id-${user.id}-` + stringGenerate();
    if (isChooseFile) {
      slideName += data.slide[0].name;
      const url = await uploadToFirebase({
        file: data.slide[0],
        fileName: slideName,
        folderUrl: `slides/courses/${courseId}`
      })
      if (url === null) {
        alertMessage({ type: 'error', message: 'Cập nhật slide bài giảng thất bại' });
        setIsLoading(false);
        setIsChooseFile(false);
        return;
      }
      form.url = url;
      form.slide_name = slideName;
    } else {
      form.url = slideUpdate.url;
      form.slide_name = slideUpdate.slide_name;
    }

    let isProcessError;
    const res = await update(form, slideUpdate.id);
    if (res.state) {
      if (isChooseFile) {
        isProcessError = await removeToFirebase({
          fileName: slideUpdate.slide_name,
          folderUrl: `slides/courses/${courseId}`
        });
      }
      if (isProcessError === null) {
        alertMessage({ type: 'warning', message: 'Đã có một lỗi nhỏ xảy ra trong quá trình cập nhật' });
      } else {
        alertMessage({ type: 'success', message: 'Cập nhật thành công.' });
      }
      onUpdateSlide({ ...form, id: slideUpdate.id });

    } else {
      if (isChooseFile) {
        isProcessError = await removeToFirebase({
          fileName: slideName,
          folderUrl: `slides/courses/${courseId}`
        });
      }

      if (isProcessError === null) {
        alertMessage({ type: 'error', message: 'Đã có lỗi xảy ra trong quá trình cập nhật' });
      } else {
        alertMessage({ type: 'error', message: 'Cập nhật thất bại.' });
      }

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
    setIsChooseFile(false);
  }

  return (
    <>
      {isLoading && <Loading />}
      <Button variant="outline-secondary" className="btn-edit-video" onClick={handleShowEditVideo} >
        <i className="fa fa-video-camera"></i> Chỉnh sửa Video
      </Button>
      &nbsp;
      <Button variant="secondary" className="btn-edit-slide">
        <i className="fa fa-file-pdf-o"></i> Chỉnh sửa Slide
      </Button>

      <Form onSubmit={handleSubmit(onSubmit)} className="form-edit-slide">
        <Form.Group>
          <Form.Label>Tên slide bài giảng</Form.Label>
          <Form.Control size="sm" type="text" defaultValue={slide.name} name="name" ref={register} placeholder="Nhập tên bài giảng" />
          <Form.Text className="text-muted message">
            <span className="msg">{errors.name?.message}</span>
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Slide bài giảng</Form.Label><br />
          <embed width="191" height="207" src={previewSlide} type="application/pdf" className="preview"></embed>
          <Form.File name="slide" onChange={handleChooseFile} ref={register} accept="application/pdf" />
        </Form.Group>

        <Button type="submit" className="btn-submit-edit-slide" variant="outline-dark">Chỉnh sửa</Button>
      </Form>
    </>
  );
}

export default EditSlide;