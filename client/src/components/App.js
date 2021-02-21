import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute.js";
import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import BookListIndex from "./BookList/BookListIndex.js";
import BookIndex from "./Book/BookIndex.js";
import BookListShowPage from "./BookList/BookListShowPage.js";
import BookForm from "./Book/BookForm.js";
import BookListForm from "./BookList/BookListForm.js";
import googleBookSearch from "./Book/googleBookSearch.js";
import HomePage from "./layout/HomePage.js";
import BookShowPage from "./Book/BookShowPage.js";
import bookDelete from "./Book/BookDeleteButton.js";
const App = (props) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  useEffect(() => {
    getCurrentUser()
      .then((user) => {
        setCurrentUser(user);
      })
      .catch(() => {
        setCurrentUser(null);
      });
  }, []);

  return (
    <Router>
      <TopBar user={currentUser} />
      <Switch>
        <Route exact path="/">
          <HomePage user={currentUser} />
        </Route>
        <Route exact path="/users/new" component={RegistrationForm} />
        <Route exact path="/user-sessions/new" component={SignInForm} />
        <Route exact path="/bookLists">
          <BookListIndex user={currentUser} />
        </Route>
        <AuthenticatedRoute
          exact
          path="/bookLists/new"
          component={BookListForm}
          user={currentUser}
        />
        <Route exact path="/bookLists/:id">
          <BookListShowPage user={currentUser} />
        </Route>

        <Route exact path="/books">
          <BookIndex user={currentUser} />
        </Route>
        <AuthenticatedRoute exact path="/books/new" component={BookForm} user={currentUser} />
        <Route exact path="/books/:id">
          <BookShowPage user={currentUser} />
        </Route>

        <Route exact path="/books/:id/delete" component={bookDelete} />
        <Route exact path="/googleSearch" component={googleBookSearch} />
      </Switch>
    </Router>
  );
};

export default hot(App);
