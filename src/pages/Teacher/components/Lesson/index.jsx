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
import { getUser } from '../../../../services/user';

import ListVideo from '../ListVideo';
import AddVideo from '../AddVideo';
import AddSlide from '../AddSlide';
import EditVideo from '../EditVideo';
import EditSlide from '../EditSlide';

import './index.css';

const Lesson = () => {
  const { dispatch } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState({ value: null, label: null });
  const [videos, setVideos] = useState([]);
  const [isShowButtonAdd, setIsShowButtonAdd] = useState(false);
  const [videoActive, setVideoActive] = useState(null);
  const [user, setUser] = useState({ id: null, name: '' });
  const [toggleAdd, setToggleAdd] = useState(true);
  const [toggleEdit, setToggleEdit] = useState(true);
  const [toggleList, setToggleList] = useState(true);

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

    const fetchData = async () => {
      let res = await coursesOfTeacher();
      console.log('res', res);
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
    fetchData();
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
    setToggleAdd(true);
    setToggleEdit(true);
    setToggleList(true);
  }

  const onAdd_clicked = () => {
    setIsShowButtonAdd(false);
    setToggleAdd(true);
    setToggleEdit(true);
    setToggleList(true);
  }

  const handleUpdateVideo = (video) => {
    let newVideos = [...videos];
    let videoUpdateId = newVideos.findIndex(video.id);
    newVideos[videoUpdateId] = video;
    setVideos(newVideos)
  }

  const handleGetNewVideo = (video) => {
    setVideos([...videos, video]);
  }

  const handleShowSlide = () => {
    setToggleAdd(false);
    setToggleList(false);
  }

  const handleShowVideo = () => {
    setToggleAdd(true);
    setToggleList(true);
  }

  const handleShowEditVideo = () => {
    setToggleEdit(true);
    setToggleList(true);
  }

  const handleShowEditSlide = () => {
    setToggleEdit(false);
    setToggleList(false);
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
              {toggleList && <ListVideo videos={videos} onVideoActive={handleVideoActive} />}
            </Col>
            <Col lg={8} xs={12} className="form-relative">
              {isShowButtonAdd &&
                <>
                  <Button variant="outline-danger" className="btn-add" onClick={onAdd_clicked}>
                    <i className="fa fa-plus"></i> Thêm mới
                  </Button>
                  {toggleEdit
                    ? <EditVideo courseId={selected.value} videoUpdate={videoActive} user={user} onUpdateVideo={handleUpdateVideo} onShowEditSlide={handleShowEditSlide} />
                    : <EditSlide courseId={selected.value} user={user} onShowEditVideo={handleShowEditVideo} />
                  }


                </>
              }
              {!isShowButtonAdd &&
                <>
                  {toggleAdd
                    ? <AddVideo courseId={selected.value} user={user} onNewVideo={handleGetNewVideo} onShowAddSlide={handleShowSlide} />
                    : <AddSlide courseId={selected.value} user={user} onShowAddVideo={handleShowVideo} />
                  }
                </>
              }
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Lesson;