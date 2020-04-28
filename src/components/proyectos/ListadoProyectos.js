import React , {useContext, useEffect} from 'react';
import Proyecto from './Proyecto'
import proyectoContext from '../../context/Proyecto/proyectoContext'
import alertaContext from '../../context/Alerta/alertaContext'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoProyectos = () => {
    
    const pContext = useContext(proyectoContext)
    const {proyectos, mensaje, obtenerProyectos} = pContext;

    const aContext = useContext(alertaContext)
    const {mostrarAlerta, alerta} = aContext;

    useEffect( 
        ()=>{
            if(mensaje){
                mostrarAlerta(mensaje.msg,mensaje.categoria)
            }
            obtenerProyectos()
        }
        //eslint-disable-next-line
    ,[mensaje])
    if (proyectos.length === 0) return <p>No hay proyectos, comienza creando uno</p>

    return ( 
        <ul className ="listado-proyectos">
            {alerta? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg} </div>)
                    :null}
            <TransitionGroup>
                {proyectos.map(proyecto => (
                    <CSSTransition
                        key={proyecto._id}
                        timeout={200}
                        classNames="proyecto"
                    >
                        <Proyecto 
                            proyecto={proyecto}
                        />
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </ul>

     );
}
 
export default ListadoProyectos;