import React from 'react';
import Row from 'react-bootstrap/Row';
import RecommendItem from '../RecommendItem';

const Recommend = ({ recommends }) => {
  return (
    <>
      <h4><span><i className="fa fa-list-alt"></i> Khóa học khác cho bạn</span></h4>
      <hr />
      <Row>
        {recommends.map((rcm, idx) =>
          <RecommendItem key={idx} recommend={rcm} />
        )}
      </Row>
    </>
  );
}

export default Recommend;