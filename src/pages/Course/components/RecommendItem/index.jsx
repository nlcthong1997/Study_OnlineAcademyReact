import React from 'react';
import { useHistory } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import { formatToVND, ddmmyy } from '../../../../utils/format';

const RecommendItem = ({ recommend }) => {

  const history = useHistory();
  const onRecommend_clicked = () => {
    history.push(`/courses/${recommend.id}`)
  }

  return (
    <Col lg={3} onClick={onRecommend_clicked}>
      <Card className="main-recommend">
        <Card.Img className="main-img" variant="top" src={recommend.img} />
        <Card.Body>
          <Card.Title>{recommend.name}</Card.Title>
          <Card.Text className="main-desc">{recommend.sort_desc}</Card.Text>
          <Card.Text>
            <Badge variant="warning">Điểm đánh giá</Badge>&nbsp;
                    <span className="yellow w6 mr-3">
              {recommend.point_evaluate > 0 ? recommend.point_evaluate : '(chưa có)'} <i className="fa fa-thumbs-o-up"></i>
            </span>
          </Card.Text>
          <Card.Text>
            <span className="danger"><i className="fa fa-tag"></i> <strong>{formatToVND(recommend.price)}</strong></span>
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Cập nhật: {ddmmyy(recommend.created_at)}</small>
        </Card.Footer>
      </Card>
    </Col>
  );
}

export default RecommendItem;