// Importing useState for creation and initialization of state
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { setMovies } from '../../redux/reducers/movies';
import { setUser } from '../../redux/reducers/user';
import { setToken } from '../../redux/reducers/token';

// Importing MovieCard component, so it can be used here
import { MovieCard } from '../movie-card/movie-card';

// Importing MovieView component
import { MovieView } from '../movie-view/movie-view';

import { LoginView } from '../login-view/login-view';
import { SignupView } from '../signup-view/signup-view';
import { NavigationBar } from '../navigation-bar/navigation-bar';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import { ProfileView } from '../pofile-view/profile-view';
import { MoviesList } from '../movies-list/movies-list';

export const MainView = () => {

  const movies = useSelector((state) => state.movies.movies);

  const user = useSelector((state) => state.user.user);
  const token = useSelector(
    (state) => state.token.token || localStorage.getItem('token')
  );

  // const [user, setUser] = useState(storedUser ? storedUser : null);
  // const [token, setToken] = useState(storedToken ? storedToken : null);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!token) {
      return;
    }

    //Get User on every reload
    getUser();

    // Get movies
    getMovies();
  }, [token]);

  const getUser = () => {
    const username = JSON.parse(localStorage.getItem('user')).Username;
    fetch(`https://movie-api-zhikiki.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((user) => {
        dispatch(setUser(user));
      });
  };

  const getMovies = () => {
    fetch('https://movie-api-zhikiki.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` },
    })
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
        dispatch(setMovies(moviesFromApi));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <BrowserRouter>
      <NavigationBar />
      <Container>
        <Row className='justify-content-md-center'>
          <Routes>
            <Route
              path='/signup'
              element={
                <>
                  {user ? (
                    <Navigate to='/' />
                  ) : (
                    <Col md={5}>
                      <SignupView />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path='/login'
              element={
                <>
                  {user ? (
                    <Navigate to='/' />
                  ) : (
                    <Col md={5}>
                      <LoginView />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path='/movies/:movieId'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : (
                    <Col>
                      <MovieView />
                    </Col>
                  )}
                </>
              }
            />

            <Route
              path='/'
              element={
                <>{!user ? <Navigate to='/login' replace /> : <MoviesList />}</>
              }
            />

            {/* User Profile view */}
            <Route
              path='/users/:username'
              element={
                <>
                  {!user ? (
                    <Navigate to='/login' replace />
                  ) : movies.length === 0 ? (
                    <Col>The list is empty!</Col>
                  ) : (
                    <Col>
                      <ProfileView movies={movies} />
                    </Col>
                  )}
                </>
              }
            />
          </Routes>
        </Row>
      </Container>
    </BrowserRouter>
  );
};
