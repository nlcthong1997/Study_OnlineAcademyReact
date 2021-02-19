import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactPlayer from 'react-player';

import { create } from '../../../../services/video';
import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';
import {
  stringGenerate,
  uploadToFirebase,
  removeToFirebase,
  alertMessage
} from '../../../../utils/common';

import Loading from '../../../../components/Loading';

import './index.css';

const schema = yup.object().shape({
  name: yup.string().required('Bạn chưa nhập tên bài giảng')
});

const AddVideo = ({ courseId, user, onNewVideo, onShowAddSlide }) => {
  const { register, handleSubmit, errors, reset } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [previewVideo, setPreviewVideo] = useState('');
  const [formData, setFormData] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChooseFile = (e) => {
    let file = e.target.files[0] || null;
    let type = file ? file.type.split('/')[0] : null;
    if (type !== 'video') {
      setPreviewVideo('');
      return;
    }
    setPreviewVideo(URL.createObjectURL(file));
  }

  const handleShowAddSlide = () => {
    onShowAddSlide();
  }

  useEffect(() => {
    let mounted = true;
    if (isSubmit) {
      const submitForm = async () => {
        const res = await create(formData);
        if (mounted) {
          if (res.state) {
            setIsSubmit(false);
            alertMessage({ type: 'success', message: 'Tạo bài giảng thành công' });
            onNewVideo({ ...formData, id: res.data.id, rank: res.data.rank });
            setIsLoading(false);
            setPreviewVideo('');
            reset();
          } else {
            setIsSubmit(false);
            await removeToFirebase({
              fileName: formData.video_name,
              folderUrl: `videos/courses/${courseId}`
            })
            alertMessage({ type: 'error', message: 'Tạo bài giảng thất bại' });
            setIsLoading(false);
            setPreviewVideo('');
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

  }, [isSubmit, formData, courseId, onNewVideo, reset]);

  const onSubmit = async (data) => {
    setIsLoading(true);

    const form = { ...data };
    delete form.video;

    if (previewVideo === '') {
      alertMessage({ type: 'warning', message: 'Vui lòng chọn file là video!' });
      setIsLoading(false);
      return;
    }

    let videoName = `teacher-id-${user.id}-` + stringGenerate() + data.video[0].name;
    const url = await uploadToFirebase({
      file: data.video[0],
      fileName: videoName,
      folderUrl: `videos/courses/${courseId}`
    });
    if (url === null) {
      alertMessage({ type: 'error', message: 'Tạo video bài giảng thất bại' });
      setIsLoading(false);
      setPreviewVideo('');
      reset();
      return;
    }
    form.url = url;
    form.video_name = videoName;
    form.courses_id = courseId;

    setFormData(form);
    setIsSubmit(true);
  }

  return (
    <>
      {isLoading && <Loading />}
      <Button variant="secondary" className="btn-add-video">
        <i className="fa fa-video-camera"></i> Thêm Video
      </Button>
      &nbsp;
      <Button variant="outline-secondary" className="btn-add-slide" onClick={handleShowAddSlide}>
        <i className="fa fa-file-pdf-o"></i> Thêm Slide
      </Button>
      <Form onSubmit={handleSubmit(onSubmit)} className="form-create">
        <Form.Group>
          <Form.Label>Tên bài giảng</Form.Label>
          <Form.Control size="sm" type="text" name="name" ref={register} placeholder="Nhập tên bài giảng" />
          <Form.Text className="text-muted message">
            <span className="msg">{errors.name?.message}</span>
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Video bài giảng</Form.Label><br />
          <ReactPlayer url={previewVideo} width={225} height={125} className="previewVideo" /><br />
          <Form.File name="video" onChange={handleChooseFile} ref={register} accept="video/*" />
        </Form.Group>

        <Button type="submit" className="btn-create-lesson" variant="outline-dark">Thêm video</Button>
      </Form>
    </>
  );
}

export default AddVideo;