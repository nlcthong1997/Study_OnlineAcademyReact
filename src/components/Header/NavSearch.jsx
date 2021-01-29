import React, { useContext } from 'react';
import { useHistory } from "react-router-dom";
import { useForm } from "react-hook-form";

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';

import { search } from '../../services/search';
import AppContext from '../../AppContext';
import { INIT_HOME } from '../../AppTypes';

const NavSearch = () => {
  const history = useHistory();
  const { register, handleSubmit } = useForm();
  const { dispatch } = useContext(AppContext);
  const onSubmit = async (data) => {
    const { courses, paginate } = await search(data.q)
    dispatch({
      type: INIT_HOME,
      payload: {
        courses,
        paginate
      }
    });
    history.push('/');
  }

  return (
    <Navbar expand="lg" bg="dark" variant="dark" className="navbar">
      <Form inline className="form-search" onSubmit={handleSubmit(onSubmit)}>
        <FormControl
          name="q"
          ref={register}
          type="text"
          placeholder="Tìm kiếm lĩnh vực, khóa học"
          className="mr-sm-2 input-search" />
        <Button type="submit" variant="outline-warning btn-search">
          <strong><i className="fa fa-search"></i> Tìm</strong>
        </Button>
      </Form>
    </Navbar>
  );
}

export default NavSearch;