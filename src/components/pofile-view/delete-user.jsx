import { Button, Col } from 'react-bootstrap';
import { useSelector } from 'react-redux';

export const DeleteUser = () => {
  const user = useSelector((state) => state.user.user);
  const token = localStorage.getItem('token');
  const handleDeregister = () => {
    const userWarning = confirm(
      `You are going to delete your account. All information will be lost and cannot be recovered. Are you sure?`
    );

    userWarning === false
      ? alert('Great decision. Keep choosing your favorite movies')
      : fetch(
          `https://movie-api-zhikiki.herokuapp.com/users/${user.Username}`,
          {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
          .then((response) => {
            if (response.ok) {
              alert('Account successfully deleted');
              localStorage.clear();
              window.location.reload();
            } else {
              alert('Something went wrong');
            }
          })
          .catch((e) => console.log(e));
  };

  return (
    <Col className='text-end'>
      <div>
        <Button
          onClick={() => handleDeregister(user._id)}
          className='button-delete'
          variant='danger'
        >
          Press here delete your account
        </Button>
      </div>
    </Col>
  );
};
