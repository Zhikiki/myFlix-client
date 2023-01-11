// Importing useState for creation and initialization of state
import { useState } from 'react';

// Importing MovieCard component, so it can be used here
import { MovieCard } from '../movie-card/movie-card';

export const MainView = () => {
  const [movies, setMovies] = useState([
    { id: 1, title: 'Silence of the Lambs' },
    { id: 2, title: 'Stuart Little' },
    { id: 3, title: 'The Lord of the Rings: The Return of the King' },
    { id: 4, title: 'The Lion King' },
    { id: 5, title: 'The Godfather' },
    { id: 6, title: 'Inception' },
  ]);

  if (movies.length === 0) {
    return <div>The list of movies is empty</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard key={movie.id} movieData={movie}/>
      ))}
    </div>
  );
};
