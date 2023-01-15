// Importing useState for creation and initialization of state
import { useState, useEffect } from 'react';

// Importing MovieCard component, so it can be used here
import { MovieCard } from '../movie-card/movie-card';

// Importing MovieView component
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch('https://movie-api-zhikiki.herokuapp.com/movies')
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
  }, []);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    let similarMovies = movies.filter((movie) => {
      return (
        movie.genre.name === selectedMovie.genre.name &&
        movie.title !== selectedMovie.title
      );
    });
    console.log(similarMovies);
    return (
      <>
        <MovieView
          movieData={selectedMovie}
          onBackClick={() => setSelectedMovie(null)}
        />
        <hr />
        <h2>Similar movies</h2>

        {similarMovies.map((movie) => (
          <MovieCard
            key={movie.id}
            movieData={movie}
            onMovieClick={(newSelectedBook) => {
              setSelectedMovie(newSelectedBook);
            }}
          />
        ))}
      </>
    );
  }

  if (movies.length === 0) {
    return <div>The list of movies is empty</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movieData={movie}
          onMovieClick={(newSelectedBook) => {
            setSelectedMovie(newSelectedBook);
          }}
        />
      ))}
    </div>
  );
};
