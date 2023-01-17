import PropTypes from 'prop-types';

// Importing bootstrap components
import { Button, Card } from 'react-bootstrap';

// Movie card receivs property from the MainView
// Property = result of function movies.map = movie
// each movie contains id and title
export const MovieCard = ({ movieData, onMovieClick }) => {
  return (
    <Card
      style={{ width: '18rem' }}
      onClick={() => {
        onMovieClick(movieData);
      }}
      className='h-100'
    >
      <Card.Img variant='top' src={movieData.image} />
      <Card.Body>
        <Card.Title>{movieData.title}</Card.Title>
        <Card.Text>{movieData.description}</Card.Text>
        <Button variant='secondary' size='sm'>
          Details
        </Button>
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
