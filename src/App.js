import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContextProvider } from "context/UserContext";
import SignIn from "pages/SignIn";
import SignUp from "page/SignUp";
import "./App.css";

const App = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <div className="App">
          <Suspense fallback={null}>
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
