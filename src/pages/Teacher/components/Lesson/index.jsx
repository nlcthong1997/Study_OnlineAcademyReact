import React, { useEffect, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
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
import { getSlides } from '../../../../services/slide';
import { getUser } from '../../../../services/user';

import ListVideo from '../ListVideo';
import ListSlide from '../ListSlide';
import AddVideo from '../AddVideo';
import AddSlide from '../AddSlide';
import EditVideo from '../EditVideo';
import EditSlide from '../EditSlide';

import './index.css';
import { alertMessage } from '../../../../utils/common';

const Lesson = () => {
  const { dispatch } = useContext(AppContext);
  const [courses, setCourses] = useState([]);
  const [selected, setSelected] = useState({ value: null, label: null });
  const [videos, setVideos] = useState([]);
  const [slides, setSlides] = useState([]);
  const [isShowButtonAdd, setIsShowButtonAdd] = useState(false);
  const [videoActive, setVideoActive] = useState(null);
  const [slideActive, setSlideActive] = useState(null);
  const [user, setUser] = useState({ id: null, name: '' });
  const [toggleAdd, setToggleAdd] = useState(true);
  const [toggleEdit, setToggleEdit] = useState(true);
  const [toggleList, setToggleList] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      let res = await getUser();
      if (res.state) {
        setUser(res);
      } else {
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
    fetchUser();

    const fetchData = async () => {
      let res = await coursesOfTeacher();
      if (res.state) {
        if (res.data.length === 0) {
          alertMessage({ type: 'warning', message: 'Chưa có khóa học nào được thêm.' })
          history.push('/teacher/course/add');
          return;
        }

        let initial = [];
        let remap = res.data.reduce((accumulator, currentValue) => {
          accumulator.push({ value: currentValue.id, label: currentValue.name });
          return accumulator;
        }, initial);
        setCourses(remap);
        setSelected(remap[0])
      } else {
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
    fetchData();
  }, [])

  const handleSelectChange = async (selected) => {
    setSelected(selected);
    let videos = await getVideos(selected.value);
    if (videos.authenticated === false) {
      dispatch({
        type: LOGOUT,
        payload: {
          isLogged: false
        }
      });
    } else {
      setVideos(videos);
    }

    let slides = await getSlides(selected.value);
    if (slides.authenticated === false) {
      dispatch({
        type: LOGOUT,
        payload: {
          isLogged: false
        }
      });
    } else {
      setSlides(slides)
    }

    setIsShowButtonAdd(false);
  }

  const handleVideoActive = (video) => {
    setVideoActive(video);
    setIsShowButtonAdd(true);
    setToggleAdd(true);
    setToggleEdit(true);
    setToggleList(true);
  }

  const handleSlideActive = (slide) => {
    setSlideActive(slide);
    setIsShowButtonAdd(true);
    setToggleAdd(false);
    setToggleEdit(false);
    setToggleList(false);
  }

  const onAdd_clicked = () => {
    setIsShowButtonAdd(false);
    setToggleAdd(true);
    setToggleEdit(true);
    setToggleList(true);
  }

  const handleUpdateVideo = (video) => {
    let newVideos = [...videos];
    let videoUpdateId = newVideos.findIndex(item => item.id === video.id);
    newVideos[videoUpdateId] = video;
    setVideos(newVideos)
  }

  const handleUpdateSlide = (slide) => {
    let newSlides = [...slides];
    let slideUpdateId = newSlides.findIndex(item => item.id === slide.id);
    newSlides[slideUpdateId] = slide;
    setSlides(newSlides);
  }

  const handleGetNewVideo = (video) => {
    setVideos([...videos, video]);
  }

  const handleGetNewSlide = (slide) => {
    setSlides([...slides, slide]);
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
    setVideoActive(videos[0]);
  }

  const handleShowEditSlide = () => {
    setToggleEdit(false);
    setToggleList(false);
    setSlideActive(slides[0]);
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
              {toggleList
                ? <ListVideo videos={videos} onVideoActive={handleVideoActive} />
                : <ListSlide slides={slides} onSlideActive={handleSlideActive} />
              }
            </Col>
            <Col lg={8} xs={12} className="form-relative">
              {isShowButtonAdd &&
                <>
                  <Button variant="outline-danger" className="btn-add" onClick={onAdd_clicked}>
                    <i className="fa fa-plus"></i> Thêm mới
                  </Button>
                  {toggleEdit
                    ? <EditVideo courseId={selected.value} videoUpdate={videoActive} user={user} onUpdateVideo={handleUpdateVideo} onShowEditSlide={handleShowEditSlide} />
                    : <EditSlide courseId={selected.value} slideUpdate={slideActive} user={user} onUpdateSlide={handleUpdateSlide} onShowEditVideo={handleShowEditVideo} />
                  }
                </>
              }
              {!isShowButtonAdd &&
                <>
                  {toggleAdd
                    ? <AddVideo courseId={selected.value} user={user} onNewVideo={handleGetNewVideo} onShowAddSlide={handleShowSlide} />
                    : <AddSlide courseId={selected.value} user={user} onNewSlide={handleGetNewSlide} onShowAddVideo={handleShowVideo} />
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