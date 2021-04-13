import './App.css';
import Login from "pages/Login";
import Home from "pages/Home";
import Portafolio from "pages/Portafolios/index";
import VerPortafolio from "pages/Portafolios/ver";
import Principal from "pages/Principal";
import Perfil from "pages/Users/perfil";

import { Route, Switch } from "wouter";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import 'popper.js';
import Navbar from 'components/Navbar'
import { UserContextProvider } from "context/UserContext";
import { CarrerasContextProvider } from "context/CarrerasContext";
import { AsignaturasContextProvider } from "context/AsignaturasContext";
import { PortafoliosContextProvider } from "context/PortafoliosContext";



export default function App() {
  return (

    <>

      <UserContextProvider>

        <Navbar />

        <div className=" mt-5 p-5">
          <Switch>

            <Route component={Home} path="/" />
            <Route component={Login} path="/login" />
            
            <Route component={Perfil} path="/perfil" />

            <PortafoliosContextProvider>
              <Route component={Portafolio} path="/portafolios"/>
              <Route component={VerPortafolio} path="/portafolios/:id" />
            
              <CarrerasContextProvider>
                <Route component={Principal} path="/principal" />
                <AsignaturasContextProvider>
                  <Route component={Principal} path="/principal/:car_nombre" />
                </AsignaturasContextProvider>
              </CarrerasContextProvider>

            </PortafoliosContextProvider>

          </Switch>
        </div>
      </UserContextProvider>
    </>

  );
}

