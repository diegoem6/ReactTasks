import React, {useContext} from 'react';
import proyectoContext from '../../context/Proyecto/proyectoContext' 
import tareaContext from '../../context/Tarea/tareaContext' 


const Proyecto = ({proyecto}) => {
    const pContext = useContext(proyectoContext)
    const {seleccionarProyecto} = pContext

    const tContext = useContext(tareaContext)
    const {obtenerTareasProyecto} = tContext

    const seleccionarProyectoClick = ()=>{
        seleccionarProyecto(proyecto._id)
        obtenerTareasProyecto(proyecto._id)
    }
    
    return (  
        <li>
            <button
                type="button"
                className="btn btn-blank"
                onClick={seleccionarProyectoClick}
                >
                 {proyecto.nombre}</button>
        </li>
    );
}
 
export default Proyecto;