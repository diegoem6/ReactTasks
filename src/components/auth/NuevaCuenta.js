import React,{useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';
import alertaContext from '../../context/Alerta/alertaContext'
import autenticacionContext from '../../context/Autenticacion/autenticacionContext'

const NuevaCuenta = (props) => {
    const [usuario, setusuario] = useState({
        nombre:"", 
        email: "" ,
        password: "",
        confirmar:""
      });
    

      const aContext = useContext(alertaContext)
      const {alerta, mostrarAlerta} = aContext

      const auContext = useContext(autenticacionContext)
      const {autenticado, mensaje, registrarUsuario} = auContext

      const {nombre, email, password, confirmar} = usuario;
    

      useEffect(()=>{
          if(autenticado){
            props.history.push('/proyectos')
          }
          if (mensaje){
            mostrarAlerta(mensaje.msg,mensaje.categoria)
          }
          // eslint-disable-next-line
      },[autenticado, mensaje, props.history])

      const onChange = (e) => {
          setusuario({
              ...usuario, 
              [e.target.name] : e.target.value
            })
      };
    
      const onSubmit = (e) => {
        
        e.preventDefault();
        if (nombre.trim()===""||
            email.trim()===""||
            password.trim()===""||
            confirmar.trim()===""){
                
                mostrarAlerta("Todos los campos son obligatorios","alerta-error")
                return;
        }
          
        if (password.length < 6){
            mostrarAlerta("El password debe tener al menos 6 caracteres","alerta-error")
            return;
        }

        if (password !== confirmar){
          mostrarAlerta("Los passwords deben ser iguales","alerta-error")
          return;
        }
        registrarUsuario({
          nombre,
          email,
          password
        })
      };
    
      return (
        <div className="form-usuario">
          {alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg} </div>)
                    :null}
          <div className="contenedor-form sombra-dark">
            <h1>Nueva cuenta</h1>
    
            <form 
                onSubmit = {onSubmit}
            >
                <div className="campo-form">
                <label htmlFor="nombre">Nombre</label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre"
                  onChange={onChange}
                  value={nombre}
                />
              </div>

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
                <label htmlFor="confirmar">Confirmar password</label>
                <input
                  type="password"
                  id="confirmar"
                  name="confirmar"
                  placeholder="Repeti tu password"
                  onChange={onChange}
                  value={confirmar}
                />
              </div>
    
              <div className="campo-form">
                <input
                  type="submit"
                  className="btn btn-primario btn-block"
                  value="Registrar cuenta"
                />
              </div>
            </form>
            <Link 
                to={'/'}
                className="enlace-cuenta">
            >
                Volver a Login
            </Link>
          </div>
        </div>
      );
}
 
export default NuevaCuenta;