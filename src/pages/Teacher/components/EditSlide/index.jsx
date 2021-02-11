import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactPlayer from 'react-player';
import Loading from '../../../../components/Loading';

import { stringGenerate } from '../../../../utils/common';
import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';


const schema = yup.object().shape({
  name: yup.string().required('Bạn chưa nhập tên bài giảng'),
  rank: yup.number().required('Bạn chưa nhập thứ tự của bài giảng')
});

const EditSlide = ({ courseId, slideUpdate, user, onShowEditVideo }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
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


  const handleChooseFile = () => {

  }

  const onSubmit = async (data) => {

  }

  return (
    <>
      <Button variant="outline-secondary" className="btn-edit-video" onClick={handleShowEditVideo} >
        <i className="fa fa-video-camera"></i> Chỉnh sửa Video
      </Button>
      &nbsp;
      <Button variant="secondary" className="btn-edit-slide">
        <i className="fa fa-file-pdf-o"></i> Chỉnh sửa Slide
      </Button>

      <Form onSubmit={handleSubmit(onSubmit)} className="form-edit">
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

        <Button type="submit" className="btn-edit-slide" variant="outline-dark">Chỉnh sửa</Button>
      </Form>
    </>
  );
}

export default EditSlide;