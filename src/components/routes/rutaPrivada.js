import React, {useEffect, useContext} from 'react';
import {Route, Redirect} from 'react-router-dom'
import autenticacionContext from '../../context/Autenticacion/autenticacionContext'


const RutaPrivada = ({component: Component, ...props}) => {
    const aContext = useContext(autenticacionContext)
    const {usuarioAutenticado, autenticado, cargando} = aContext

     useEffect(() => {
         usuarioAutenticado();
         // eslint-disable-next-line
     }, [])

    return ( 
        <Route {...props} render={props => !autenticado && !cargando ? (
            <Redirect to ="/" />
        ):(
            <Component {...props} />
        )} 
        />
     );
}
 
export default RutaPrivada;