import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactPlayer from 'react-player';
import Loading from '../../../../components/Loading';

import { stringGenerate } from '../../../../utils/common';
import firebase from '../../../../utils/firebase';
import { update } from '../../../../services/video';
import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';

import './index.css';
import Swal from 'sweetalert2';

const schema = yup.object().shape({
  name: yup.string().required('Bạn chưa nhập tên bài giảng'),
  rank: yup.number().required('Bạn chưa nhập thứ tự của bài giảng')
});

const EditVideo = ({ videoUpdate, courseId, user, onUpdateVideo, onShowEditSlide }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const Toast = Swal.mixin({ toast: true });
  const { dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isChooseFile, setIsChooseFile] = useState(false);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [video, setVideo] = useState({
    name: '',
  });

  useEffect(() => {
    setPreviewVideo(videoUpdate.url);
    setVideo(videoUpdate);
  }, [videoUpdate])

  const handleChooseVideo = (e) => {
    let file = e.target.files[0] || null;
    let type = file ? file.type.split('/')[0] : null;
    if (type !== 'video') {
      return;
    }
    setPreviewVideo(URL.createObjectURL(file));
    setIsChooseFile(true);
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

  const deleteOldFile = async (videoName) => {
    await firebase
      .storage()
      .ref(`videos/courses/${courseId}`)
      .child(`teacher-id-${user.id}-${videoName}`)
      .delete();
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    const form = { ...data };
    delete form.video;

    let videoName = stringGenerate() + data.video[0].name;
    if (isChooseFile) {
      form.url = await uploadImageFirebase(data.video[0], videoName);
      form.video_name = videoName;
    } else {
      form.url = videoUpdate.url;
      form.video_name = videoUpdate.video_name;
    }

    const res = await update(form, videoUpdate.id);

    if (res.state) {
      Toast.fire({
        title: 'Cập nhật bài giảng thành công',
        position: 'top-right',
        width: 400,
        timer: 2000,
        icon: 'seccess',
        showConfirmButton: false
      });

      if (isChooseFile) {
        await deleteOldFile(videoUpdate.video_name);
      }
      onUpdateVideo({ ...form, id: videoUpdate.id });

    } else {
      Toast.fire({
        title: 'Cập nhật bài giảng thất bại',
        position: 'top-right',
        width: 400,
        timer: 2000,
        icon: 'error',
        showConfirmButton: false
      });

      await firebase
        .storage()
        .ref(`videos/courses/${courseId}`)
        .child(`teacher-id-${user.id}-${videoName}`)
        .delete();

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

  const handleShowEditSlide = () => {
    onShowEditSlide();
  }

  return (
    <>
      {isLoading && <Loading />}

      <Button variant="secondary" className="btn-edit-video">
        <i className="fa fa-video-camera"></i> Chỉnh sửa Video
      </Button>
      &nbsp;
      <Button variant="outline-secondary" className="btn-edit-slide" onClick={handleShowEditSlide}>
        <i className="fa fa-file-pdf-o"></i> Chỉnh sửa Slide
      </Button>

      <Form onSubmit={handleSubmit(onSubmit)} className="form-edit">
        <Form.Group>
          <Form.Label>Tên bài giảng</Form.Label>
          <Form.Control size="sm" type="text" defaultValue={video.name} name="name" ref={register} placeholder="Nhập tên bài giảng" />
          <Form.Text className="text-muted message">
            <span className="msg">{errors.name?.message}</span>
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Thứ tự</Form.Label>
          <Form.Control size="sm" type="number" defaultValue={video.rank} name="rank" ref={register} placeholder="Nhập tên bài giảng" />
          <Form.Text className="text-muted message">
            <span className="msg">{errors.rank?.message}</span>
          </Form.Text>
        </Form.Group>

        <Form.Group>
          <Form.Label>Video bài giảng</Form.Label><br />
          <ReactPlayer url={previewVideo} width={225} height={125} /><br />
          <Form.File name="video" ref={register} onChange={handleChooseVideo} accept="video/*" />
        </Form.Group>

        <Button type="submit" className="btn-edit-lesson" variant="outline-dark">Chỉnh sửa</Button>
      </Form>
    </>
  );
}

export default EditVideo;