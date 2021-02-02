import React, { useEffect, useContext, useState } from 'react';
import { useParams } from "react-router-dom";

import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import LinkVideo from './components/LinkVideo';
import Video from './components/Video';
import BreadCrumb from './components/BreadCrumb';

import AppContext from '../../AppContext';
import { LOGOUT } from '../../AppTypes';
import { getVideos } from '../../services/video';

const Document = () => {
  const { courseId } = useParams();
  const { dispatch } = useContext(AppContext);
  const [videos, setVideos] = useState([]);
  const [videoActive, setVideoActive] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getVideos(courseId);
      if (result.authenticated === false) {
        dispatch({
          type: LOGOUT,
          payload: {
            isLogged: false
          }
        });
      } else {
        setVideos(result)
      }
    }
    fetchData();
  }, [])

  const handleShowVideo = (video) => {
    setVideoActive(video);
  }

  return (
    <>
      <Col lg={12} xs={12}>
        <BreadCrumb />
        <Accordion defaultActiveKey="0">
          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="0">
              <strong>Danh sách video bài học</strong>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <Row>
                  <Col lg={3}>
                    <ListGroup variant="flush">
                      {videos.map((video, idx) =>
                        <LinkVideo key={idx} videoActive={videoActive} video={video} onShowVideo={handleShowVideo} />
                      )}
                    </ListGroup>
                  </Col>
                  <Col lg={9}>
                    <Video video={videoActive} />
                  </Col>
                </Row>
              </Card.Body>
            </Accordion.Collapse>
          </Card>

          <Card>
            <Accordion.Toggle as={Card.Header} eventKey="1">
              Click me!
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </>
  );
}

export default Document;