import React, { useEffect, useContext, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ListVideo from './components/ListVideo';
import ListSlide from './components/ListSlide';
import Video from './components/Video';
import Slide from './components/Slide';
import BreadCrumb from './components/BreadCrumb';

import AppContext from '../../AppContext';
import { LOGOUT } from '../../AppTypes';
import { getVideos } from '../../services/video';
import { getSlides } from '../../services/slide';

const Document = () => {
  const { courseId } = useParams();
  const { dispatch } = useContext(AppContext);
  const [videos, setVideos] = useState([]);
  const [videoActive, setVideoActive] = useState(null);
  const [slides, setSlides] = useState([]);
  const [slideActive, setSlideActive] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const resVideo = await getVideos(courseId);
      const resSlide = await getSlides(courseId);
      if (resVideo.state) {
        setVideos(resVideo);
        setVideoActive(resVideo[0]);
      }
      if (resSlide.state) {
        setSlides(resSlide);
        setSlideActive(resSlide[0]);
      }
      if (!resVideo.state || !resSlide.state) {
        if (
          (resVideo.auth !== undefined && resVideo.auth.authenticated === false) ||
          (resSlide.auth !== undefined && resSlide.auth.authenticated === false)
        ) {
          dispatch({
            type: LOGOUT,
            payload: {
              isLogged: false
            }
          });
          history.push('/login')
        }
      }
    }
    fetchData();
  }, [])

  const handleShowVideoActive = (video) => {
    setVideoActive(video);
  }

  const handleShowSlideActive = (slide) => {
    setSlideActive(slide);
  }

  return (
    <>
      <Col lg={12} xs={12}>
        <BreadCrumb courseId={courseId} />
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <strong><i className="fa fa-angle-down"></i> Danh sách video bài giảng</strong>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {videos.length > 0
                  ? <Row>
                    <Col lg={3}>
                      <ListVideo videos={videos} onShowVideoActive={handleShowVideoActive} videoActive={videoActive} />
                    </Col>
                    <Col lg={9}>
                      <Video video={videoActive} />
                    </Col>
                  </Row>
                  : <div>Bạn chưa mua khóa học này hoặc tài liệu chưa được cập nhật.</div>
                }
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              <strong><i className="fa fa-angle-down"></i> Tài liệu bài giảng</strong>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                {slides.length > 0
                  ? <Row>
                    <Col lg={3}>
                      <ListSlide slides={slides} onShowSlideActive={handleShowSlideActive} slideActive={slideActive} />
                    </Col>
                    <Col lg={9}>
                      <Slide slide={slideActive} />
                    </Col>
                  </Row>
                  : <div>Bạn chưa mua khóa học này hoặc tài liệu chưa được cập nhật.</div>
                }
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </>
  );
}

export default Document;