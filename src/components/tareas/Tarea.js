import React, {useContext} from 'react';
import proyectoContext from '../../context/Proyecto/proyectoContext' 
import tareaContext from '../../context/Tarea/tareaContext' 


const Tarea = ({tarea}) => {

    const pContext = useContext(proyectoContext)
    const {proyecto} = pContext

    const tContext = useContext(tareaContext)
    const {obtenerTareasProyecto, eliminarTarea, cambiarEstadoTarea, seleccionarTarea} = tContext

    const [proyectoActual] = proyecto

    const eliminarTareaClick = (e)=>{
        eliminarTarea(tarea)
        obtenerTareasProyecto(proyectoActual._id)
    }

    const camibarEstadoTareaClick = (tarea) =>{
        if(tarea.estado){
            tarea.estado = false
        }else{
            tarea.estado = true
        }
        cambiarEstadoTarea(tarea)
    }

    const seleccionarTareaClick = (tarea) =>{
        seleccionarTarea(tarea)
    }
    return ( 
    <li className="tarea sombra">
        <p>{tarea.nombre} </p>

        <div className="estado">
            {tarea.estado 
            ?  
                (
                    <button
                        type="button"
                        className="completo"
                        onClick = {()=>camibarEstadoTareaClick (tarea)}
                    >Completo</button>
                )
            : 
                (
                    <button
                        type="button"
                        className="incompleto"
                        onClick = {()=>camibarEstadoTareaClick (tarea)}
                    >Incompleto</button>
                )
            }
        </div>

        <div className="acciones">
            <button 
                type="button"
                className="btn btn-primario"
                onClick = {()=>{seleccionarTareaClick(tarea)}}
            >Editar</button>

            <button
                type="button"
                className="btn btn-secundario"
                onClick={eliminarTareaClick}
            >Eliminar</button>
        </div>
    </li> 
    );
}
 
export default Tarea;