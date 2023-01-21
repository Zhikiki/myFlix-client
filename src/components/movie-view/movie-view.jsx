import { useParams } from 'react-router';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';

// MovieView receives property from the MainView - movies
export const MovieView = ({ movies, user }) => {
  const { movieId } = useParams();
  const movie = movies.find((m) => m.id === movieId);
  const token = localStorage.getItem('token');

  const alreadyFavorite = user.FavoriteMovies.find(
    (favMovieId) => favMovieId === movieId
  );

  // I want icon to be always red if movie exists in the list of favorite movies
  // if (alreadyFavorite) {
  //  document.getElementById('#favMovieButton').classList.add('favorite-movie');
  // }
  console.log(user);

  const addFavorite = () => {
    if (!token) return;
    if (alreadyFavorite)
      return alert('This movie is already in the list of favorite');

    const url = `https://movie-api-zhikiki.herokuapp.com/users/${user.Username}/movies/${movieId}`;
    const requestOptions = {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        alert(`${movie.title} is added to the list of favorites`);
        document
          .getElementById('favMovieButton')
          .classList.add('favorite-movie');
      })
      .catch((e) => {
        alert('Something went wrong');
      });
  };

  return (
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
            <Link onClick={() => addFavorite()}>
              <FaHeart className='favorite-icon' id='favMovieButton' />
            </Link>
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
  );
};

// I need to rewrite for array. Now MovieView receives array of movies
MovieView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      director: PropTypes.shape({
        name: PropTypes.string.isRequired,
        bio: PropTypes.string.isRequired,
        birth: PropTypes.string.isRequired,
        death: PropTypes.string,
      }).isRequired,
      genre: PropTypes.shape({
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};
