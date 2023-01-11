// Importing useState for creation and initialization of state
import { useState } from 'react';

// Importing MovieCard component, so it can be used here
import { MovieCard } from '../movie-card/movie-card';

// Importing MovieView component
import { MovieView } from '../movie-view/movie-view';

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: 'Silence of the Lambs',
      description:
        'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer.',
      image: 'https://assets.nflxext.com/us/boxshots/hd1080/14546747.jpg',
      director: 'Jonathan Demme',
      genre: 'Thriller',
    },
    {
      id: 2,
      title: 'Stuart Little',
      description:
        'When the Littles go to an orphanage to adopt a new family member, a charming young mouse named Stuart is chosen.',
      image:
        'https://m.media-amazon.com/images/S/pv-target-images/76620ce3e1ba6070c68a839904c9a68fe2f4a6cdff555786dc3a35e5544b1878._SX780_SY600_.jpg',
      director: 'Rob Minkoff',
      genre: 'Comedy',
    },
    {
      id: 3,
      title: 'The Lord of the Rings: The Return of the King',
      description:
        "Gandalf and Aragorn lead the World of Men against Sauron's army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.",
      image: 'https://i.scdn.co/image/ab67616d0000b27301003bf641243fcc56944428',
      director: 'Peter Jackson',
      genre: 'Action',
    },
    {
      id: 4,
      title: 'The Lion King',
      description:
        'This Disney animated feature follows the adventures of the young lion Simba.',
      image: 'https://cdn.kinocheck.com/images/w288/4vrprrb9e2.webp',
      director: 'Rob Minkoff',
      genre: 'Animated',
    },
    {
      id: 5,
      title: 'The Godfather',
      description:
        'The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.',
      image:
        'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
      director: 'Francis Ford Coppola',
      genre: 'Crime',
    },
    {
      id: 6,
      title: 'Inception',
      description:
        'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.',
      image: 'https://static.kinocheck.de/images/ybn0vbfazw.jpg',
      director: 'Christopher Nolan',
      genre: 'Action',
    },
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return <MovieView movieData={selectedMovie} onBackClick={() => setSelectedMovie(null)} />;
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
