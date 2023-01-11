export const MovieView = ({movieData}) => {
    return (
      <div>
        <img src={movieData.image} />
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
      </div>
    );
}