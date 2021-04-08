import './App.css';
import Login from "pages/Login";
import Home from "pages/Home";
import Portafolio from "pages/Portafolios/index";
import VerPortafolio from "pages/Portafolios/ver";
import Principal from "pages/Principal";

import { Route, Switch } from "wouter";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'popper.js';
import Navbar from 'components/Navbar'
import { UserContextProvider } from "context/UserContext";

export default function App() {
  return (

    <>

      <UserContextProvider>
        
        <Navbar />
      
        <div className=" mt-5 p-5">
          <Switch>

            <Route component={Home} path="/" />
            <Route component={Login} path="/login" />
            <Route component={Portafolio} path="/portafolios" />
            <Route component={VerPortafolio} path="/portafolios/:id" />
            <Route component={Principal} path="/principal" />

          </Switch>
        </div>
      </UserContextProvider>
    </>

  );
}

