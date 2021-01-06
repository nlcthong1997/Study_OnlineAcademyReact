import Container from 'react-bootstrap/Container';
import { Switch, Route } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import './index.css';
import Home from '../../features/Home';

const Main = () => {
  return ( 
    <Container className="main">
      <Row>
        <Col lg="3">
          <ListGroup>
            <ListGroup.Item>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col lg="9">
          <Switch>
            <Route path='/' exact component={Home} />
            {/* <Route path='/about' component={About} /> */}
          </Switch>
        </Col>
      </Row>
    </Container>
  );
}
 
export default Main;