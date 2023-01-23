import { useParams } from 'react-router';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';
import { Button, Row, Col } from 'react-bootstrap';
import { FaHeart } from 'react-icons/fa';

export const FavoriteIcon = ({ user, movie, updateUserOnFav }) => {
  const token = localStorage.getItem('token');
  console.log(user);
  console.log(token);
  console.log(movie);

  const [userData, setUserData] = useState(user);
  const alreadyFavorite = userData.FavoriteMovies.find(
    (favMovieId) => favMovieId === movie.id
  );

  // useEffect(() => {
  //   if (!alreadyFavorite) {
  //     console.log('Movie is not favorite');
  //   } else {
  //     document.querySelector('#favMovieButton').classList.add('favorite-movie');
  //   }
  // });

  const toggleFavorite = () => {
    if (!token) return;

    const url = `https://movie-api-zhikiki.herokuapp.com/users/${user.Username}/movies/${movie.id}`;

    if (alreadyFavorite) {
      const requestOptions = {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data)
          // console.log(updateUserOnFav);
          updateUserOnFav(data);
          document.querySelector('svg').classList.remove('favorite-movie');
          alert(`${movie.title} is deleted from the list of favorites`);
        })
        .catch((e) => {
          alert('Something went wrong');
        });
    } else {
      const requestOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      fetch(url, requestOptions)
        .then((response) => response.json())
        .then((data) => {
          // console.log(data);
          alert(`${movie.title} is added to the list of favorites`);
          // console.log(updateUserOnFav);
          updateUserOnFav(data);
          document
            .querySelector('#favMovieButton')
            .classList.add('favorite-movie');
        })
        .catch((e) => {
          alert('Something went wrong');
        });
    }
    // if (alreadyFavorite)
    //   return alert('This movie is already in the list of favorite');

    // const url = `https://movie-api-zhikiki.herokuapp.com/users/${user.Username}/movies/${movie.id}`;
    // const requestOptions = {
    //   method: 'POST',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };

    // fetch(url, requestOptions)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //     alert(`${movie.title} is added to the list of favorites`);
    //     console.log(updateUserOnFav);
    //     updateUserOnFav(data);
    // document
    //   .querySelector('#favMovieButton')
    //   .classList.add('favorite-movie');
    // })
    // .catch((e) => {
    //   alert('Something went wrong');
    // });
  };

  return (
    <Link
      onClick={() => toggleFavorite()}
      className='favorite-icon'
      id='favMovieButton'
    >
      {alreadyFavorite ? <FaHeart className='favorite-movie' /> : <FaHeart />}
    </Link>
  );
};
