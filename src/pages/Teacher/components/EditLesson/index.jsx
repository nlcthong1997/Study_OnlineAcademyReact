import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ReactPlayer from 'react-player';
import './index.css';

const schema = yup.object().shape({
  // title: yup.string().required('Bạn chưa nhập tiêu đề khóa học'),
  // name: yup.string().required('Bạn chưa nhập tên khóa học'),
  // sort_desc: yup.string().required('Bạn chưa nhập mô tả')
});

const EditLesson = ({ videoUpdate }) => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  const [previewVideo, setPreviewVideo] = useState(null);
  const [video, setVideo] = useState({
    name: '',

  });

  useEffect(() => {
    setPreviewVideo(videoUpdate.url);
    setVideo(videoUpdate);
  }, [videoUpdate])

  const handleChooseFile = (e) => {
    let file = e.target.files[0] || null;
    let type = file ? file.type.split('/')[0] : null;
    if (type !== 'video') {
      return null;
    }
    setPreviewVideo(URL.createObjectURL(file));
  }

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <>
      <h3>Chỉnh sửa bài giảng</h3>
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
          <Form.File onChange={handleChooseFile} />
        </Form.Group>

        <Button type="submit" className="btn-edit-lesson" variant="outline-dark">Chỉnh sửa</Button>
      </Form>
    </>
  );
}

export default EditLesson;