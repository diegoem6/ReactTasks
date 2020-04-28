import React, { useState, useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import autenticacionContext from "../../context/Autenticacion/autenticacionContext";
import alertaContext from "../../context/Alerta/alertaContext";

const Login = (props) => {
  const [usuario, setusuario] = useState({
    email: "",
    password: "",
  });

  const {email, password} = usuario;

  const onChange = (e) => {
      setusuario({
          ...usuario, 
          [e.target.name] : e.target.value
        })
  };
  const aContext = useContext(alertaContext)
  const {alerta, mostrarAlerta} = aContext

  const auContext = useContext(autenticacionContext);
  const {loguearUsuario, autenticado, mensaje} = auContext

  useEffect(()=>{
      if(autenticado){
        props.history.push('/proyectos')
      }
      if (mensaje){
        mostrarAlerta(mensaje.msg,mensaje.categoria)
      }
      // eslint-disable-next-line
  },[autenticado, mensaje, props.history])


  const onSubmit = (e) => {
    e.preventDefault()
      if (email.trim()==="" || password.trim()===""){
        mostrarAlerta("Todos los campos son obligatorios","alerta-error")
        return;
      }

      loguearUsuario({
        email,
        password
      })


    };

  return (
    <div className="form-usuario">
     {alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg} </div>)
                    :null}
          
      <div className="contenedor-form sombra-dark">
        <h1>Iniciar Sesión</h1>

        <form 
            onSubmit = {onSubmit}
        >
          <div className="campo-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              onChange={onChange}
              value={email}
            />
          </div>

          <div className="campo-form">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              onChange={onChange}
              value={password}
            />
          </div>

          <div className="campo-form">
            <input
              type="submit"
              className="btn btn-primario btn-block"
              value="Iniciar Sesión"
            />
          </div>
        </form>
        <Link 
            to={'/nueva-cuenta'}
            className="enlace-cuenta">
        >
            Obtener cuenta
        </Link>
      </div>
    </div>
  );
};

export default Login;
