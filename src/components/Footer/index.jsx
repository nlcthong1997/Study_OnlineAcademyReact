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
          <li className="footer-item-main">Giới thiệu</li>
          <li className="footer-item">Câu hỏi thường gặp</li>
          <li className="footer-item">Chính sách bảo mật</li>
        </ul>
        <ul className="footer-list">
          <li className="footer-item-main">Team</li>
          <li className="footer-item">Thành viên</li>
          <li className="footer-item">Quy chế</li>
        </ul>
      </div>
      <div className="footer-copyright">
        <i className="fa fa-copyright"></i> 2021: Nguyễn Lâm Chí Thông.
        </div>
    </div>
  );
}

export default Footer;