import React from 'react';
import Row from 'react-bootstrap/Row';
import RecommendItem from '../RecommendItem';

const Recommend = ({ recommends }) => {
  return (
    <>
      <h3><span><i className="fa fa-lightbulb-o"></i> Có thể bạn quan tâm</span></h3>
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