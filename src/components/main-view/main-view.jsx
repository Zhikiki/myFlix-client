// Importing useState for creation and initialization of state
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setMovies } from '../../redux/reducers/movies';
import { setUser } from '../../redux/reducers/user';
import { setToken } from '../../redux/reducers/token';

// Importing MovieCard component, so it can be used here
import { MovieCard } from '../movie-card/movie-card';

// Importing MovieView component
import { MovieView } from '../movie-view/movie-view';

import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { ProfileView } from '../pofile-view/profile-view';


export const MainView = () => {
  // const storedUser = JSON.parse(localStorage.getItem('user'));
  // const storedToken = localStorage.getItem('token');

  const movies = useSelector((state) => state.movies.movies);
  // const [movies, setMovies] = useState([]);
  // const [selectedMovie, setSelectedMovie] = useState(null);

  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);
console.log(user);
console.log(token);

  // const [user, setUser] = useState(storedUser ? storedUser : null);
  // const [token, setToken] = useState(storedToken ? storedToken : null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }

    // Todo: Pull the user object from (GET /users/userid) from API
    // and update the state

    // Need to make user logged in when page is bein reload

    fetch('https://movie-api-zhikiki.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((doc) => {
          return {
            id: doc._id,
            title: doc.Title,
            description: doc.Description,
            genre: {
              name: doc.Genre.Name,
              description: doc.Genre.Description,
            },
            director: {
              name: doc.Director.Name,
              bio: doc.Director.Bio,
              birth: doc.Director.Birth,
              death: doc.Director.Death,
            },
            image: doc.ImagePath,
          };
        });
        dispatch(setMovies(moviesFromApi));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        
        // onLoggedOut={() => {
        //   setUser(null);
        //   setToken(null);
        //   localStorage.clear();
        // }}
      />
      <Container>
        <Row className='justify-content-md-center'>
          <Routes>
            <Route
              path='/signup'
              element={
                <>
                  {user ? (
                    <Navigate to='/' />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path='/login'
              element={
                <>
                  {user ? (
                    <Navigate to='/' />
                  ) : (
                    <Col md={5}>
                      <LoginView
                      // onLoggedIn={(user, token) => {
                      //   setUser(user);
                      //   setToken(token);
                      // }}
                      />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path='/movies/:movieId'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col>
                      <MovieView
                        user={user}
                        // updateUserOnFav={(user) => {
                        //   console.log('Update User called', user);
                        //   setUser(user);
                        //   localStorage.setItem('user', JSON.stringify(user));
                        // }}
                      />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path='/'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <div>The list is empty!</div>
                  ) : (
                    <>
                      {movies.map((movie) => (
                        <Col
                          className='mb-5'
                          key={movie.id}
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                        >
                          <MovieCard
                            movieData={movie}
                            user={user}
                            updateUserOnFav={(user) => {
                              console.log('Update User called', user);
                              setUser(user);
                              localStorage.setItem(
                                'user',
                                JSON.stringify(user)
                              );
                            }}
                          />
                        </Col>
                      ))}
                      <Row>
                        <Col className='text-end mt-2'>
                          <Button
                            onClick={() => {
                              setUser(null);
                              setToken(null);
                              localStorage.clear();
                            }}
                            variant='primary'
                            size='lg'
                            className='mb-5'
                          >
                            Sign out
                          </Button>
                        </Col>
                      </Row>
                    </>
                  )}
                </>
              }
            />

            {/* User Profile view */}
            <Route
              path='/users/:username'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col>
                      <ProfileView movies={movies} />
                    </Col>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
