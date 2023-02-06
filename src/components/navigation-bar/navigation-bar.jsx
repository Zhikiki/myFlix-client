import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducers/user';
import { setToken } from '../../redux/reducers/token';
import { MoviesFilter } from '../movies-filter/movies-filter';
import Col from 'react-bootstrap/Col';

export const NavigationBar = () => {
  const user = useSelector((state) => state.user.user);
  const token = useSelector((state) => state.token.token);
  const dispatch = useDispatch();

  const onLoggedOut = () => {
    dispatch(setUser(null));
    dispatch(setToken(null));
    localStorage.clear();
  };

  return (
    <Navbar
      collapseOnSelect
      expand='md'
      bg='light'
      variant='light'
      sticky='top'
      className='mb-4 py-3'
    >
      <Container>
        <Navbar.Brand as={Link} to='/' className='h2 my-auto'>
          MyFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav' />
        <Navbar.Collapse
          id='responsive-navbar-nav'
          className='justify-content-between'
        >
          {!user && (
            <Nav className='me-auto'>
              <Nav.Link as={Link} to='/login'>
                Login
              </Nav.Link>
              <Nav.Link as={Link} to='/signup'>
                Sign up
              </Nav.Link>
            </Nav>
          )}
          {user && (
            <>
              <Nav>
                <Nav.Link as={Link} to='/'>
                  Home
                </Nav.Link>
                <Nav.Link as={Link} to={`/users/${user.Username}`}>
                  Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut}>Sign out</Nav.Link>
              </Nav>
              <Col md={4}>
                <MoviesFilter />
              </Col>
            </>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
