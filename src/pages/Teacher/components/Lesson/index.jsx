import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';

const Lesson = () => {
  useEffect(() => {
    const fetchUser = async () => {
      let res = await coursesOfTeacher();
      if (res.authenticated === false) {
        dispatch({
          type: LOGOUT,
          payload: {
            isLogged: false
          }
        });
      } else {
        setUser(res);
      }
    }
    fetchUser();
  }, [])
  return (
    <Container>
      <Row>
        <Col lg={12} xs={12}>
          <Form.Group>
            <Form.Label>Lĩnh vực</Form.Label>
            <select className="form-control" ref={register}>
              {categories.map((opt, idx) =>
                <option key={idx} defaultValue={idx === 0 ? opt.value : null} value={opt.value}>{opt.label}</option>
              )}
            </select>
          </Form.Group>
        </Col>
        <Col lg={12} xs={12}>

        </Col>
      </Row>
    </Container>
  );
}

export default Lesson;