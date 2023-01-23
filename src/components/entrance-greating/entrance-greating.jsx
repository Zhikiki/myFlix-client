import { Col, Row } from 'react-bootstrap';

export const EntranceGreating = () => {
  return (
    <Row className='d-flex flex-column justify-content-center px-3'>
      <Col>
        <div className='mt-5 text-left text-muted'>Welcome to</div>
      </Col>
      <Col>
        <h1 className='text-left font-weight-bold'>MyFlix</h1>
      </Col>
    </Row>
  );
};
