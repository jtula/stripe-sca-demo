import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContextProvider } from "src/context/UserContext";
import SignIn from "src/pages/SignIn";
import SignUp from "src/pages/SignUp";
import "bootstrap/dist/css/bootstrap.css";

const HomePage = React.lazy(() => import("./pages/Home"));

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <div className="container">
          <Suspense fallback={null}>
            <Switch>
              <Route component={HomePage} exact={true} path="/" />
              <Route path="/signin">
                <SignIn />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
            </Switch>
          </Suspense>
        </div>
      </BrowserRouter>
    </UserContextProvider>
  );
};

export default App;
