import { useRouteMatch, Link } from "react-router-dom";
import useUser from "hooks/useUser";

const Header = () => {
  const { isLogged, logout } = useUser();
  const [match] = useRouteMatch("/signin");

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
  };

  return (
    <header>
      {match ? null : isLogged ? (
        <Link to="/logout" onClick={handleLogout}>
          Salir
        </Link>
      ) : (
        <>
          <Link to="/signin"></Link>
          <Link to="/signup"></Link>
        </>
      )}
    </header>
  );
};

export default Header;
