import React, { useEffect, useState, useContext } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactPlayer from 'react-player';
import Swal from 'sweetalert2';

import { getUser } from '../../../../services/user';
import { create } from '../../../../services/video';
import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';
import firebase from '../../../../utils/firebase';

import Loading from '../../../../components/Loading';

import './index.css';

const schema = yup.object().shape({
  name: yup.string().required('Bạn chưa nhập tên bài giảng')
});

const AddLesson = ({ courseId, onNewLesson }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const { dispatch } = useContext(AppContext);

  const Toast = Swal.mixin({ toast: true });
  const [isLoading, setIsLoading] = useState(false);
  const [previewVideo, setPreviewVideo] = useState('');
  const [user, setUser] = useState({
    id: null,
    name: ''
  });

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
  }, [])

  const handleChooseFile = (e) => {
    let file = e.target.files[0] || null;
    let type = file ? file.type.split('/')[0] : null;
    if (type !== 'video') {
      setPreviewVideo('');
      return;
    }
    setPreviewVideo(URL.createObjectURL(file));
  }

  const uploadImageFirebase = async (video) => {
    await firebase
      .storage()
      .ref(`videos/courses/${courseId}`)
      .child(`${video.name}`)
      .put(video);

    return await firebase
      .storage()
      .ref(`videos/courses/${courseId}`)
      .child(`${video.name}`)
      .getDownloadURL();
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    let form = { ...data };
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
    form.url = await uploadImageFirebase(data.video[0]);
    form.courses_id = courseId;
    let res = await create(form);
    if (res.state) {
      Toast.fire({
        title: 'Tạo bài giảng thành công',
        position: 'top-right',
        width: 400,
        timer: 2000,
        icon: 'seccess',
        showConfirmButton: false
      });
      onNewLesson({ ...form, id: res.id, rank: res.rank });

    } else {
      Toast.fire({
        title: 'Tạo bài giảng thất bại',
        position: 'top-right',
        width: 400,
        timer: 2000,
        icon: 'error',
        showConfirmButton: false
      });

      await firebase
        .storage()
        .ref(`videos/courses/${courseId}`)
        .child(`${data.video[0].name}`)
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
  }

  return (
    <>
      {isLoading && <Loading />}
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
          <ReactPlayer url={previewVideo} width={225} height={125} />
          <Form.File name="video" onChange={handleChooseFile} ref={register} accept="video/*" />
        </Form.Group>

        <Button type="submit" className="btn-create-lesson" variant="outline-dark">Tạo bài</Button>
      </Form>
    </>
  );
}

export default AddLesson;