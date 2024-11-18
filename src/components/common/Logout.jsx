import { useNavigate } from 'react-router';
import LogoutIcon from '../../assets/icons/logout.svg';
import { useAuth } from '../../hooks/useAuth';

function Logout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  function handleLogOut() {
    setAuth({});
    navigate('/login');
  }

  return (
    <button className='icon-btn' onClick={handleLogOut} aria-label='Logout'>
      <img src={LogoutIcon} alt='Logout' />
    </button>
  );
}

export default Logout;
