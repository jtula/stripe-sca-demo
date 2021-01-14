import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContextProvider } from "src/context/UserContext";
import SignIn from "src/pages/SignIn";
import SignUp from "src/pages/SignUp";
import Header from "src/components/Header";
import "bootstrap/dist/css/bootstrap.css";

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <div className="container">
          <Suspense fallback={null}>
            <Header />
            <Switch>
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
