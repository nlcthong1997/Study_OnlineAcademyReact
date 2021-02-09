import React, { useEffect, useState, useContext } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Select from 'react-select';

import AppContext from '../../../../AppContext';
import { LOGOUT } from '../../../../AppTypes';
import { coursesOfTeacher } from '../../../../services/course';
import { getVideos } from '../../../../services/video';

import List from '../List';
import AddLesson from '../AddLesson';
import EditLesson from '../EditLesson';

import './index.css';

const Lesson = () => {
  const { dispatch } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState({ value: null, label: null });
  const [videos, setVideos] = useState([]);
  const [isShowButtonAdd, setIsShowButtonAdd] = useState(false);
  const [videoActive, setVideoActive] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      let res = await coursesOfTeacher();
      if (res.authenticated === false) {
        dispatch({
          type: LOGOUT,
          payload: {
            isLogged: false
          }
        });
      } else {
        let initial = [];
        let remap = res.reduce((accumulator, currentValue, currentIndex, array) => {
          accumulator.push({ value: currentValue.id, label: currentValue.name });
          return accumulator;
        }, initial);
        setCourses(remap);
        setSelected(remap[0])
      }
    }
    fetchUser();
  }, [])

  const handleSelectChange = async (selected) => {
    setSelected(selected);
    let videos = await getVideos(selected.value);
    setVideos(videos);
    setIsShowButtonAdd(false);
  }

  const handleVideoActive = (video) => {
    console.log('lesson_click', video);
    setVideoActive(video);
    setIsShowButtonAdd(true);
  }

  const onAdd_clicked = () => {
    setIsShowButtonAdd(false);
  }

  const handleGetNewLesson = (video) => {
    setVideos([...videos, video]);
  }

  return (
    <Container>
      <Row>
        <Col lg={12} xs={12}>
          <Form.Group>
            <Form.Label>Khóa học đã tạo</Form.Label>
            <Select
              value={selected}
              onChange={handleSelectChange}
              isClearable={false}
              isSearchable={true}
              options={courses}
            />
          </Form.Group>
        </Col>
        <Col lg={12} xs={12}>
          <Row>
            <Col lg={4} xs={12}>
              <List videos={videos} onVideoActive={handleVideoActive} />
            </Col>
            <Col lg={8} xs={12} className="form-relative">
              {isShowButtonAdd &&
                <>
                  <Button variant="outline-danger" className="btn-add" onClick={onAdd_clicked}>
                    <i className="fa fa-plus"></i> Tạo mới
                  </Button>
                  <EditLesson videoUpdate={videoActive} />
                </>
              }

              {!isShowButtonAdd && <AddLesson courseId={selected.value} onNewLesson={handleGetNewLesson} />}
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Lesson;