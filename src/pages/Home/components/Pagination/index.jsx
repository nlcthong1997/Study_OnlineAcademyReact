import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import './index.css';

const Paginate = ({ total, page }) => {
  const items = [];
  for (let i = 1; i <= total; i++) {
    items.push(
      <Pagination.Item key={i} active={i === page}>
        {i}
      </Pagination.Item>,
    );
  }
  return (
    <Pagination className="paginate">
      <Pagination.First />
      <Pagination.Prev />
      {items}
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  );
}

export default Paginate;