import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import './index.css';

const Paginate = ({ paginate, onPageChange }) => {
  const [forcePage, setForcePage] = useState(null);
  useEffect(() => {
    if (paginate.currentPage !== forcePage + 1) {
      setForcePage(0);
    }
  }, [paginate.uri, paginate.currentPage])

  const handlePageClick = (data) => {
    setForcePage(data.selected);
    const api = `${paginate.uri}&limit=${paginate.limit}&page=${data.selected + 1}`;
    onPageChange(api);
  }

  return (
    <ReactPaginate
      pageCount={paginate.totalPages}
      marginPagesDisplayed={1}
      pageRangeDisplayed={2}
      onPageChange={handlePageClick}
      containerClassName={'pagination paginate-cus'}
      previousLabel={<i className="fa fa-angle-left"></i>}
      previousClassName={'page-item'}
      previousLinkClassName={'page-link'}
      nextLabel={<i className="fa fa-angle-right"></i>}
      nextClassName={'page-item'}
      nextLinkClassName={'page-link'}
      breakLabel={'...'}
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      activeClassName={'active'}
      forcePage={forcePage}
    />
  );
}

export default Paginate;