import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactPlayer from 'react-player';
import Loading from '../../../../components/Loading';

import {
  stringGenerate,
  removeToFirebase,
  uploadToFirebase,
  alertMessage
} from '../../../../utils/common';
import { update } from '../../../../services/video';
import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';

import './index.css';

const schema = yup.object().shape({
  name: yup.string().required('Bạn chưa nhập tên bài giảng'),
  rank: yup.number().required('Bạn chưa nhập thứ tự của bài giảng')
});

const EditVideo = ({ videoUpdate, courseId, user, onUpdateVideo, onShowEditSlide }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isChooseFile, setIsChooseFile] = useState(false);
  const [previewVideo, setPreviewVideo] = useState(null);
  const [video, setVideo] = useState({
    name: '',
  });
  const [isSubmit, setIsSubmit] = useState(false);
  const [formData, setFormData] = useState(null);

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

  useEffect(() => {
    let mounted = true;
    if (isSubmit) {
      const submitForm = async () => {
        let isProcessError;
        const res = await update(formData, videoUpdate.id);
        if (mounted) {
          if (res.state) {
            setIsSubmit(false);
            if (isChooseFile) {
              isProcessError = await removeToFirebase({
                fileName: videoUpdate.video_name,
                folderUrl: `videos/courses/${courseId}`
              });
              setIsChooseFile(false);
            }
            if (isProcessError === null) {
              alertMessage({ type: 'warning', message: 'Đã có một lỗi nhỏ xảy ra trong quá trình cập nhật' });
            } else {
              alertMessage({ type: 'success', message: 'Cập nhật bài giảng thành công' });
            }
            onUpdateVideo({ ...formData, id: videoUpdate.id });
            setIsLoading(false);
          } else {
            setIsSubmit(false);
            if (isChooseFile) {
              isProcessError = await removeToFirebase({
                fileName: formData.video_name,
                folderUrl: `videos/courses/${courseId}`
              });
              setIsChooseFile(false);
            }
            if (isProcessError) {
              alertMessage({ type: 'error', message: 'Đã có lỗi xảy ra trong quá trình cập nhật' });
            } else {
              alertMessage({ type: 'error', message: 'Cập nhật bài giảng thất bại' });
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

  }, [isSubmit, formData, videoUpdate, courseId, isChooseFile, onUpdateVideo])

  const onSubmit = async (data) => {
    setIsLoading(true);
    const form = { ...data };
    delete form.video;

    let videoName = `teacher-id-${user.id}-` + stringGenerate();
    if (isChooseFile) {
      videoName += data.video[0].name;
      const url = await uploadToFirebase({
        file: data.video[0],
        fileName: videoName,
        folderUrl: `videos/courses/${courseId}`
      })
      if (url === null) {
        alertMessage({ type: 'error', message: 'Cập nhật video bài giảng thất bại' });
        setIsLoading(false);
        setIsChooseFile(false);
        return;
      }
      form.url = url;
      form.video_name = videoName;
    } else {
      form.url = videoUpdate.url;
      form.video_name = videoUpdate.video_name;
    }

    setFormData(form);
    setIsSubmit(true);
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