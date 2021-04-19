import './App.css';
import Login from "pages/Login";
import Home from "pages/Home";
import Portafolio from "pages/Portafolios/index";
import VerPortafolio from "pages/Portafolios/ver";
import PortafoliosEstudiantes from "pages/Portafolios/estudiantes"
import Principal from "pages/Principal";
import Perfil from "pages/Users/perfil";
import Estudiantes from "pages/Estudiantes/index"
import Asignaturas from "pages/Asignaturas/index"
import Docentes from "pages/Docentes/index"

import { Route, Switch } from "wouter";
import Navbar from 'components/Navbar'
import { UserContextProvider } from "context/UserContext";
import { CarrerasContextProvider } from "context/CarrerasContext";
import { AsignaturasContextProvider } from "context/AsignaturasContext";
import { PortafoliosContextProvider } from "context/PortafoliosContext";
import { PerfilContextProvider } from "context/PerfilContext";
import { MatriculadosContextProvider } from "context/MatriculadosContext";
import { PortafolioContextProvider } from "context/PortafolioContext";
import { UsuariosContextProvider } from "context/UsuariosContext"

export default function App() {
  return (

    <>

      <UserContextProvider>

        <PerfilContextProvider>
          <Navbar />

          <div className=" mt-5 p-5">
            <Switch>

              <Route component={Home} path="/" />
              <Route component={Login} path="/login" />

              <Route component={Perfil} path="/perfil" />

              <PortafoliosContextProvider>

                <Route component={Portafolio} path="/portafolios" />

                <PortafolioContextProvider>
                  <Route component={VerPortafolio} path="/portafolios/ver/:asig_codigo/:peri_codigo/:per_codigo" />

                </PortafolioContextProvider>

                <MatriculadosContextProvider>

                  <Route component={PortafoliosEstudiantes} path="/portafolios/estudiantes/:asig_codigo/:peri_codigo" />

                </MatriculadosContextProvider>

                <CarrerasContextProvider>
                  <Route component={Principal} path="/principal" />
                  <AsignaturasContextProvider>
                    <Route component={Principal} path="/principal/:car_nombre" />
                  </AsignaturasContextProvider>
                </CarrerasContextProvider>


                <UsuariosContextProvider>

                  <Route component={Estudiantes} path="/estudiantes" />
                  <Route component={Docentes} path="/docentes" />


                </UsuariosContextProvider>

                
                <Route component={Asignaturas} path="/asignaturas" />

              </PortafoliosContextProvider>

            </Switch>
          </div>
        </PerfilContextProvider>
      </UserContextProvider>
    </>

  );
}

