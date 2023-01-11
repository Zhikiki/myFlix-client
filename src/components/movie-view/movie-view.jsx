// MovieView receives property from the MainView - movieData
// Property = result of function user click and giving value to selectedMovie variable
// selectedMovie contains all info for MovieView component UI
export const MovieView = ({ movieData, onBackClick }) => {
  return (
    <div>
      <img src={movieData.image} width="250" />
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
        <span>{movieData.director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{movieData.genre}</span>
      </div>
      <button onClick={() => {onBackClick()}}>Back</button>
    </div>
  );
};
