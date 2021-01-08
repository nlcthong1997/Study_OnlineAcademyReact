import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';

const NavSearch = (props) => {
  return (
    <Navbar expand="lg" bg="dark" variant="dark">
      <Form inline className="form-search">
        <FormControl type="text" placeholder="Tìm kiếm lĩnh vực, khóa học" className="mr-sm-2 input-search" />
        <Button variant="outline-primary btn-search">Tìm</Button>
      </Form>
    </Navbar>
  );
}

export default NavSearch;