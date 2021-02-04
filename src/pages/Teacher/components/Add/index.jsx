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
import { getInitCategories } from '../../../../services/category';

import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

const schema = yup.object().shape({
  // full_name: yup.string(),
});

const Add = () => {
  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema)
  });
  // const [content, setContent] = useState('');
  const [editorState, setEditorState] = useState(EditorState.createEmpty())
  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    console.log(editorState.getCurrentContent().getPlainText());
    console.log(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    console.log(convertToRaw(editorState.getCurrentContent()));
    // setContent(convertToRaw(editorState.getCurrentContent()))
  }

  const handleChooseFile = () => {

  }

  const onSubmit = async (data) => {
    console.log('submit: ', data);
  }

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      let res = await getInitCategories();
      setCategories(res);
    }
    fetchData();
  }, []);

  return (
    <Container>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row>
          <Col lg={9} xs={12}>
            <Form.Group>
              <Form.Label>Lĩnh vực</Form.Label>
              <Form.Control as="select" size="sm" custom ref={register} name="categories_id">
                {categories.map((cat, i) =>
                  <option>{cat.name}</option>
                )}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Tiêu đề</Form.Label>
              <Form.Control size="sm" type="text" name="title" ref={register} placeholder="Nhập tiêu đề" />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.title?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Tên khóa học</Form.Label>
              <Form.Control size="sm" type="text" name="name" ref={register} placeholder="Nhập tên khóa học" />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.name?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Mô tả ngắn</Form.Label>
              <Form.Control as="textarea" name="sort_desc" ref={register} rows={3} />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.sort_desc?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Mô tả chi tiết</Form.Label>
              <Editor
                ref={register}
                name="detail_desc"
                editorState={editorState}
                toolbarClassName=""
                wrapperClassName="demo-wrapper"
                editorClassName="demo-editor"
                onEditorStateChange={onEditorStateChange}
              />
              <Form.Text className="text-muted message">
                <span className="msg">{errors.detail_desc?.message}</span>
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Ảnh nhỏ</Form.Label><br />
              <Image className="avatar" src={''} roundedCircle />
              <Form.File name="small_image" onChange={handleChooseFile} ref={register} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Ảnh lớn</Form.Label><br />
              <Image className="avatar" src={''} roundedCircle />
              <Form.File name="larger_image" onChange={handleChooseFile} ref={register} />
            </Form.Group>

            <Button type="submit" className="btn-create" variant="outline-dark">Tạo khóa học</Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Add;