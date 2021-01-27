import React from 'react';

import Badge from 'react-bootstrap/Badge';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { formatToVND, ddmmyy } from '../../../../utils/format';

const Recommend = ({ recommend }) => {
  return (
    <>
      <h4><span><i className="fa fa-list-alt"></i> Khóa học khác cho bạn</span></h4>
      <hr />
      <Row>
        {recommend.map((rcm, idx) =>
          <Col key={idx} lg={3}>
            <Card>
              <Card.Img className="main-img" variant="top" src="https://instagram.fsgn8-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/141157764_865615847548484_302220013163179757_n.jpg?_nc_ht=instagram.fsgn8-1.fna.fbcdn.net&_nc_cat=108&_nc_ohc=PhiqWm5ULuQAX_l2oes&tp=1&oh=d33b0d37f6d9a7844413426997b8a8b9&oe=6035B667" />
              <Card.Body>
                <Card.Title>{rcm.name}</Card.Title>
                <Card.Text>{rcm.detail_desc}</Card.Text>
                <Card.Text>
                  <Badge variant="warning">Điểm đánh giá</Badge>&nbsp;
                    <span className="yellow w6 mr-3">
                    {rcm.point_evaluate} <i className="fa fa-thumbs-o-up"></i>
                  </span>
                </Card.Text>
                <Card.Text>
                  <span className="danger"><i className="fa fa-tag"></i> <strong>{formatToVND(rcm.price)}</strong></span>
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">Cập nhật: {ddmmyy(rcm.created_at)}</small>
              </Card.Footer>
            </Card>
          </Col>
        )}
      </Row>
    </>
  );
}

export default Recommend;