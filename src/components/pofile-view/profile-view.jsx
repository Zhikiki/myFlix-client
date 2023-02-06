import React from 'react';

import { useSelector } from 'react-redux';

import { UpdateView } from './update-view';
import { UserInfo } from './user-info';
import { FavoriteMovies } from './favorite-movies';
import { DeleteUser } from './delete-user';

export const ProfileView = () => {
  const movies = useSelector((state) => state.movies.movies);

  return (
    <>
      <UserInfo />
      <UpdateView />
      <DeleteUser />
      <FavoriteMovies movies={movies} />
    </>
  );
};
