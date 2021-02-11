import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactPlayer from 'react-player';
import Swal from 'sweetalert2';

import { create } from '../../../../services/video';
import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';
import firebase from '../../../../utils/firebase';
import { stringGenerate } from '../../../../utils/common';

import Loading from '../../../../components/Loading';

import './index.css';

const schema = yup.object().shape({
  name: yup.string().required('Bạn chưa nhập tên bài giảng')
});

const AddVideo = ({ courseId, user, onNewVideo, onShowAddSlide }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(AppContext);

  const Toast = Swal.mixin({ toast: true });
  const [isLoading, setIsLoading] = useState(false);
  const [previewVideo, setPreviewVideo] = useState('');

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

  const uploadImageFirebase = async (video, videoName) => {
    await firebase
      .storage()
      .ref(`videos/courses/${courseId}`)
      .child(`teacher-id-${user.id}-${videoName}`)
      .put(video);

    return await firebase
      .storage()
      .ref(`videos/courses/${courseId}`)
      .child(`teacher-id-${user.id}-${videoName}`)
      .getDownloadURL();
  }

  const deleteOldFile = async (name) => {
    await firebase
      .storage()
      .ref(`videos/courses/${courseId}`)
      .child(`teacher-id-${user.id}-${name}`)
      .delete();
  }

  const onSubmit = async (data) => {
    setIsLoading(true);

    const form = { ...data };
    delete form.video;

    if (previewVideo === '') {
      Toast.fire({
        title: 'Vui lòng chọn file là video!',
        position: 'top-right',
        width: 400,
        timer: 2000,
        icon: 'warning',
        showConfirmButton: false
      })
      setIsLoading(false);
      return;
    }

    let videoName = stringGenerate() + data.video[0].name;
    form.video_name = videoName;
    form.url = await uploadImageFirebase(data.video[0], videoName);
    form.courses_id = courseId;

    let res = await create(form);
    if (res.state) {
      Toast.fire({
        title: 'Tạo bài giảng thành công',
        position: 'top-right',
        width: 400,
        timer: 2000,
        icon: 'success',
        showConfirmButton: false
      });
      onNewVideo({ ...form, id: res.id, rank: res.rank });

    } else {
      await deleteOldFile(videoName);

      Toast.fire({
        title: 'Tạo bài giảng thất bại',
        position: 'top-right',
        width: 400,
        timer: 2000,
        icon: 'error',
        showConfirmButton: false
      });

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