import React from 'react';
import Comment from '../Comment';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Feedback = ({ feedbacks }) => {
  return (
    <>
      <hr />
      <h4><span><i className="fa fa-list-alt"></i> Nhận xét của học viên</span></h4>
      <Row>
        <Col lg={8} xs={12}>
          <ListGroup variant="flush">
            {feedbacks.map((feedback, idx) =>
              <Comment key={idx} feedback={feedback} />
            )}
          </ListGroup>
        </Col>
      </Row>
    </>
  );
}

export default Feedback;