import React from 'react';
import PropTypes from 'prop-types';
import { FavoriteIcon } from '../favorite-icon/favorite-icon';

// Importing bootstrap components
import { Button, Card, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

// Movie card receivs property from the MainView
// Property = result of function movies.map = movie
// each movie contains id and title
export const MovieCard = ({ movieData, user, updateUserOnFav }) => {
  return (
    <Card className='h-100'>
      <Row className='h-50'>
        <Col className='h-100 text-center mt-3'>
          <Card.Img
            variant='top'
            src={movieData.image}
            className='img-fluid h-100 w-auto movie-card-img'
          />
        </Col>
      </Row>

      <Card.Body className='d-flex flex-column'>
        <Card.Title className='mt-2'>{movieData.title}</Card.Title>
        <Card.Text className='mt-3'>{movieData.description}</Card.Text>
        <Row className='d-flex flex-row justify-content-between mt-auto'>
          <Col className='text-start'>
            <FavoriteIcon
              user={user}
              movie={movieData}
              updateUserOnFav={updateUserOnFav}
            />
          </Col>
          <Col className='text-end'>
            <Link to={`/movies/${encodeURIComponent(movieData.id)}`}>
              <Button variant='secondary' size='sm' className='mt-auto'>
                Details
              </Button>
            </Link>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the MovieCard
MovieCard.propTypes = {
  movieData: PropTypes.shape({
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
  }).isRequired,
};
