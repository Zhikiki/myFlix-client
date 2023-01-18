// Importing useState for creation and initialization of state
import { useState, useEffect } from 'react';

// Importing MovieCard component, so it can be used here
import { MovieCard } from '../movie-card/movie-card';

// Importing MovieView component
import { MovieView } from '../movie-view/movie-view';

import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

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
        console.log('movies from api:', data);
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

  let getMovieView = (selectedMovie) => {
    let similarMovies = movies.filter((movie) => {
      return (
        movie.genre.name === selectedMovie.genre.name &&
        movie.title !== selectedMovie.title
      );
    });
    console.log(similarMovies);
    return (
      <>
        <Col md={8} style={{ border: '1px solid black' }}>
          <MovieView
            movieData={selectedMovie}
            onBackClick={() => setSelectedMovie(null)}
          />
        </Col>

        <hr />
        <h2>Similar movies</h2>
        {similarMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieData={movie}
            onMovieClick={(newSelectedMovie) => {
              setSelectedMovie(newSelectedMovie);
            }}
          />
        ))}
      </>
    );
  };

  return (
    <Row className='justify-content-md-center'>
      {!user ? (
        <Col md={5}>
          <LoginView
            onLoggedIn={(user, token) => {
              setUser(user);
              setToken(token);
            }}
          />
          <div className='mx-4 mt-2 text-muted text-end'>
            Don't have an account? <br />
            Registrate now!
          </div>
          <SignupView />
        </Col>
      ) : selectedMovie ? (
        getMovieView(selectedMovie)
      ) : movies.length === 0 ? (
        <div>The list is empty!</div>
      ) : (
        <>
          <Row>
            <Col className='text-end mt-5'>
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
          {movies.map((movie) => (
            <Col className='mb-5' key={movie.id} xs={12} sm={6} md={4} lg={3}>
              <MovieCard
                movieData={movie}
                onMovieClick={(newSelectedMovie) => {
                  setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))}
        </>
      )}
    </Row>
  );
};
