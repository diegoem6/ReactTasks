import React, {useEffect, useContext} from 'react';
import autenticacionContext from '../../context/Autenticacion/autenticacionContext'

const Barra = () => {

    const aContext = useContext(autenticacionContext)
    const {usuarioAutenticado, usuario, cerrarSesion} = aContext

    useEffect(() => {
        usuarioAutenticado();
        // eslint-disable-next-line
    }, [])

    return ( 
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hola <span>{usuario.nombre}</span></p> : null}
            
            <nav className="nav-principal">
                <button 
                    className = "btn btn-blank cerrar-sesion"
                    onClick={()=> cerrarSesion()}
                >Cerrar Sesión</button>
            </nav>
        </header>
     );
}
 
export default Barra;
