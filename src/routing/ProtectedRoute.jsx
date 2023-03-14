import { useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { accessTokenSelector } from '../selectors';

function ProtectedRoute() {
  const accessToken = useSelector(accessTokenSelector);

  if (!accessToken) {
    return (
      <div className="unauthorized">
        <h1>Unauthorized :(</h1>
        <span>
          <NavLink to="/login">Login</NavLink> to gain access
        </span>
      </div>
    );
  }

  return <Outlet />;
}

export default ProtectedRoute;
