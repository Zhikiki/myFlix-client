import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import React from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import { FavoriteIcon } from '../favorite-icon/favorite-icon';
import { MovieCard } from '../movie-card/movie-card';

// MovieView receives property from the MainView - movies
export const MovieView = ({ user, updateUserOnFav }) => {
  const movies = useSelector((state) => state.movies.movies);

  
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);

  let similarMovies = movies.filter((filteredMovie) => {
    return (
      filteredMovie.genre.name === movie.genre.name &&
      filteredMovie.title !== movie.title
    );
  });

  return (
    <>
      <Row className='d-flex flex-row-reverse p-3'>
        <Col md={5} className='text-center text-md-end'>
          <img
            src={movie.image}
            alt={`Poster for ${movie.title}`}
            className='img-fluid h-100 w-auto movie-view-img'
          />
        </Col>
        <Col md={7} className='d-flex flex-column'>
          <Row className='d-flex flex-row  justify-content-between'>
            <Col md={9} className='d-flex flex-column'>
              <h3 className='my-0'>
                <span>Title: </span>
                <span>{movie.title}</span>
              </h3>
              <h5 className='mt-1 text-left text-muted'>
                <span>Director: </span>
                <span>{movie.director.name}</span>
              </h5>
            </Col>

            <Col md={3} className='align-self-end mb-2 text-end'>
              <span>Genre: </span>
              <span className='fw-bolder'>{movie.genre.name}</span>
            </Col>
          </Row>
          <div className='mt-md-5 mb-4'>
            <div className='text-decoration-underline mb-2'>Description: </div>
            <span>{movie.description}</span>
          </div>
          <Row className='d-flex flex-row justify-content-between mt-auto mb-md-4'>
            <Col className='text-start'>
              <FavoriteIcon
                movie={movie}
                // updateUserOnFav={updateUserOnFav}
              />
            </Col>
            <Col className='text-end'>
              <Link to={`/`}>
                <Button variant='secondary' size='lg'>
                  Back
                </Button>
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <h2 className='mt-0'>Similar movies</h2>
        <hr />
        {console.log(similarMovies)}
        {similarMovies.map((movie) => (
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
      </Row>
    </>
  );
};

// I need to rewrite for array. Now MovieView receives array of movies
// MovieView.propTypes = {
//   movies: PropTypes.arrayOf(
//     PropTypes.shape({
//       title: PropTypes.string.isRequired,
//       image: PropTypes.string.isRequired,
//       director: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         bio: PropTypes.string.isRequired,
//         birth: PropTypes.string.isRequired,
//         death: PropTypes.string,
//       }).isRequired,
//       genre: PropTypes.shape({
//         name: PropTypes.string.isRequired,
//         description: PropTypes.string.isRequired,
//       }).isRequired,
//       image: PropTypes.string.isRequired,
//     })
//   ).isRequired,
// };
