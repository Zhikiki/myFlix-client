// Importing useState for creation and initialization of state
import { useState, useEffect } from 'react';

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
  const storedUser = JSON.parse(localStorage.getItem('user'));
  const storedToken = localStorage.getItem('token');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user, setUser] = useState(storedUser ? storedUser : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }

    // Todo: Pull the user object from (GET /users/userid) from API
    // and update the state

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
        setMovies(moviesFromApi);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [token]);

  // if (!user) {
  //   return (
  //     <>
  //       <LoginView
  //         onLoggedIn={(user, token) => {
  //           setUser(user);
  //           setToken(token);
  //         }}
  //       />
  //       or
  //       <SignupView />
  //     </>
  //   );
  // }

  // if (selectedMovie) {
  //   let similarMovies = movies.filter((movie) => {
  //     return (
  //       movie.genre.name === selectedMovie.genre.name &&
  //       movie.title !== selectedMovie.title
  //     );
  //   });
  //   console.log(similarMovies);
  //   return (
  //     <>
  //       <MovieView
  //         movieData={selectedMovie}
  //         onBackClick={() => setSelectedMovie(null)}
  //       />
  //       <hr />
  //       <h2>Similar movies</h2>

  //       {similarMovies.map((movie) => (
  //         <MovieCard
  //           key={movie.id}
  //           movieData={movie}
  //           onMovieClick={(newSelectedMovie) => {
  //             setSelectedMovie(newSelectedMovie);
  //           }}
  //         />
  //       ))}
  //     </>
  //   );
  // }

  // if (movies.length === 0) {
  //   return <div>The list of movies is empty</div>;
  // }

  // return (
  //   <>
  //     <div>
  //       {movies.map((movie) => (
  //         <MovieCard
  //           key={movie.id}
  //           movieData={movie}
  //           onMovieClick={(newSelectedMovie) => {
  //             setSelectedMovie(newSelectedMovie);
  //           }}
  //         />
  //       ))}
  //     </div>
  //     <button
  //       onClick={() => {
  //         setUser(null);
  //         setToken(null);
  //         localStorage.clear();
  //       }}
  //     >
  //       Sign out
  //     </button>
  //   </>
  // );

  // let getMovieView = (selectedMovie) => {
  //   let similarMovies = movies.filter((movie) => {
  //     return (
  //       movie.genre.name === selectedMovie.genre.name &&
  //       movie.title !== selectedMovie.title
  //     );
  //   });
  //   console.log(similarMovies);
  //   return (
  //     <>
  //       <Col>
  //         <MovieView
  //           movieData={selectedMovie}
  //           onBackClick={() => setSelectedMovie(null)}
  //         />
  //       </Col>

  //       <h2 className='mt-0'>Similar movies</h2>
  //       <hr />
  //       {similarMovies.map((movie) => (
  //         <Col className='mb-5' key={movie.id} xs={12} sm={6} md={4} lg={3}>
  //           <MovieCard
  //             key={movie.id}
  //             movieData={movie}
  //             onMovieClick={(newSelectedMovie) => {
  //               setSelectedMovie(newSelectedMovie);
  //             }}
  //           />
  //         </Col>
  //       ))}
  //     </>
  //   );
  // };

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
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
                        onLoggedIn={(user, token) => {
                          setUser(user);
                          setToken(token);
                        }}
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
                        movies={movies}
                        user={user}
                        updateUserOnFav={(user) => {
                          console.log('Update User called', user);
                          setUser(user);
                          localStorage.setItem('user', JSON.stringify(user));
                        }}
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
