import useUser from "src/hooks/useUser";
import UserCard from "src/components/UserCard";
import SignIn from "src/components/SignIn";

const HomePage = () => {
  const { userLogged } = useUser();

  return (
    <>
      <div className="container">{!userLogged ? <SignIn /> : <UserCard />}</div>
    </>
  );
};

export default HomePage;
