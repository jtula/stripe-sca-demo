import { useHistory, Link } from "react-router-dom";
import useUser from "src/hooks/useUser";

const UserCard = () => {
  const { user, logout } = useUser();
  const history = useHistory();

  const handleLogout = (event) => {
    event.preventDefault();
    logout();
    history.push("/");
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <div
          className="card shadow-sm bg-white rounded p-3"
          style={{ maxWidth: "500px", width: "500px" }}
        >
          <div className="card-body">
            {user && <h3 className="text-center mb-3">{user.fullName}</h3>}
            <Link to="#" onClick={handleLogout}>
              Logout
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserCard;
