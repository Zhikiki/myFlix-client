import { useState } from 'react';
import {
  Button,
  Form,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from 'react-bootstrap';
import CardHeader from 'react-bootstrap/esm/CardHeader';

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    // this prevents the default behavior of the form which is to reload the entire page
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
    };

    fetch('https://movie-api-zhikiki.herokuapp.com/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Login response: ', data);
        if (data.user) {
          localStorage.setItem('user', JSON.stringify(data.user));
          localStorage.setItem('token', data.token);
          onLoggedIn(data.user, data.token);
        } else {
          alert('No such user');
        }
      })
      .catch((e) => {
        alert('Something went wrong');
      });
  };
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col md={4}>
          <div className='mt-5 text-left text-muted'>Welcome to</div>
          <h1 className='text-left font-weight-bold'>MyFlix</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <CardGroup>
            <Card className='border-0 mt-'>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId='formUsername' className='mt-2'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength='3'
                      pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
                      title="Username should contain more than 3 characters, may only contain letters, numbers and special characters: .,'-!?%&"
                      placeholder='Enter your name'
                    />
                  </Form.Group>
                  <Form.Group controlId='formPassword' className='mt-4'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
                      title="Password may only contain letters, numbers and special characters: .,'-!?%&"
                      placeholder='Enter your password'
                    />
                  </Form.Group>
                  <Row>
                    <Col className='text-end'>
                      <Button variant='primary' type='submit' className='mt-4'>
                        Submit
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
};
