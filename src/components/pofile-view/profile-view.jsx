import React from 'react';

import { useSelector } from 'react-redux';

import { UpdateView } from './update-view';
import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { DeleteUser } from './delete-user';

export const ProfileView = () => {
  const movies = useSelector((state) => state.movies.movies);
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);
  // console.log(token);

  const storedToken = localStorage.getItem('token');

  const storedUser = JSON.parse(localStorage.getItem('user'));

  return (
    <>
      <UserInfo />
      <UpdateView />
      <DeleteUser />
      <FavoriteMovies movies={movies} />
    </>
  );
};
