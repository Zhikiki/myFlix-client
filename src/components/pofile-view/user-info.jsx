import { useParams } from 'react-router';
import React, { useState } from 'react';
import { Button, Form, Row, Col, CardGroup, Card, Form } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import moment from 'moment';
import { useState } from 'react';

export const UserInfo = ({user}) => {

    let userBirthday = moment.utc(user.Birthday).format('MM/DD/YYYY');

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
}