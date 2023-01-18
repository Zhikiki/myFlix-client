import PropTypes from 'prop-types';

// Importing bootstrap components
import { Button, Card, Row, Col } from 'react-bootstrap';

// Movie card receivs property from the MainView
// Property = result of function movies.map = movie
// each movie contains id and title
export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <Card
      onClick={() => {
        onMovieClick(movieData);
      }}
      className='h-100'
    >
      <Row className='h-50'>
        <Col className='h-100 text-center mt-3'>
          <Card.Img
            variant='top'
            src={movieData.image}
            className='img-fluid h-100 w-auto'
          />
        </Col>
      </Row>

      <Card.Body className='d-flex flex-column'>
        <Card.Title className='mt-2'>{movieData.title}</Card.Title>

        <Card.Text className='mt-3'>{movieData.description}</Card.Text>
        <div className='mt-auto text-end'>
          <Button variant='secondary' size='sm' className='mt-auto'>
            Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

// Here is where we define all the props constraints for the BookCard
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
  onMovieClick: PropTypes.func.isRequired,
};
