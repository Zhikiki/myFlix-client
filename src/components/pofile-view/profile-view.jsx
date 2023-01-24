import { useParams } from 'react-router';
import React, { useState } from 'react';
import { Button, Form, Row, Col, CardGroup, Card, Form } from 'react-bootstrap';
import { MovieCard } from '../movie-card/movie-card';
import moment from 'moment';
import { useState } from 'react';

import { UserInfo } from './user-info';

export const ProfileView = ({ movies }) => {
  const storedToken = localStorage.getItem('token');
  const [token, setToken] = useState(storedToken ? storedToken : null);

  const storedUser = JSON.parse(localStorage.getItem('user'));
  const [user, setUser] = useState(storedUser ? storedUser : null);
  console.log(storedUser);

  const [username, setUsername] = useState(user.Username);
  const [password, setPassword] = useState();
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);

  let favoriteMoviesList = movies.filter((m) =>
    user.FavoriteMovies.includes(m.id)
  );

  let userBirthday = moment.utc(birthday).format('MM/DD/YYYY');
  console.log(username);

  const updateUser = (username) => {
    fetch(`https://movie-api-zhikiki.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((updatedUser) => {
        if (updatedUser) {
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      Username: username ? username : storedUser.Username,
      Password: password,
      Email: email ? email : storedUser.Email,
      Birthday: birthday ? birthday : storedUser.Birthday,
    };
    console.log(data);

    fetch(
      `https://movie-api-zhikiki.herokuapp.com/users/${storedUser.Username}`,
      {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then((response) => {
        if (response.ok) {
          alert('Changes saved');
          updateUser(username).then(() => window.location.reload());
        } else {
          alert('Something went wrong');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <UserInfo user={storedUser} />

      <Row>
        <Col md={5}>
          <CardGroup>
            <Card className='border-0'>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Form.Group controlId='forUsername' className='mt-2'>
                    <Form.Label>Username:</Form.Label>
                    <Form.Control
                      type='text'
                      // value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      minLength='3'
                      pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
                      title="Username should contain more than 3 characters, may only contain letters, numbers and special characters: .,'-!?%&"
                      placeholder='Enter your name'
                    />
                    <Form.Text className='text-muted'>
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>
                  <Form.Group controlId='forPassword' className='mt-2'>
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                      type='password'
                      // value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      pattern="^[A-Za-z0-9 .,'\-!?%&]+$"
                      title="Password may only contain letters, numbers and special characters: .,'-!?%&"
                      placeholder='Create a password'
                    />
                  </Form.Group>
                  <Form.Group controlId='forEmail' className='mt-2'>
                    <Form.Label>Email:</Form.Label>
                    <Form.Control
                      type='email'
                      // value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder='Enter email'
                    />
                  </Form.Group>
                  <Form.Group controlId='forBirthday' className='mt-2'>
                    <Form.Label>Birthday:</Form.Label>
                    <Form.Control
                      type='date'
                      // value={birthday}
                      onChange={(e) => setBirthday(e.target.value)}
                    />
                  </Form.Group>
                  <Row>
                    <Col className='text-end'>
                      <Button variant='primary' type='submit' className='mt-3'>
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
      <Row>
        {favoriteMoviesList.length === 0 ? (
          <Col>The list of favorite movies is empty</Col>
        ) : (
          <>
            <div className='text-start h2 mb-4'>List of favorite movies</div>
            {favoriteMoviesList.map((movie) => (
              <Col className='mb-5' key={movie.id} xs={12} sm={6} md={4} lg={3}>
                <MovieCard
                  movieData={movie}
                  user={user}
                  updateUserOnFav={(user) => {
                    console.log('Update User called', user);
                    setUser(user);
                    localStorage.setItem('user', JSON.stringify(user));
                  }}
                />
              </Col>
            ))}
          </>
        )}
      </Row>
    </>
  );
};
