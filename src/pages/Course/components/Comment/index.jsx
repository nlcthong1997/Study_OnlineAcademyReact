import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { ddmmyy } from '../../../../utils/format';
import './index.css';

const Comment = ({ feedback }) => {
  return (
    <ListGroup.Item>
      <span className="cmt-user">{feedback.username}</span>
      <span className="cmt-date"> {ddmmyy(feedback.created_at)}</span>
      <br />
      <span className="cmt">{feedback.comment}</span>
    </ListGroup.Item>
  );
}

export default Comment;