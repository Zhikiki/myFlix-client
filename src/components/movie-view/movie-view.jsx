import PropTypes from 'prop-types';

// MovieView receives property from the MainView - movieData
// Property = result of function user click and giving value to selectedMovie variable
// selectedMovie contains all info for MovieView component UI
export const MovieView = ({ movieData, onBackClick }) => {
  return (
    <div>
      <img
        src={movieData.image}
        width='100%'
        alt={`Poster for ${movieData.title}`}
      />
      <div>
        <span>Title: </span>
        <span>{movieData.title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movieData.description}</span>
      </div>
      <div>
        <span>Director: </span>
        <span>{movieData.director.name}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movieData.genre.name}</span>
      </div>
      <button
        onClick={() => {
          onBackClick();
        }}
      >
        Back
      </button>
    </div>
  );
};

MovieView.propTypes = {
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
  onBackClick: PropTypes.func.isRequired,
};
