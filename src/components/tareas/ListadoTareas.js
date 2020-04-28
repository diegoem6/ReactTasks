import React, {Fragment, useContext} from 'react';
import proyectoContext from '../../context/Proyecto/proyectoContext' 
import tareaContext from '../../context/Tarea/tareaContext' 
import Tarea from './Tarea'
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const ListadoTareas = () => {
    

    const pContext = useContext(proyectoContext)
    const {proyecto, eliminarProyecto} = pContext

    const tContext = useContext(tareaContext)
    const {tareasProyecto} = tContext
    
    if (!proyecto) return <h2>Seleccione un proyecto</h2>

    // array destructing


    
    const [proyectoActual] = proyecto

    
    const eliminarProyectoClick = ()=>{
        eliminarProyecto(proyectoActual._id)
    }

    return ( 
        <Fragment>
            <h2>Tareas del proyecto: {proyectoActual.nombre}</h2>
            <ul>
                {(tareasProyecto.length===0)?
                    (<li className="tarea"><p>No hay tareas asignadas al proyecto</p></li>)
                :
                <TransitionGroup>
                {tareasProyecto.map(tarea => (
                    <CSSTransition
                        key={tarea._id}
                        timeout={200}
                        classNames="tarea"
                    >
                        <Tarea 
                            tarea={tarea}
                        />
                    </CSSTransition>
                ))}
                </TransitionGroup>
                }
            </ul>
            <button     
                type="button"
                className="btn btn-eliminar"
                onClick={eliminarProyectoClick}
            >Eliminar Proyecto &times;</button>
        </Fragment>
     );
}
 
export default ListadoTareas;
