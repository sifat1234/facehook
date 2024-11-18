import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div>
      <p>HomePage</p>
      <Link to='/me'>Profile</Link>
    </div>
  );
}

export default HomePage;
