import React from 'react';
import { Row, Col } from 'react-bootstrap';
import moment from 'moment';
import { useSelector } from 'react-redux';
import moment from 'moment';

export const UserInfo = () => {
  const user = useSelector((state) => state.user.user);
  let userBirthday = moment(user.Birthday).format('DD-MM-YYYY');

  return (
    <Row className='d-flex flex-column flex-lg-row ms-2 text-lg-center mt-lg-3 mt-3'>
      <Col>
        <span>Username: </span>
        <span className='fw-bolder'>{user.Username}</span>
      </Col>
      <Col>
        <span>Email: </span>
        <span className='fw-bolder'>{user.Email}</span>
      </Col>
      <Col>
        <span>Birthday: </span>
        <span className='fw-bolder'>{userBirthday}</span>
      </Col>
    </Row>
  );
};
