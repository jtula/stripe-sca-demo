import { useRouteMatch, Link } from "react-router-dom";
import useUser from "src/hooks/useUser";

const Header = () => {
  const { isLogged, logout } = useUser();
  const match = useRouteMatch("/signin");
  const handleLogout = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <header>
      {match ? null : isLogged ? (
        <Link to="/logout" onClick={handleLogout}>
          Logout
        </Link>
      ) : (
        <>
          <Link to="/signin">Sign In</Link>
          <Link to="/signup">Sign Up</Link>
        </>
      )}
    </header>
  );
};

export default Header;
