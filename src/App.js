import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Login from './components/auth/Login'
import NuevaCuenta from './components/auth/NuevaCuenta'
import Proyectos from './components/proyectos/Proyectos'
import ProyectoState from './context/Proyecto/proyectoState'
import TareaState from './context/Tarea/tareaState'
import AlertaState from './context/Alerta/alertaState'
import AutenticacionState from './context/Autenticacion/autenticacionState'
import authToken from '../src/config/token'
import RutaPrivada from './components/routes/rutaPrivada'


const token = localStorage.getItem('token');
authToken(token)


function App() {
  return (
    <ProyectoState>
      <TareaState>
        <AlertaState>
          <AutenticacionState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login}/>
                <Route exact path="/Nueva-cuenta" component={NuevaCuenta}/>
                <RutaPrivada exact path="/proyectos" component={Proyectos}/>
              </Switch>
            </Router>
          </AutenticacionState>
        </AlertaState>
      </TareaState>
    </ProyectoState>
  );
}

export default App;
