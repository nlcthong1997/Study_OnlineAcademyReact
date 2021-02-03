import React from 'react';
import { Link } from 'react-router-dom';
import './index.css'

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <ul className="footer-list">
          <li className="footer-item-main">Giáo viên</li>
          <li className="footer-item"><Link to="/login" className="footer-link">Đăng nhập</Link></li>
        </ul>
        <ul className="footer-list">
          <li className="footer-item-main">Gioi thieu</li>
          <li className="footer-item">Cau hoi thuong gap</li>
          <li className="footer-item">Chinh sach bao mat</li>
          <li className="footer-item">Quy che hoat dong</li>
          <li className="footer-item">Tra cuu thong tin</li>
        </ul>
        <ul className="footer-list">
          <li className="footer-item-main">Team</li>
          <li className="footer-item">Cau hoi thuong gap</li>
          <li className="footer-item">Chinh sach bao mat</li>
          <li className="footer-item">Quy che hoat dong</li>
          <li className="footer-item">Tra cuu thong tin</li>
        </ul>
      </div>
      <div className="footer-copyright">
        <i className="fa fa-copyright"></i> 2021: Nguyễn Lâm Chí Thông.
        </div>
    </div>
  );
}

export default Footer;