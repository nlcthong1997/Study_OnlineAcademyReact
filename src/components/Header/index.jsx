import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button';
import './index.css';

const Header = ({ categories, courses }) => {
  return (
    <div className="nav-header">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">Online Academy</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Lĩnh vực" id="basic-nav-dropdown">
              {
                categories.map(cat => 
                  <NavDropdown.Item href="#action/3.1">Lập trình web</NavDropdown.Item>
                )
              }
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Tất cả lĩnh vực</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Khóa học" id="collasible-nav-dropdown">
              {
                courses.map(course => 
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                )
              }
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Tất cả khóa học</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Đăng nhập</Nav.Link>
            <Nav.Link href="#memes">Đăng ký</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Navbar expand="lg" bg="dark" variant="dark">
        <Form inline className="form-search">
          <FormControl type="text" placeholder="Tìm kiếm lĩnh vực, khóa học" className="mr-sm-2 input-search" />
          <Button variant="outline-primary btn-search">Tìm</Button>
        </Form>
      </Navbar>
    </div>
  );
}

export default Header;