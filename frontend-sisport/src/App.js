import './App.css';
import Login from "pages/Login";
import Home from "pages/Home";

import { Route, Switch } from "wouter";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'popper.js';
import Navbar from 'components/Navbar'

export default function App() {
  return (

    <>
      <Navbar />

      <div className="container mt-5 p-5">
        <Switch>

          <Route component={Home} path="/" />
          <Route component={Login} path="/login" />

        </Switch>
      </div>

    </>

  );
}

