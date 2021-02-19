import { React, useContext, useState, useEffect } from 'react';
import parse from 'html-react-parser';
import { useHistory } from 'react-router-dom';

import Badge from 'react-bootstrap/Badge';
import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button';
import Loading from '../../../../components/Loading';

import { formatToVND, ddmmyy } from '../../../../utils/format';
import { alertMessage } from '../../../../utils/common';
import { buyCourse } from '../../../../services/course';
import AppContext from '../../../../AppContext';
import { LOGOUT, TEACHER } from '../../../../AppTypes';

import './index.css';

const Detail = ({ course, onShowModal }) => {
  const history = useHistory();
  const { store, dispatch } = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(false);
  const [isBuy, setIsBuy] = useState(false);
  const handleShow = () => {
    onShowModal();
  }

  useEffect(() => {
    let mounted = true;
    if (isBuy) {
      const BuyCourse = async () => {
        const bought = await buyCourse(course.id);
        if (mounted) {
          if (bought.state) {
            alertMessage({ type: 'success', message: 'Mua khóa học thành công' });
            setIsLoading(false);
            setIsBuy(false);
          } else {
            setIsLoading(false);
            setIsBuy(false);
            if (bought.auth !== undefined && bought.auth.authenticated === false) {
              dispatch({
                type: LOGOUT,
                payload: {
                  isLogged: false
                }
              });
              alertMessage({ type: 'error', message: 'Đăng nhập để mua khóa học' });
              history.push('/login');
            } else {
              alertMessage({ type: 'error', message: 'Không thể mua khóa học này' })
            }
          }
        }
      }
      BuyCourse();
    }

    return () => mounted = false;

  }, [isBuy, course]);

  const onBuyCourse_clicked = async () => {
    setIsLoading(true);
    setIsBuy(true);
  }

  return (
    <>
      {isLoading && <Loading />}
      <Jumbotron className="pt-0 pb-0 bg-l">
        <h1>{course.name}</h1>
        <p>
          <strong>{course.sort_desc}</strong>
        </p>
        <p>
          <Badge variant="warning">Điểm đánh giá</Badge>&nbsp;
          <span className="yellow w6 mr-3">
            {course.point_evaluate || '(chưa có)'} <i className="fa fa-thumbs-o-up"></i>
          </span>&nbsp;
          <span className="w6">
            {course.qty_student_registed || '(chưa có)'} học viên
          </span>
        </p>
        <p>
          <strong><i className="fa fa-graduation-cap"></i> Giáo viên: <span className="info">{course.teacher}</span></strong>
        </p>
        <p>
          <strong><i className="fa fa-cloud-upload"></i> Cập nhật: {ddmmyy(course.updated_at)}</strong>
        </p>
        {course.price_promo > 0
          ?
          <h4>
            <i className="fa fa-tag"></i> {formatToVND(course.price_promo)}&nbsp;
          <span className="discount">{formatToVND(course.price)}</span>
          </h4>
          :
          <h4>
            <i className="fa fa-tag"></i> {formatToVND(course.price)}
          </h4>
        }
        <p>
          {store.role !== TEACHER &&
            <Button variant="outline-info mr-3" onClick={onBuyCourse_clicked}>
              <strong>Mua khóa học</strong>
            </Button>
          }
          <Button variant="outline-danger" onClick={handleShow}><strong>Xem trước</strong></Button>
        </p>
        <hr />
        <h5>Chi tiết</h5>
        {parse(course.detail_desc || '')}
      </Jumbotron>
    </>
  );
}

export default Detail;